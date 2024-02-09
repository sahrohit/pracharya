"use server";

import { type z } from "zod";

import { getUserByEmail } from "../data/user";
import { ResetPasswordSchema } from "@/components/schema/auth";

export const reset = async (values: z.infer<typeof ResetPasswordSchema>) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid emaiL!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  // TODO: Send Password Reset Email
  // const passwordResetToken = await generatePasswordResetToken(email);
  // await sendPasswordResetEmail(
  //   passwordResetToken.email,
  //   passwordResetToken.token,
  // );

  return { success: "Reset email sent!" };
};
