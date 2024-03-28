"use server";

import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import {
  LoginSchema,
  RegisterSchema,
  TRegisterSchema,
  TLoginSchema,
} from "@/lib/validators/account-credentials-validators";
import { getUserByEmail } from "../data/users";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/all-routes";
import { AuthError } from "next-auth";

export const login = async (values: TLoginSchema) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Field" };
  }

  // TODO: SEND VERIFICATIOIN TOKEN EMAIL
  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
