"use server";

import * as z from "zod";

import { getUserByEmail } from "../data/user";

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

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
