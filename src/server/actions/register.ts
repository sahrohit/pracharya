"use server";

import { type z } from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/server/db";
import { getUserByEmail } from "../data/user";
import { users } from "../db/schema";
import { RegisterFormSchema } from "@/components/schema/auth";

export const register = async (values: z.infer<typeof RegisterFormSchema>) => {
  const validatedFields = RegisterFormSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields!");
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already in use!");
  }

  await db
    .insert(users)
    .values({ name, email, password: hashedPassword })
    .returning();

  // TODO: Send Verification Email
  // const verificationToken = await generateVerificationToken(email);
  // await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
