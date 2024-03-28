import StoreSwitcher from "@/components/store-switcher";
import { db } from "@/lib/db";
import React from "react";

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const id = params.storeId;
  const store = await db.store.findFirst({
    where: {
      id,
    },
  });
  return (
    <>
      <div>This is a dashboard, your store name isss {store?.name}</div>
    </>
  );
};

export default DashboardPage;
