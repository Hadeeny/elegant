"use client";
import RoleGate from "@/components/dashboard/role-gate";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import React from "react";

const AdminPage = () => {
  const role = useCurrentRole();
  return (
    <div>
      <p>This is the admin AdminPage, current role is {role}</p>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <p>Hello Admin content</p>
      </RoleGate>
    </div>
  );
};

export default AdminPage;
