"use client";

import { ColumnDef } from "@tanstack/react-table";

// import { CellAction } from "./cell-action"
import CellAction from "./cell-action";
import Image from "next/image";

export type ProductColumn = {
  id: string;
  name: string;
  description: string;
  price: string;
  size: string;
  category: string;
  color: string;
  image: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <div className="w-[50px] aspect-square relative">
        <Image
          objectFit="cover"
          fill
          style={{ objectFit: "cover" }}
          alt=""
          className="w-full h-full"
          src={row.original.image}
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name ",
    cell: ({ row }) => (
      <div className="max-w-[100px] max-h-[20px] overflow-hidden">
        <p>{row.original.name}</p>
      </div>
    ),
  },

  {
    accessorKey: "isArchived",
    header: "Archived ",
  },

  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "color",
    header: "Colour",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="size-6 rounded-sm border"
          style={{ backgroundColor: row.original.color }}
        ></div>
      </div>
    ),
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
