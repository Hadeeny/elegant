"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getUserByEmail } from "../data/users";
import {
  ReviewSchema,
  TReviewValue,
} from "@/lib/validators/account-credentials-validators";
import { revalidatePath } from "next/cache";

export const createReview = async (
  values: TReviewValue,
  rating: number,
  productId: string
) => {
  const validatedFields = ReviewSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Field" };
  }

  const { review } = validatedFields.data;
  if (!review) {
    return { error: "You must enter a review" };
  }
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return { error: "Access denied" };
  }

  const createdReview = await db.review.create({
    data: {
      productId,
      rating,
      userId: user?.id,
      comment: review,
    },
  });

  revalidatePath(`/${productId}`);

  return { success: "New review created successfully!", createdReview };
};
