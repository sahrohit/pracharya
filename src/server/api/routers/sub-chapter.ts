import { inArray } from "drizzle-orm";
import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { subChapters } from "@/server/db/schema";

const subChapterRouter = createTRPCRouter({
	get: publicProcedure
		.input(
			z.object({
				id: z.string().optional().describe("Issue Id"),
				limit: z.number().optional().describe("Limit"),
			})
		)
		.meta({
			description: "List all chaptes",
		})
		.query(async ({ ctx, input }) =>
			ctx.db.query.subChapters.findMany({
				with: {
					chapter: true,
				},
				where: (subChapters, { eq }) =>
					input.id ? eq(subChapters.id, input.id) : undefined,
				limit: input.limit ?? undefined,
			})
		),

	delete: protectedProcedure
		.meta({ description: "Delete multiple subChapters" })
		.input(
			z.object({
				chapterIds: z.array(z.string()).describe("Id of the Chapter"),
			})
		)
		.mutation(async ({ ctx, input }) =>
			ctx.db
				.delete(subChapters)
				.where(inArray(subChapters.id, input.chapterIds))
		),
});

export default subChapterRouter;
