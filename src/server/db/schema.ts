/* eslint-disable @typescript-eslint/no-use-before-define */

import { relations, sql } from "drizzle-orm";
import {
	boolean,
	index,
	integer,
	pgEnum,
	pgTableCreator,
	primaryKey,
	text,
	timestamp,
	unique,
	varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `pracharya_${name}`);

// Global Enums

export const publishStatusEnum = pgEnum("publish_status", [
	"PUBLISHED",
	"DRAFT",
	"ARCHIVED",
]);

export const questionWeightEnum = pgEnum("question_weight", ["1", "2"]);

// Courses Table

export const courses = createTable("course", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	name: varchar("name", { length: 255 }),
});

// Chapters Table

export const chapters = createTable("chapter", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	name: varchar("name", { length: 255 }),
	content: text("content"),
});

export const chaptersRelations = relations(chapters, ({ many }) => ({
	subChapters: many(subChapters),
}));

// Courses to Chapter Table

export const coursesToChapters = createTable(
	"course_to_chapter",
	{
		courseId: varchar("course_id", { length: 255 })
			.references(() => courses.id)
			.notNull(),
		chapterId: varchar("chapter_id", { length: 255 })
			.references(() => chapters.id)
			.notNull(),
	},
	(coursesToChapters) => ({
		pk: primaryKey({
			columns: [coursesToChapters.courseId, coursesToChapters.chapterId],
		}),
	})
);

// Sub Chapters Table

export const subChapters = createTable("sub_chapter", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	name: varchar("name", { length: 255 }),
	content: text("content"),
	chapterId: varchar("chapter_id", { length: 255 })
		.references(() => chapters.id)
		.notNull(),
});

export const subChaptersRelations = relations(subChapters, ({ one, many }) => ({
	chapter: one(chapters, {
		fields: [subChapters.chapterId],
		references: [chapters.id],
	}),
	questions: many(questions),
	patterns: many(patterns),
}));

// Exam Table

export const exams = createTable("exam", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	name: varchar("name", { length: 255 }),
	status: publishStatusEnum("status").default("DRAFT").notNull(),
	createdAt: timestamp("created_at", {
		withTimezone: true,
	})
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
	})
		.defaultNow()
		.notNull(),
});

export const examRelations = relations(exams, ({ many }) => ({
	patterns: many(patterns),
}));

// Pattern Table

export const patterns = createTable(
	"pattern",
	{
		id: varchar("id", { length: 255 }).notNull().unique(),
		questionNumber: integer("question_number").notNull(),
		examId: varchar("exam_id", { length: 255 })
			.references(() => exams.id, {
				onDelete: "cascade",
			})
			.notNull(),
		weight: questionWeightEnum("weight").default("1").notNull(),
	},
	(pattern) => ({
		pk: primaryKey({
			columns: [pattern.examId, pattern.questionNumber],
		}),
	})
);

export const patternRelations = relations(patterns, ({ one, many }) => ({
	subChapters: many(patternsToSubChapters),
	exam: one(exams, {
		fields: [patterns.examId],
		references: [exams.id],
	}),
}));

// Patterns to SubChapters

export const patternsToSubChapters = createTable("patterns_to_sub_chapter", {
	patternId: varchar("pattern_id", { length: 255 })
		.notNull()
		.references(() => patterns.id, { onDelete: "cascade" }),
	subChapterId: varchar("sub_chapter_id", { length: 255 }).references(
		() => subChapters.id,
		{ onDelete: "cascade" }
	),
});

export const patternsToSubChaptersRelations = relations(
	patternsToSubChapters,
	({ one }) => ({
		pattern: one(patterns, {
			fields: [patternsToSubChapters.patternId],
			references: [patterns.id],
		}),
		subChapter: one(subChapters, {
			fields: [patternsToSubChapters.subChapterId],
			references: [subChapters.id],
		}),
	})
);

// Issues Table

export const issueStatusEnum = pgEnum("issue_status", [
	"PENDING",
	"COMPLETED",
	"REJECTED",
]);

