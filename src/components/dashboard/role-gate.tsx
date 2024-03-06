import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { PropsWithChildren } from "react";
import { FormError } from "../form-error";

interface props {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export default function RoleGate({ allowedRole, children }: props) {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to access this content" />
    );
  }
  return <>{children}</>;
}
