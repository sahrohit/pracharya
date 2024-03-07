import { and, asc, desc, inArray, or, sql } from "drizzle-orm";
import { z } from "zod";

import { unstable_noStore as noStore } from "next/cache";
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from "@/server/api/trpc";
import { exams, patterns } from "@/server/db/schema";
import { type SelectExam } from "@/server/db/types";
import filterColumn from "@/lib/filter-column";

const examRouter = createTRPCRouter({
	get: publicProcedure
		.input(
			z.object({
				id: z.string().optional().describe("Issue Id"),
			})
		)
		.meta({
			description: "Get a exam with pattern",
		})
		.query(async ({ ctx, input }) =>
			ctx.db.query.exams.findFirst({
				with: {
					patterns: true,
				},
				where: (exams, { eq }) =>
					input.id ? eq(exams.id, input.id) : undefined,
			})
		),

	list: publicProcedure
		.meta({ description: "Lists all exams" })
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
					keyof SelectExam | undefined,
					"asc" | "desc" | undefined,
				]) ?? ["createdAt", "desc"];

				const statuses = (status?.split(".") as SelectExam["status"][]) ?? [];

				const filters = [
					id
						? filterColumn({
								column: exams.id,
								value: id,
							})
						: undefined,
					statuses.length > 0 ? inArray(exams.status, statuses) : undefined,
				];

				const query =
					!operator || operator === "and" ? and(...filters) : or(...filters);

				const { data, count } = await ctx.db.transaction(async (tx) => {
					const data = await tx.query.exams.findMany({
						where: query,
						limit,
						offset,
						orderBy: [
							column && column in exams
								? order === "asc"
									? asc(exams[column])
									: desc(exams[column])
								: desc(exams.id),
						],
					});

					const count = await tx
						.select({
							count: sql<number>`count(${exams.id})`.mapWith(Number),
						})
						.from(exams)
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

	create: adminProcedure
		.meta({ description: "Create an Exam" })
		.input(
			z.object({
				name: z.string().describe("Name of the exam"),
				questions: z.number().describe("Number of questions in the exam"),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const examId = input.name.replaceAll(" ", "-").toLowerCase();
			return ctx.db.transaction(async (tx) => {
				await tx.insert(exams).values({
					id: examId,
					name: input.name,
					status: "DRAFT",
				});

				await tx.insert(patterns).values(
					Array.from({ length: input.questions }).map((_, i) => ({
						examId,
						questionNumber: i + 1,
						subChapterId: null,
					}))
				);
			});
		}),

	updateStatus: adminProcedure
		.meta({ description: "Update Exam Status" })
		.input(
			z.object({
				examIds: z.array(z.string()).describe("Id of the Exam"),
				newStatus: z
					.enum(exams.status.enumValues)
					.describe("New Status of the order"),
			})
		)
		.mutation(async ({ ctx, input }) =>
			ctx.db
				.update(exams)
				.set({ status: input.newStatus })
				.where(inArray(exams.id, input.examIds))
		),

	delete: adminProcedure
		.meta({ description: "Delete multiple exam" })
		.input(
			z.object({
				examIds: z.array(z.string()).describe("Id of the Chapter"),
			})
		)
		.mutation(async ({ ctx, input }) =>
			ctx.db.delete(exams).where(inArray(exams.id, input.examIds))
		),
});

export default examRouter;
