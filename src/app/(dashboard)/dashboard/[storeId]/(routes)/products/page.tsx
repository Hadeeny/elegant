import React, { Suspense } from "react";
import { ProductClient } from "./components/client";
import Spinner from "@/components/ui/spinner";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <Suspense fallback={<Spinner />}>
          <ProductClient params={params} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProductsPage;
