import { inArray } from "drizzle-orm";
import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { courses } from "@/server/db/schema";

const courseRouter = createTRPCRouter({
	get: publicProcedure
		.input(
			z.object({
				id: z.string().optional().describe("Course Id"),
				limit: z.number().optional().describe("Limit"),
			})
		)
		.meta({
			description: "List all chaptes",
		})
		.query(async ({ ctx, input }) =>
			ctx.db.query.courses.findMany({
				where: (courses, { eq }) =>
					input.id ? eq(courses.id, input.id) : undefined,
				limit: input.limit ?? undefined,
			})
		),

	delete: protectedProcedure
		.meta({ description: "Delete multiple courses" })
		.input(
			z.object({
				courseIds: z.array(z.string()).describe("Id of the course"),
			})
		)
		.mutation(async ({ ctx, input }) =>
			ctx.db.delete(courses).where(inArray(courses.id, input.courseIds))
		),
});

export default courseRouter;
