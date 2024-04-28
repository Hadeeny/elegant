"use client";

import { ColumnDef } from "@tanstack/react-table";

// import { CellAction } from "./cell-action"
import CellAction from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name ",
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
    cell: ({ row }) => {
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          style={{ backgroundColor: row.original.color }}
          className="size-6 rounded-sm"
        />
      </div>;
    },
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
