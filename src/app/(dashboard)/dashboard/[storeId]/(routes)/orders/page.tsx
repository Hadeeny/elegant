import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OrderDetails from "./components/order-details";
import OrdersTable from "./components/orders-table";

const OrderPage = ({
  params,
  searchParams,
}: {
  params: { storeId: string };
  searchParams?: { query?: string };
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
      <div className="sm:col-span-2 col-span-1">
        <OrdersTable params={params} />
      </div>
      <div className="col-span-1">
        <Suspense fallback={<p>loading order details</p>}>
          <OrderDetails searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default OrderPage;
