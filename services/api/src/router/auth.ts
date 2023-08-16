import { z } from "zod";
import db from "../db/db";
import { users, type User } from "../db/schema";
import { router, publicProcedure, authorizedProcedure } from "../server";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const generateAccessToken = (user: User) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "7d",
	});
};

export const authRouter = router({
	me: authorizedProcedure.query(async () => {
		return await db
			.select()
			.from(users)
			.where(eq(users.email, "sahrohit9586@gmail.com"))
			.then((res) => res[0] ?? null);
	}),
	getUserById: publicProcedure
		.input(z.string().uuid())
		.query(async ({ input }) => {
			return await db
				.select()
				.from(users)
				.where(eq(users.id, input))
				.then((res) => res[0] ?? null);
		}),
	getUserByEmail: publicProcedure
		.input(z.string().email())
		.query(async ({ input }) => {
			return await db
				.select()
				.from(users)
				.where(eq(users.email, input))
				.then((res) => res[0] ?? null);
		}),
	register: publicProcedure
		.input(
			z.object({
				name: z.string(),
				email: z.string().email(),
				schoolId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			return await db
				.insert(users)
				.values({ ...input, id: randomUUID() })
				.returning()
				.then((res) => res[0] ?? null);
		}),
	login: publicProcedure
		.input(
			z.object({
				email: z.string().email(),
				password: z.string(),
				schoolId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			const user = await db
				.select()
				.from(users)
				.where(eq(users.email, input.email))
				.then((res) => res[0] ?? null);

			const accessToken = generateAccessToken(user);
			const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

			return {
				accessToken,
				refreshToken,
			};
		}),
});
