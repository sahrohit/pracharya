/* eslint-disable import/prefer-default-export */

import { z } from "zod";
import { questionWeightEnum } from "@/server/db/schema";

export const PatternFormSchema = z.object({
	patterns: z.array(
		z.object({
			questionNumber: z.number(),
			weight: z.enum(questionWeightEnum.enumValues),
			subChapters: z.array(
				z.object({
					subChapterId: z.string().nullable(),
				})
			),
		})
	),
});
