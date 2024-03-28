"use server";

import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getUserByEmail } from "../data/users";
import {
  CreateStoreSchema,
  TCreateStoreSchema,
} from "@/lib/validators/create-store-validator";

export const createStore = async (values: TCreateStoreSchema) => {
  const validatedFields = CreateStoreSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Field" };
  }

  const { name } = validatedFields.data;
  if (!name) {
    return { error: "You must enter a store name" };
  }
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return { error: "Access denied" };
  }

  const store = await db.store.create({
    data: {
      name,
      userId: user?.id,
    },
  });

  return { success: "Store created successfully!", store };
};
