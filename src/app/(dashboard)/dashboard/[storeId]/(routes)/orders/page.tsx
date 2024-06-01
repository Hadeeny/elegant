import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OrderDetails from "./components/OrderDetails";
import OrdersTable from "./components/orders-table";

const OrderPage = ({ params }: { params: { storeId: string } }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="sm:col-span-2 col-span-1">
        <OrdersTable params={params} />
      </div>
      <div className="col-span-1">
        <OrderDetails />
      </div>
    </div>
  );
};

export default OrderPage;
