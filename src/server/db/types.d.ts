import {
	type chapters,
	type subChapters,
	type issues,
	type users,
	type questions,
	type options,
} from "./schema";

export type SelectUser = typeof users.$inferSelect;
export type SelectIssue = typeof issues.$inferSelect;
export type SelectQuestion = typeof questions.$inferSelect;
export type SelectOption = typeof options.$inferSelect;
export type SelectChapter = typeof chapters.$inferSelect;
export type SelectSubChapter = typeof subChapters.$inferSelect;

export type SelectIssueWithQuestion = SelectIssue & {
	question: SelectQuestion & {
		options: SelectOption[];
	};
	subChapter: SelectSubChapter & {
		chapter: SelectChapter;
	};
};
