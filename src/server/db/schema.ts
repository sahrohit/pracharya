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
	issues: many(issues),
}));

// Issues Table

export const issueStatusEnum = pgEnum("issue_status", [
	"PENDING",
	"COMPETED",
	"REJECTED",
]);

export const issues = createTable("issue", {
	id: varchar("id", { length: 255 })
		.notNull()
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	title: varchar("title", { length: 255 }),
	description: text("description"),
	chapterId: varchar("chapter_id", { length: 255 }).references(
		() => chapters.id
	),
	questionId: varchar("question_id", { length: 255 }).references(
		() => questions.id
	),
	status: issueStatusEnum("status").default("PENDING").notNull(),
	remarks: text("remarks"),
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
	chapter: one(chapters, {
		fields: [issues.chapterId],
		references: [chapters.id],
	}),
}));

// Questions Table

export const questionWeightEnum = pgEnum("question_weight", ["1", "2"]);

export const questions = createTable("question", {
	id: varchar("id", { length: 255 })
		.notNull()
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text("name"),
	weight: questionWeightEnum("weight").default("1").notNull(),
	chapterId: varchar("chapter_id", { length: 255 })
		.references(() => chapters.id)
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
	chapter: one(chapters, {
		fields: [questions.chapterId],
		references: [chapters.id],
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
		name: text("name"),
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
	password: varchar("password"),
	dakshina: integer("dakshina").default(0),
	role: userRoleEnum("user_role").default("USER").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
}));

export const passwordResetTokens = createTable("password_reset_token", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	email: varchar("email", { length: 255 }).notNull(),
	token: varchar("token", { length: 255 }).notNull().unique(),
	expires: timestamp("expires", {
		mode: "date",
	}),
});

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

export const verificationTokens = createTable(
	"verificationToken",
	{
		identifier: varchar("identifier", { length: 255 }).notNull(),
		email: varchar("email", { length: 255 }).notNull(),
		token: varchar("token", { length: 255 }).notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	})
);
