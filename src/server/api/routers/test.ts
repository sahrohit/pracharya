import { and, asc, desc, eq, inArray, lt, lte, or, sql } from "drizzle-orm";
import { z } from "zod";

import { unstable_noStore as noStore } from "next/cache";
import dayjs from "dayjs";
import { TRPCError } from "@trpc/server";
import {
	adminProcedure,
	createTRPCRouter,
	protectedProcedure,
} from "@/server/api/trpc";
import { tests, testQuestions } from "@/server/db/schema";
import { type SelectTest } from "@/server/db/types";
import filterColumn from "@/lib/filter-column";
import qstash from "@/lib/qstash";
import { env } from "@/env";

const testRouter = createTRPCRouter({
	get: protectedProcedure
		.input(
			z.object({
				id: z.string().optional().describe("Test Id"),
			})
		)
		.meta({
			description: "Get a test with id",
		})
		.query(async ({ ctx, input }) =>
			ctx.db.query.tests.findFirst({
				with: {
					questions: {
						with: {
							question: {
								columns: {
									solution: false,
								},
								with: {
									options: {
										columns: {
											isAnswer: false,
										},
									},
								},
							},
						},
					},
				},
				where: (tests, { eq, and }) =>
					and(
						input.id ? eq(tests.id, input.id) : undefined,
						eq(tests.examinee, ctx.session.user.id)
					),
			})
		),

	list: protectedProcedure
		.meta({ description: "Lists all tests" })
		.input(
			z.object({
				page: z.string().default("1").describe("Page number."),
				perPage: z.string().default("10").describe("Number of items per page."),
				sort: z
					.string()
					.optional()
					.describe(
						"Column to sort by with order. If multipe seperated by '.'. (eg. title.desc)"
					),
				id: z.string().optional().describe("Search query for Id column."),
				status: z
					.string()
					.optional()
					.describe(
						"Status of the Issue. If multipe seperated by '.'. (eg. PENDING.PLACED)"
					),
				operator: z
					.enum(["and", "or"])
					.optional()
					.describe("Operator of the query."),
			})
		)
		.query(async ({ ctx, input }) => {
			noStore();
			try {
				const { page, perPage, sort, id, status, operator } = input;

				const pageAsNumber = Number(page);
				const fallbackPage =
					Number.isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;

				const perPageAsNumber = Number(perPage);
				const limit = Number.isNaN(perPageAsNumber) ? 10 : perPageAsNumber;

				const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;

				const [column, order] = (sort?.split(".") as [
					keyof SelectTest | undefined,
					"asc" | "desc" | undefined,
				]) ?? ["createdAt", "desc"];

				const statuses = (status?.split(".") as SelectTest["status"][]) ?? [];

				const filters = [
					id
						? filterColumn({
								column: tests.id,
								value: id,
							})
						: undefined,
					statuses.length > 0 ? inArray(tests.status, statuses) : undefined,
					eq(tests.examinee, ctx.session.user.id),
				];

				const query =
					!operator || operator === "and" ? and(...filters) : or(...filters);

				const { data, count } = await ctx.db.transaction(async (tx) => {
					const data = await tx.query.tests.findMany({
						where: query,
						limit,
						offset,
						orderBy: [
							column && column in tests
								? order === "asc"
									? asc(tests[column])
									: desc(tests[column])
								: desc(tests.id),
						],
					});

					const count = await tx
						.select({
							count: sql<number>`count(${tests.id})`.mapWith(Number),
						})
						.from(tests)
						.where(query)
						.execute()
						.then((res) => res[0]?.count ?? 0);

					return {
						data: data.map((issue) => ({
							...issue,
						})),
						count,
					};
				});

				const pageCount = Math.ceil(count / limit);
				return { data, pageCount };
			} catch (err) {
				return { data: [], pageCount: 0 };
			}
		}),

	// ! This performs independet 80-100 * 2 queries based on the pattern
	// ! Couldn't find a way to optimize this, and sticking with it for now
	// ! Hours wasted: 3hrs + 5hrs + 1hr

	// ! Putting all of them in a transaction
	// ! That also fails after 46th question (out of 100) insertions with a connection error from pg client

	create: protectedProcedure
		.meta({ description: "Create an Test" })
		.input(
			z.object({
				examId: z.string().describe("Pattern Id of the exam"),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { exam, test } = await ctx.db.transaction(async (tx) => {
				// Getting the Exam and Pattern from the Exam Id
				const exam = await tx.query.exams.findFirst({
					with: {
						patterns: {
							with: {
								subChapters: true,
							},
						},
					},
					where: (exams, { eq }) => eq(exams.id, input.examId),
				});

				// Throw error if exam not found
				if (!exam) {
					tx.rollback();
					throw new TRPCError({ code: "NOT_FOUND" });
				}

				const test = await tx
					.insert(tests)
					.values({
						examId: input.examId,
						examinee: ctx.session.user.id,
						status: "STARTED",
						startTime: new Date(),
						endTime: dayjs().add(exam.duration, "seconds").toDate(),
					})
					.returning({
						id: tests.id,
					});

				return { exam, test };
			});

			// Collection of Questions
			const QUESTIONS: { id: string; questionNumber: number }[] = [];

			// eslint-disable-next-line @typescript-eslint/no-floating-promises, @typescript-eslint/no-misused-promises
			exam.patterns.reduce(async (previousPromise, pattern) => {
				await previousPromise;
				const possibleSubChapters = pattern.subChapters
					.map((subChapter) => subChapter.subChapterId)
					.flatMap((f) => (f ? [f] : []));

				const question = await ctx.db.query.questions.findFirst({
					columns: {
						id: true,
					},
					where: (questions, { inArray, and, eq, notInArray }) =>
						and(
							possibleSubChapters.length > 0
								? inArray(questions.subChapterId, possibleSubChapters)
								: undefined,
							eq(questions.weight, pattern.weight),
							QUESTIONS.length > 0
								? notInArray(
										questions.id,
										QUESTIONS.map((q) => q.id)
									)
								: undefined
						),
					orderBy: sql`RANDOM()`,
				});

				if (!question?.id) {
					throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
				}

				QUESTIONS.push({
					id: question.id,
					questionNumber: pattern.questionNumber,
				});

				await ctx.db.insert(testQuestions).values({
					questionId: question.id,
					testId: test[0]?.id ?? "",
					questionNumber: pattern.questionNumber,
					markedForReview: false,
				});
			}, Promise.resolve());

			// Publish test to Qstash
			if (env.NODE_ENV === "production") {
				await qstash.publishJSON({
					url: `${env.NEXT_PUBLIC_APP_URL}/api/close-test`,
					body: { testId: test[0]?.id },
					delay: exam.duration,
				});
			}

			return { testId: test[0]?.id };
		}),

	submitTest: protectedProcedure
		.meta({
			description: "Submit Test",
		})
		.input(
			z.object({
				testId: z.string().describe("Test Id"),
			})
		)
		.mutation(async ({ ctx, input }) =>
			ctx.db
				.update(tests)
				.set({
					status: "SUBMITTED",
				})
				.where(
					and(
						eq(tests.id, input.testId),
						eq(tests.examinee, ctx.session.user.id)
					)
				)
		),

	updateTestQuestion: protectedProcedure
		.meta({
			description:
				"Updated Test Question details, such as answers, marked for review etc",
		})
		.input(
			z.object({
				markedForReview: z.boolean().describe("Marked for review"),
				answer: z.string().optional().describe("Selected Option Id"),
				testId: z.string().describe("Test Id"),
				questionId: z.string().describe("Question Id"),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const test = await ctx.db.query.tests.findFirst({
				where: (tests, { eq }) => eq(tests.id, input.testId),
			});

			if (
				test?.status !== "STARTED" ||
				new Date().getTime() > test.endTime?.getTime()
			) {
				throw new TRPCError({ code: "CLIENT_CLOSED_REQUEST" });
			}

			return ctx.db
				.update(testQuestions)
				.set({
					selectedAnswer: input.answer,
					markedForReview: input.markedForReview,
				})
				.where(
					and(
						eq(testQuestions.testId, input.testId),
						eq(testQuestions.questionId, input.questionId)
					)
				);
		}),

	updateStatus: adminProcedure
		.meta({ description: "Update Exam Status" })
		.input(
			z.object({
				examIds: z.array(z.string()).describe("Id of the Exam"),
				newStatus: z
					.enum(tests.status.enumValues)
					.describe("New Status of the order"),
			})
		)
		.mutation(async ({ ctx, input }) =>
			ctx.db
				.update(tests)
				.set({ status: input.newStatus })
				.where(inArray(tests.id, input.examIds))
		),
});

export default testRouter;
