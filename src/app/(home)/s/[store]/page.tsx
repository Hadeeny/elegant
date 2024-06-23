import Billboard from "@/components/billboard";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { ProductCard } from "@/components/product-card";
import { ProductSlider } from "@/components/products-slider";
import { getStore } from "@/lib/utils";
import { Store } from "@prisma/client";
import React from "react";

type Props = {
  params: {
    store: string;
  };
};

const StorePage: React.FC<Props> = async ({ params: { store } }) => {
  const singleStore = await getStore(store);

  if (!singleStore) {
    return;
  }

  return (
    <div>
      <Billboard billboards={singleStore.billboards} />
      <MaxWidthWrapper className={"my-8"}>
        {/* <FilterForm/> */}
        <div className="grid grid-cols-1 max-w-fit justify-items-center min-[510px]:grid-cols-2 min-[930px]:grid-cols-3 gap-x-2 gap-y-8">
          {singleStore.products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default StorePage;
