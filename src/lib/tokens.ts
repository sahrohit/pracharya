import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { generateId } from "./nanoid";
import { passwordResetTokens, verificationTokens } from "@/server/db/schema";
import { getVerificationTokenByEmail } from "@/server/data/verificiation-token";

export const generatePasswordResetToken = async (email: string) => {
	const token = generateId("password-reset-");
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await db.query.passwordResetTokens.findFirst({
		where: (passwordResetTokens, { eq }) =>
			eq(passwordResetTokens.email, email),
	});

	if (existingToken) {
		await db
			.delete(passwordResetTokens)
			.where(eq(passwordResetTokens.id, existingToken.id));
	}

	const passwordResetToken = await db
		.insert(passwordResetTokens)
		.values({
			id: generateId("password-reset-"),
			email,
			token,
			expires,
		})
		.returning();

	return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
	const token = generateId("email-verification-");
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getVerificationTokenByEmail(email);

	if (existingToken) {
		await db
			.delete(verificationTokens)
			.where(eq(verificationTokens.identifier, existingToken.identifier));
	}

	const verficationToken = await db.insert(verificationTokens).values({
		identifier: generateId("email-verification-"),
		email,
		token,
		expires,
	});

	return verficationToken;
};
