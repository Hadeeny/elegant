import React, { Suspense } from "react";
import { SizeClient } from "./components/client";
import { db } from "@/lib/db";
import { SizeColumn } from "./components/columns";
import { format } from "date-fns";
import { unstable_noStore as noStore } from "next/cache";
import Spinner from "@/components/ui/spinner";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  noStore();
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <Suspense fallback={<Spinner />}>
          <SizeClient data={formattedSizes} />
        </Suspense>
      </div>
    </div>
  );
};

export default SizesPage;
