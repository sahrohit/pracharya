/* eslint-disable no-param-reassign */

"use server";

import { type z } from "zod";
import bcrypt from "bcryptjs";

import { eq } from "drizzle-orm";
import { update } from "@/server/auth";
import { db } from "@/server/db";
import { currentUser } from "@/lib/auth";
import { users } from "../db/schema";
import { getUserByEmail, getUserById } from "../data/user";
import { type SettingsFormSchema } from "@/components/schema/settings";

const settings = async (values: z.infer<typeof SettingsFormSchema>) => {
	const user = await currentUser();

	if (!user) {
		throw new Error("Unauthorized");
	}

	const dbUser = await getUserById(user.id);

	if (!dbUser) {
		throw new Error("Unauthorized");
	}

	if (user.isOAuth) {
		values.email = undefined;
		values.password = undefined;
		values.newPassword = undefined;
		values.isTwoFactorEnabled = undefined;
	}

	if (values.email && values.email !== user.email) {
		const existingUser = await getUserByEmail(values.email);

		if (existingUser && existingUser.id !== user.id) {
			throw new Error("Email already in use!");
		}

		// TODO: Send Verificaiton Mail here
		// const verificationToken = await generateVerificationToken(values.email);
		// await sendVerificationEmail(
		//   verificationToken.email,
		//   verificationToken.token,
		// );

		return { success: "Verification email sent!" };
	}

	if (values.password && values.newPassword && dbUser.password) {
		const passwordsMatch = await bcrypt.compare(
			values.password,
			dbUser.password
		);

		if (!passwordsMatch) {
			throw new Error("Incorrect password!");
		}

		const hashedPassword = await bcrypt.hash(values.newPassword, 10);
		values.password = hashedPassword;
		values.newPassword = undefined;
	}

	const updatedUser = await db
		.update(users)
		.set(values)
		.where(eq(users.id, dbUser.id))
		.returning();

	await update({
		user: {
			name: updatedUser[0]?.name ?? "",
			email: updatedUser[0]?.email ?? "",
			role: updatedUser[0]?.role,
		},
	});

	return { success: "Settings Updated!" };
};

export default settings;
