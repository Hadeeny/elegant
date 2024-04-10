"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Divider } from "@nextui-org/react";
import { Billboard } from "@prisma/client";
import { Divide, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface BillboardClientProps {
  data: Billboard[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Divider />
      {/* <DataTable searchKey="label" columns={columns} data={data} /> */}
      <Heading title="API" description="API Calls for Billboards" />
      <Divider />
      {/* <ApiList entityName="billboards" entityIdName="billboardId" /> */}
    </>
  );
};
