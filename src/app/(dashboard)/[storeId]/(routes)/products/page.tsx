import React, { Suspense } from "react";
import { ProductClient } from "./components/client";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { unstable_noStore as noStore } from "next/cache";
import { formatPrice, formatter } from "@/lib/utils";
import { ProductColumn } from "./components/columns";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  noStore();
  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      color: true,
      size: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <Suspense fallback={<p>Loading billboard client</p>}>
          <ProductClient data={formattedProducts} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProductsPage;
