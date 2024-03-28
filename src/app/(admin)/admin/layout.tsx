import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  const store = await db.store.findFirst({
    where: {
      userId: user?.id,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }
  return (
    <>
      <p>Admin wrapper</p>
      {children}
    </>
  );
}
