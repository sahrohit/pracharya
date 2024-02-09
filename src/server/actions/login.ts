/* eslint-disable consistent-return */

"use server";

import { type z } from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/server/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";
import { db } from "@/server/db";
import { LoginFormSchema } from "@/components/schema/auth";

const login = async (
	values: z.infer<typeof LoginFormSchema>,
	callbackUrl?: string | null
) => {
	const validatedFields = LoginFormSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: "Invalid fields!",
		};
	}

	const { email, password } = validatedFields.data;

	const existingUser = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.email, email),
	});

	if (!existingUser?.email || !existingUser.password) {
		return {
			error: "Email does not exist!",
		};
	}

	if (!existingUser.emailVerified) {
		// TODO: Send Email with verification token
		// const verificationToken = await generateVerificationToken(
		//   existingUser.email,
		// );

		return { success: "Confirmation email sent!" };
	}

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: callbackUrl ?? DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					throw new Error("Invalid credentials!");
				default:
					throw new Error("Something went wrong!");
			}
		}

		throw error;
	}
};

export default login;
