import React from "react";
import { OrdersClient } from "./orders-client";

const OrdersTable = ({ params }: { params: { storeId: string } }) => {
  return (
    <div>
      <OrdersClient params={params} />
    </div>
  );
};

export default OrdersTable;
