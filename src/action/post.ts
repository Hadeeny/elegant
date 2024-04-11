"use server";

import { db } from "@/lib/db";
import {
  postSchema,
  TPostValues,
} from "@/lib/validators/account-credentials-validators";
import { getUserByEmail } from "../data/users";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const post = async (values: TPostValues) => {
  const session = await auth();
  const validatedFields = postSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Field" };
  }

  const { post } = validatedFields.data;

  await db.post.create({
    data: {
      body: post,
      userId: session?.user.id,
    },
  });
  // revalidatePath("/");
  // TODO: SEND VERIFICATIOIN TOKEN EMAIL
  return { success: "Post created successfully!", post, id: session?.user.id };
};
