import { db } from "@/lib/db";
import React from "react";
import BillboardForm from "./components/billboard-form";
import { getCurrentUser } from "@/lib/utils";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await db.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  const { userId } = await getCurrentUser();
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm userId={userId} initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
