"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Divider } from "@nextui-org/react";
import { Category } from "@prisma/client";
import { Divide, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-tables";
import { ApiList } from "@/components/ui/api-list";

interface CategoryClientProps {
  data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage Categories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Divider />
      {/* <DataTable searchKey="label" columns={columns} data={data} /> */}
      {/* <Divider /> */}
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API Calls for Categories" />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};
