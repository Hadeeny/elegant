"use server";
import { db } from "@/lib/db";
import {
  TManageUserForm,
  ManageUserForm,
} from "@/lib/validators/account-credentials-validators";
import { getUserByEmail } from "../data/users";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const UpdateRole = async (values: TManageUserForm) => {
  const session = await auth();
  const validatedFields = ManageUserForm.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Field" };
  }

  const { role, id } = validatedFields.data;

  await db.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });
  // revalidatePath("/");
  // TODO: SEND VERIFICATIOIN TOKEN EMAIL
  return { success: "User role updated successfully!" };
};
