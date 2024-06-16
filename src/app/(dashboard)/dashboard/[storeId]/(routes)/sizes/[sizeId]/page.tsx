import { db } from "@/lib/db";
import React, { Suspense } from "react";
import BillboardForm from "./components/size-form";
import { getCurrentUser } from "@/lib/utils";
import { unstable_noStore } from "next/cache";
import Spinner from "@/components/ui/spinner";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  unstable_noStore();
  const size = await db.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  const { userId } = await getCurrentUser();
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Suspense fallback={<Spinner />}>
          <BillboardForm userId={userId} initialData={size} />
        </Suspense>
      </div>
    </div>
  );
};

export default SizePage;
