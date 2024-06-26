import { db } from "@/lib/db";
import React, { Suspense } from "react";
import ProductForm from "./components/product-form";
import { getCurrentUser } from "@/lib/utils";
import { unstable_noStore } from "next/cache";
import Spinner from "@/components/ui/spinner";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  unstable_noStore();
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });
  const { userId } = await getCurrentUser();

  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-2 sm:p-8">
        <Suspense fallback={<Spinner />}>
          <ProductForm
            userId={userId}
            initialData={product}
            categories={categories}
            colors={colors}
            sizes={sizes}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default ProductPage;
