"use client";

import { ColumnDef } from "@tanstack/react-table";

// import { CellAction } from "./cell-action"

import Image from "next/image";
import CellAction from "./cell-actions";

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
    cell: ({ row }) => (
      <div className="">
        {row.original.status ? <p>Paid</p> : <p>Pending</p>}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
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
