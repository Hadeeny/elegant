import Billboard from "@/components/billboard";
import { getStore } from "@/lib/utils";
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
    </div>
  );
};

export default StorePage;
