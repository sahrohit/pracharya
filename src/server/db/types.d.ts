import {
	type chapters,
	type subChapters,
	type issues,
	type users,
} from "./schema";

export type SelectUser = typeof users.$inferSelect;
export type SelectIssue = typeof issues.$inferSelect;
export type SelectChapter = typeof chapters.$inferSelect;
export type SelectSubChapter = typeof subChapters.$inferSelect;

export type SelectIssueWithChapterSubChapter = SelectIssue & {
	subChapter: SelectSubChapter & {
		chapter: SelectChapter;
	};
};
