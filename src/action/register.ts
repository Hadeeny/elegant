"use server";

import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import {
  RegisterSchema,
  TRegisterSchema,
} from "@/lib/validators/account-credentials-validators";
import { getUserByEmail } from "../data/users";

export const register = async (values: TRegisterSchema) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Field" };
  }

  const { email, name, username, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userExists = await getUserByEmail(email);

  if (userExists) {
    return { error: "email already in use" };
  }

  await db.user.create({
    data: {
      name,
      email,
      username,
      password: hashedPassword,
    },
  });

  // TODO: SEND VERIFICATIOIN TOKEN EMAIL
  return { success: "User created successfully!" };
};
