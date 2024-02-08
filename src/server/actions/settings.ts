"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { update } from "@/server/auth";
import { db } from "@/server/db";
import { currentUser } from "@/lib/auth";
import { users } from "../db/schema";
import { getUserByEmail, getUserById } from "../data/user";
import { eq } from "drizzle-orm";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum(users.role.enumValues),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
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
      return { error: "Email already in use!" };
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
      dbUser.password,
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
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
