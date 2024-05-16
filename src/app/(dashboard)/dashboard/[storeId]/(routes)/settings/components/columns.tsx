"use client";

import { ColumnDef } from "@tanstack/react-table";

// import { CellAction } from "./cell-action"
import CellAction from "./cell-action";
import Image from "next/image";

export type UserColumn = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: "Name ",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "role",
    header: "Role",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
