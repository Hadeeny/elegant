import { db } from "@/lib/db";
import React, { Suspense } from "react";
import BillboardForm from "./components/billboard-form";
import { getCurrentUser } from "@/lib/utils";
import { unstable_noStore } from "next/cache";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  unstable_noStore();
  const billboard = await db.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  const { userId } = await getCurrentUser();
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Suspense fallback={<p>loading</p>}>
          <BillboardForm userId={userId} initialData={billboard} />
        </Suspense>
      </div>
    </div>
  );
};

export default BillboardPage;
