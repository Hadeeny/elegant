import Billboard from "@/components/billboard";
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
      {/* <p>Welcome to my store page</p> */}
      <Billboard billboards={singleStore.billboards} />
      <ProductSlider
        showAction={false}
        title="Featured"
        where={{ storeId: singleStore.id }}
        id=""
      />
      <h2 className="text-center text-3xl font-semibold my-4">
        Shop by Categories
      </h2>
    </div>
  );
};

export default StorePage;