export const issues = createTable("issue", {
	id: varchar("id", { length: 255 })
		.notNull()
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	title: varchar("title", { length: 255 }),
	description: text("description"),
	subChapterId: varchar("sub_chapter_id", { length: 255 })
		.references(() => subChapters.id)
		.notNull(),
	questionId: varchar("question_id", { length: 255 }).references(
		() => questions.id
	),
	status: issueStatusEnum("status").default("PENDING").notNull(),
	remarks: text("remarks"),
	createdBy: varchar("created_by", { length: 255 })
		.references(() => users.id)
		.notNull(),
	createdAt: timestamp("created_at", {
		withTimezone: true,
	})
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
	})
		.defaultNow()
		.notNull(),
});

export const issuesRelations = relations(issues, ({ one }) => ({
	subChapter: one(subChapters, {
		fields: [issues.subChapterId],
		references: [subChapters.id],
	}),
	question: one(questions, {
		fields: [issues.questionId],
		references: [questions.id],
	}),
	creator: one(users, {
		fields: [issues.createdBy],
		references: [users.id],
	}),
}));

// Questions Table

export const questions = createTable("question", {
	id: varchar("id", { length: 255 })
		.notNull()
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text("name"),
	weight: questionWeightEnum("weight").default("1").notNull(),
	subChapterId: varchar("sub_chapter_id", { length: 255 })
		.references(() => subChapters.id)
		.notNull(),
	status: publishStatusEnum("status").default("DRAFT").notNull(),
	remarks: text("remarks"),
	solution: text("solution"),
	createdAt: timestamp("created_at", {
		withTimezone: true,
	})
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
	})
		.defaultNow()
		.notNull(),
});

export const questionsRelations = relations(questions, ({ one, many }) => ({
	options: many(options),
	subChapter: one(subChapters, {
		fields: [questions.subChapterId],
		references: [subChapters.id],
	}),
}));

// Options Table

export const options = createTable(
	"option",
	{
		id: varchar("id", { length: 255 })
			.notNull()
			.primaryKey()
			.default(sql`gen_random_uuid()`),
		name: text("name").notNull(),
		isAnswer: boolean("is_answer"),
		questionId: varchar("question_id", { length: 255 })
			.references(() => questions.id)
			.notNull(),
	},
	(option) => ({
		unq: unique().on(option.isAnswer, option.questionId),
		questionIdIdx: index("questionId_idx").on(option.questionId),
	})
);

export const optionsRelations = relations(options, ({ one }) => ({
	question: one(questions, {
		fields: [options.questionId],
		references: [questions.id],
	}),
}));

// Users Table

export const userRoleEnum = pgEnum("user_role", [
	"USER",
	"CONTRIBUTOR",
	"MAINTAINER",
	"ADMIN",
	"OWNER",
]);

export const users = createTable("user", {
	id: varchar("id", { length: 255 })
		.notNull()
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("emailVerified", {
		mode: "date",
	}).default(sql`CURRENT_TIMESTAMP`),
	image: varchar("image", { length: 255 }),
	dakshina: integer("dakshina").default(0),
	role: userRoleEnum("user_role").default("USER").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
	issues: many(issues),
}));

export const accounts = createTable(
	"account",
	{
		userId: varchar("userId", { length: 255 })
			.notNull()
			.references(() => users.id),
		type: varchar("type", { length: 255 })
			// .$type<Adapter["type"]>()
			.notNull(),
		provider: varchar("provider", { length: 255 }).notNull(),
		providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: varchar("token_type", { length: 255 }),
		scope: varchar("scope", { length: 255 }),
		id_token: text("id_token"),
		session_state: varchar("session_state", { length: 255 }),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
		userIdIdx: index("account_userId_idx").on(account.userId),
	})
);

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
	"session",
	{
		sessionToken: varchar("sessionToken", { length: 255 })
			.notNull()
			.primaryKey(),
		userId: varchar("userId", { length: 255 })
			.notNull()
			.references(() => users.id),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(session) => ({
		userIdIdx: index("session_userId_idx").on(session.userId),
	})
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));
