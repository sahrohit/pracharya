import { type issues, type users } from "./schema";

export type SelectUser = typeof users.$inferSelect;
export type SelectIssue = typeof issues.$inferSelect;
