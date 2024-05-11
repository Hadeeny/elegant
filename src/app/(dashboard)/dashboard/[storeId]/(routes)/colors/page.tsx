import React, { Suspense } from "react";
import { SizeClient } from "./components/client";
import { db } from "@/lib/db";
import { ColorColumn } from "./components/columns";
import { format } from "date-fns";
import { unstable_noStore as noStore } from "next/cache";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  noStore();
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <Suspense fallback={<p>Loading Colors client</p>}>
          <SizeClient data={formattedColors} />
        </Suspense>
      </div>
    </div>
  );
};

export default ColorsPage;
