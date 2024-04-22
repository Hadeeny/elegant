import { db } from "@/lib/db";
import React from "react";
import CategoryForm from "./components/category-form";
import { getCurrentUser } from "@/lib/utils";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const { userId } = await getCurrentUser();
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm
          userId={userId}
          initialData={category}
          billboards={billboards}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
