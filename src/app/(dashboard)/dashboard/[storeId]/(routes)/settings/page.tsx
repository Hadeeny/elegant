import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/utils";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import SettingsForm from "./components/settings-form";
interface SettingsPageProps {
  params: { storeId: string };
}

const page = async ({ params }: SettingsPageProps) => {
  // const {userId} = params
  const { storeId } = params;
  const { userId } = await getCurrentUser();
  // console.log(`user is is ${userId}`);

  const store = await db.store.findFirst({
    where: {
      userId,
      id: storeId,
    },
  });

  const users = await db.user.findMany();

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SettingsForm users={users} userId={userId} initialData={store} />
        </div>
      </div>
    </>
  );
};

export default page;
