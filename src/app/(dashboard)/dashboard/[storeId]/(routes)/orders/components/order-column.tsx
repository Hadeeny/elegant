"use client";

import { ColumnDef } from "@tanstack/react-table";

// import { CellAction } from "./cell-action"

import Image from "next/image";

export type OrderColumn = {
  id: string;
  email: string;
  customer: string;
  status: boolean;
  date: string;
  amount: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "customer",
    header: "Customer Name",
    cell: ({ row }) => (
      <div className="">
        <p>{row.original.customer}</p>
      </div>
    ),
  },

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status ",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
