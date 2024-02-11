import { inArray } from "drizzle-orm";
import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { chapters } from "@/server/db/schema";

const chapterRouter = createTRPCRouter({
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
			ctx.db.query.chapters.findMany({
				where: (chapters, { eq }) =>
					input.id ? eq(chapters.id, input.id) : undefined,
				limit: input.limit ?? undefined,
			})
		),

	delete: protectedProcedure
		.meta({ description: "Delete multiple chapters" })
		.input(
			z.object({
				chapterIds: z.array(z.string()).describe("Id of the Chapter"),
			})
		)
		.mutation(async ({ ctx, input }) =>
			ctx.db.delete(chapters).where(inArray(chapters.id, input.chapterIds))
		),
});

export default chapterRouter;
