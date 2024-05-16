import { auth } from "@/auth";
import RoleGate from "@/components/dashboard/role-gate";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
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
    redirect(`/dashboard/${store.id}`);
  }
  return <RoleGate allowedRole={UserRole.ADMIN}>{children}</RoleGate>;
}
