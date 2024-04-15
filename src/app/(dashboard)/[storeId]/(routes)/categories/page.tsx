import React, { Suspense } from "react";
import { CategoryClient } from "./components/client";
import { db } from "@/lib/db";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";
import { unstable_noStore as noStore } from "next/cache";

const CategoryPage = async ({ params }: { params: { storeId: string } }) => {
  noStore();
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <Suspense fallback={<p>loading categories client</p>}>
          <CategoryClient data={formattedBillboards} />
        </Suspense>
      </div>
    </div>
  );
};

export default CategoryPage;
