/* eslint-disable consistent-return */

import { and, asc, desc, eq, inArray, or, sql } from "drizzle-orm";
import { z } from "zod";

import { unstable_noStore as noStore } from "next/cache";
import {
	adminProcedure,
	createTRPCRouter,
	protectedProcedure,
} from "@/server/api/trpc";
import {
	issues,
	options,
	questionWeightEnum,
	questions,
} from "@/server/db/schema";
import { type SelectIssue } from "@/server/db/types";
import filterColumn from "@/lib/filter-column";

const issueRouter = createTRPCRouter({
	get: protectedProcedure
		.input(z.object({ id: z.string().describe("Issue Id") }))
		.meta({
			description: "List all issues with items",
		})
		.query(async ({ ctx, input }) =>
			ctx.db.query.issues.findMany({
				where: (issues, { eq }) => eq(issues.id, input.id),
				orderBy: (issues, { desc }) => [desc(issues.createdAt)],
			})
		),

	list: protectedProcedure
		.meta({ description: "Lists all issues" })
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
					keyof SelectIssue | undefined,
					"asc" | "desc" | undefined,
				]) ?? ["createdAt", "desc"];

				const statuses = (status?.split(".") as SelectIssue["status"][]) ?? [];

				const filters = [
					id
						? filterColumn({
								column: issues.id,
								value: id,
							})
						: undefined,
					statuses.length > 0 ? inArray(issues.status, statuses) : undefined,
					eq(issues.createdBy, ctx.session.user.id),
				];

				const query =
					!operator || operator === "and" ? and(...filters) : or(...filters);

				const { data, count } = await ctx.db.transaction(async (tx) => {
					const data = await tx.query.issues.findMany({
						with: {
							creator: true,
							question: {
								with: {
									options: true,
								},
							},
							subChapter: {
								with: {
									chapter: true,
								},
							},
						},
						where: query,
						limit,
						offset,
						orderBy: [
							column && column in issues
								? order === "asc"
									? asc(issues[column])
									: desc(issues[column])
								: desc(issues.id),
						],
					});

					const count = await tx
						.select({
							count: sql<number>`count(${issues.id})`.mapWith(Number),
						})
						.from(issues)
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

	adminList: adminProcedure
		.meta({ description: "Lists all issues" })
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
					keyof SelectIssue | undefined,
					"asc" | "desc" | undefined,
				]) ?? ["createdAt", "desc"];

				const statuses = (status?.split(".") as SelectIssue["status"][]) ?? [];

				const filters = [
					id
						? filterColumn({
								column: issues.id,
								value: id,
							})
						: undefined,
					statuses.length > 0 ? inArray(issues.status, statuses) : undefined,
				];

				const query =
					!operator || operator === "and" ? and(...filters) : or(...filters);

				const { data, count } = await ctx.db.transaction(async (tx) => {
					const data = await tx.query.issues.findMany({
						with: {
							creator: true,
							question: {
								with: {
									options: true,
								},
							},
							subChapter: {
								with: {
									chapter: true,
								},
							},
						},
						where: query,
						limit,
						offset,
						orderBy: [
							column && column in issues
								? order === "asc"
									? asc(issues[column])
									: desc(issues[column])
								: desc(issues.id),
						],
					});

					const count = await tx
						.select({
							count: sql<number>`count(${issues.id})`.mapWith(Number),
						})
						.from(issues)
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

	create: protectedProcedure
		.meta({ description: "Create an Issue" })
		.input(
			z.object({
				title: z.string().describe("Title of the Issue"),
				description: z.string().describe("Description of the Issue"),
				subChapterId: z.string().describe("Sub ChapterId Id"),
			})
		)
		.mutation(async ({ ctx, input }) =>
			ctx.db.insert(issues).values({ ...input, createdBy: ctx.session.user.id })
		),

	createQuestion: protectedProcedure
		.meta({ description: "Create an Issue" })
		.input(
			z.object({
				subChapterId: z.string().describe("Sub Chapter Id"),
				question: z.string().describe("MCQ Question"),
				questionWeight: z
					.enum(questionWeightEnum.enumValues)
					.default("1")
					.describe("Question Weight"),
				options: z
					.array(
						z.object({
							name: z.string().describe("Option"),
							isAnswer: z.boolean().describe("Is Answer"),
						})
					)
					.describe("MCQ Options"),
				solution: z.string().optional(),
			})
		)
		.mutation(async ({ ctx, input }) =>
			ctx.db.transaction(async (tx) => {
				const questionRes = await tx
					.insert(questions)
					.values({
						subChapterId: input.subChapterId,
						name: input.question,
						weight: input.questionWeight,
						status: "DRAFT",
						solution: input.solution,
					})
					.returning({
						id: questions.id,
					});

				if (!questionRes[0]?.id) {
					tx.rollback();
					return;
				}

				await tx.insert(options).values(
					input.options.map((option) => ({
						name: option.name,
						isAnswer: option.isAnswer === true ? true : undefined,
						// TODO: why the fuck do i need an assertion here ?
						questionId: questionRes[0]?.id ?? "",
					}))
				);

				return tx.insert(issues).values({
					title: "MCQ Question",
					description: `MCQ | ${input.question} | ${input.questionWeight} | ${input.options
						.map((option) => option.name)
						.join(",")}`,
					subChapterId: input.subChapterId,
					questionId: questionRes[0].id,
					status: "PENDING",
					createdBy: ctx.session.user.id,
				});
			})
		),

	updateStatus: protectedProcedure
		.meta({ description: "Update Order Status of an order" })
		.input(
			z.object({
				orderIds: z.array(z.string()).describe("Id of the order"),
				newStatus: z
					.enum(issues.status.enumValues)
					.describe("New Status of the order"),
			})
		)
		.mutation(async ({ ctx, input }) =>
			ctx.db
				.update(issues)
				.set({ status: input.newStatus })
				.where(inArray(issues.id, input.orderIds))
		),

	delete: protectedProcedure
		.meta({ description: "Delete multiple orders" })
		.input(
			z.object({
				orderIds: z.array(z.string()).describe("Id of the order"),
			})
		)
		.mutation(async ({ ctx, input }) =>
			ctx.db.delete(issues).where(inArray(issues.id, input.orderIds))
		),
});

export default issueRouter;
