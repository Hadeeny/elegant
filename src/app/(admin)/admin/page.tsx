"use client";
import RoleGate from "@/components/dashboard/role-gate";
import { Modal } from "@/components/ui/modals";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useStoreModal } from "@/hooks/use-store-modal";
import { UserRole } from "@prisma/client";
import React, { useState, useEffect } from "react";

const AdminPage = () => {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
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
