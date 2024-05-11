import React, { Suspense } from "react";
import { CategoryClient } from "./components/client";
import { db } from "@/lib/db";
import { CategoryColumn } from "./components/columns";
import { format } from "date-fns";
import { unstable_noStore as noStore } from "next/cache";

const CategoryPage = async ({ params }: { params: { storeId: string } }) => {
  noStore();
  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <Suspense fallback={<p>loading categories client</p>}>
          <CategoryClient data={formattedCategories} />
        </Suspense>
      </div>
    </div>
  );
};

export default CategoryPage;
