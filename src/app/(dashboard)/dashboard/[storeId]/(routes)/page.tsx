import { auth } from "@/auth";
import StoreSwitcher from "@/components/store-switcher";
import { db } from "@/lib/db";
import React from "react";
import { Dashboard } from "../components/overview-client";

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const id = params.storeId;
  const store = await db.store.findFirst({
    where: {
      id,
    },
  });

  const session = await auth();
  return (
    <>
      <Dashboard />
    </>
  );
};

export default DashboardPage;
