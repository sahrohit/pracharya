import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "@/server/api/trpc";
import { questionWeightEnum } from "@/server/db/schema";

const patternRouter = createTRPCRouter({
	updatePattern: adminProcedure
		.meta({ description: "Update Exam Pattern" })
		.input(
			z.object({
				examId: z.string().describe("Id of the Exam"),
				updatedPatterns: z.array(
					z.object({
						id: z.string(),
						questionNumber: z.number(),
						weight: z.enum(questionWeightEnum.enumValues),
						subChapters: z.array(
							z.object({
								subChapterId: z.string(),
							})
						),
					})
				),
			})
		)
		.mutation(async () => {}),
});

export default patternRouter;
