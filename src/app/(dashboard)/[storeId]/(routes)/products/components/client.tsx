// "use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Divider } from "@nextui-org/react";
import { Billboard } from "@prisma/client";
import { Divide, Plus } from "lucide-react";
// import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-tables";
import { ApiList } from "@/components/ui/api-list";
import Link from "next/link";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { unstable_noStore as noStore } from "next/cache";
import { formatPrice, formatter } from "@/lib/utils";
// import { ProductColumn } from "./components/columns";

export const ProductClient = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  // const params = useParams();
  // console.log(params.storeId);
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

  const data: ProductColumn[] = products.map((item) => ({
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
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Link
          className={buttonVariants({
            className: "",
          })}
          href={`/${params.storeId}/products/new`}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Link>
      </div>
      <Divider />
      {/* <DataTable searchKey="label" columns={columns} data={data} /> */}
      {/* <Divider /> */}
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API Calls for Products" />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
