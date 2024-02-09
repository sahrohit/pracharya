"use server";

import { type z } from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/server/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";
import { generateVerificationToken } from "@/lib/tokens";
import { db } from "@/server/db";
import { LoginFormSchema } from "@/components/schema/auth";

export const login = async (
  values: z.infer<typeof LoginFormSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginFormSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields!");
  }

  const { email, password } = validatedFields.data;

  const existingUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (!existingUser?.email || !existingUser.password) {
    throw new Error("Email does not exist!");
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    // TODO: Send Email with verification token

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
