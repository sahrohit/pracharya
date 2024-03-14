import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const reportRouter = createTRPCRouter({
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
								with: {
									options: true,
									subChapter: true,
								},
							},
						},
					},
				},
				where: (tests, { eq, and, ne }) =>
					and(
						input.id ? eq(tests.id, input.id) : undefined,
						ne(tests.status, "STARTED"),
						eq(tests.examinee, ctx.session.user.id)
					),
			})
		),
});

export default reportRouter;
