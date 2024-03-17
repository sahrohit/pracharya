import {
	type chapters,
	type subChapters,
	type issues,
	type users,
	type questions,
	type options,
	type exams,
	type tests,
	type testQuestions,
} from "./schema";

export type SelectUser = typeof users.$inferSelect;
export type SelectIssue = typeof issues.$inferSelect;
export type SelectQuestion = typeof questions.$inferSelect;
export type SelectOption = typeof options.$inferSelect;
export type SelectChapter = typeof chapters.$inferSelect;
export type SelectSubChapter = typeof subChapters.$inferSelect;
export type SelectExam = typeof exams.$inferSelect;
export type SelectTest = typeof tests.$inferSelect;
export type SelectTestQuestion = typeof testQuestions.$inferSelect;

export type SelectSubChapterWithChapter = SelectSubChapter & {
	chapter: SelectChapter;
};

export type SelectIssueWithQuestion = SelectIssue & {
	creator: SelectUser;
	question:
		| (SelectQuestion & {
				options: SelectOption[];
		  })
		| null;
	subChapter: SelectSubChapter & {
		chapter: SelectChapter;
	};
};

export type SelectTestWithQuestionsForTest = SelectTest & {
	questions: (SelectTestQuestion & {
		question: SelectQuestion & {
			options: {
				id: string;
				name: string;
				questionId: string;
			}[];
		};
	})[];
};

export type SelectTestWithQuestionsForReport = SelectTest & {
	questions: (SelectTestQuestion & {
		question: SelectQuestion & {
			subChapter: SelectSubChapter;
			options: SelectOption[];
		};
	})[];
};
