// "use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Divider } from "@nextui-org/react";
import { Billboard } from "@prisma/client";
import { Divide, Plus } from "lucide-react";
// import { useParams, useRouter } from "next/navigation";
import React from "react";
// import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-tables";
import { ApiList } from "@/components/ui/api-list";
import Link from "next/link";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { unstable_noStore as noStore } from "next/cache";
import { formatPrice, formatter } from "@/lib/utils";
import { OrderColumn, columns } from "./order-column";
// import { ProductColumn } from "./components/columns";

export const OrdersClient = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  // const params = useParams();
  // console.log(params.storeId);
  noStore();
  const orders = await db.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //   const totalPrice: number = items.;
  const data: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    status: item.isPaid,
    email: item.email,
    customer: item.customerName,
    date: format(item.createdAt, "MMMM do, yyy"),
    createdAt: format(item.createdAt, "MMMM do, yyy"),

    amount: formatter.format(
      item.orderItems.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
      )
    ),
  }));

  return (
    <>
      <div className="flex items-center my-4 justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Introducing Our Dynamic Orders 
          Dashboard for Seamless Management and Insightful Analysis."
        />
      </div>
      <Divider />
      {/* <DataTable searchKey="label" columns={columns} data={data} /> */}
      {/* <Divider /> */}
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
