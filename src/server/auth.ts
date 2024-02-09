/* eslint-disable no-param-reassign */

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import { eq } from "drizzle-orm";
import authConfig from "@/config/auth";

import { db } from "@/server/db";
import { createTable, users } from "@/server/db/schema";
import { type SelectUser } from "./db/types";

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
			role: SelectUser["role"];
			isOAuth: boolean;
		} & DefaultSession["user"];
	}
}

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
	update,
} = NextAuth({
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},
	events: {
		async linkAccount({ user }) {
			await db
				.update(users)
				.set({ emailVerified: new Date() })
				.where(eq(users.id, user.id));
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			// Allow OAuth without email verification
			if (account?.provider !== "credentials") return true;

			const existingUser = await db.query.users.findFirst({
				where: (users, { eq }) => eq(users.id, user.id),
			});

			// Prevent sign in without email verification
			if (!existingUser?.emailVerified) return false;

			return true;
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}

			if (token.role && session.user) {
				session.user.role = token.role as SelectUser["role"];
			}

			if (session.user) {
				session.user.name = token.name;
				session.user.email = token.email;
			}

			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			// const existingUser = await  getUserById(token.sub);
			const existingUser = await db.query.users.findFirst({
				where: (users, { eq }) => eq(users.id, token.sub ?? ""),
			});

			if (!existingUser) return token;

			const existingAccount = await db.query.accounts.findFirst({
				where: (accounts, { eq }) => eq(accounts.userId, existingUser.id),
			});

			token.isOAuth = !!existingAccount;
			token.name = existingUser.name;
			token.email = existingUser.email;
			token.role = existingUser.role;

			return token;
		},
	},
	adapter: DrizzleAdapter(db, createTable),
	session: { strategy: "jwt" },
	...authConfig,
});
