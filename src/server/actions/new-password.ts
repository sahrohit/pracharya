"use server";

import { type z } from "zod";
import bcrypt from "bcryptjs";

import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { getPasswordResetTokenByToken } from "../data/password-reset-token";
import { getUserByEmail } from "../data/user";
import { passwordResetTokens, users } from "../db/schema";
import { NewPasswordFormSchema } from "@/components/schema/auth";

const newPassword = async (
	values: z.infer<typeof NewPasswordFormSchema>,
	token?: string | null
) => {
	if (!token) {
		return { error: "Missing token!" };
	}

	const validatedFields = NewPasswordFormSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields!" };
	}

	const { password } = validatedFields.data;

	const existingToken = await getPasswordResetTokenByToken(token);

	if (!existingToken) {
		return { error: "Invalid token!" };
	}

	const hasExpired = existingToken.expires
		? existingToken.expires < new Date()
		: true;

	if (hasExpired) {
		return { error: "Token has expired!" };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) {
		return { error: "Email does not exist!" };
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await db
		.update(users)
		.set({ password: hashedPassword })
		.where(eq(users.id, existingUser.id));

	await db
		.delete(passwordResetTokens)
		.where(eq(passwordResetTokens.id, existingToken.id));

	return { success: "Password updated!" };
};

export default newPassword;
