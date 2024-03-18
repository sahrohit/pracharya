import { sql } from "drizzle-orm";
import { type Context } from "@/server/api/trpc";

type Pattern = {
	questionId: string | null;
	id: string;
	weight: "1" | "2";
	questionNumber: number;
	examId: string;
	subChapters: {
		subChapterId: string | null;
		patternId: string;
	}[];
};

const getTestQuestions: (
	ctx: Context,
	pattern: Pattern[],
	questions: string[]
) => Promise<Pattern[]> = async (ctx, pattern, questions) => {
	const updatedPattern = pattern;
	const updatedQuestions = questions;

	const testQuestions = await Promise.all(
		pattern
			.filter((pattern) => pattern.questionId === null)
			.map(async (pattern) => ({
				questionId: (await ctx.db.query.questions.findFirst({
					columns: {
						id: true,
					},
					where: (questions, { inArray, and, eq, notInArray }) =>
						and(
							pattern.subChapters.length > 0
								? inArray(
										questions.subChapterId,
										pattern.subChapters.map((s) => s.subChapterId!)
									)
								: undefined,
							eq(questions.weight, pattern.weight),
							eq(questions.status, "PUBLISHED"),
							updatedQuestions.length > 0
								? notInArray(questions.id, updatedQuestions)
								: undefined
						),
					orderBy: sql`RANDOM()`,
				}))!.id,
				patternId: pattern.id,
			}))
	);

	testQuestions.forEach((q) => {
		if (q.questionId && !updatedQuestions.includes(q.questionId)) {
			updatedQuestions.push(q.questionId);
			updatedPattern[
				updatedPattern.findIndex((p) => p.id === q.patternId)
			]!.questionId = q.questionId;
		}
	});

	if (updatedPattern.filter((p) => p.questionId === null).length === 0) {
		return updatedPattern;
	}

	await getTestQuestions(
		ctx,
		updatedPattern.filter((p) => p.questionId === null),
		updatedQuestions
	);

	return updatedPattern.filter((pattern) => pattern.questionId !== null);
};

export default getTestQuestions;
