"use client";

import { ColumnDef } from "@tanstack/react-table";

// import { CellAction } from "./cell-action"
import CellAction from "./cell-action";
import Image from "next/image";

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
  imageUrl: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "imageUrl",
    header: "Billboard",
    cell: ({ row }) => (
      <div className="size-24">
        <Image
          objectFit="cover"
          width={96}
          height={96}
          // fill
          // style={{ objectFit: "cover" }}
          alt=""
          className="w-full h-full"
          src={row.original.imageUrl}
        />
      </div>
    ),
  },
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
