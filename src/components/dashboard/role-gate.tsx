"use client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { PropsWithChildren } from "react";
import { FormError } from "../form-error";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
// import { CardHeader } from "@nextui-org/react";

interface props {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export default function RoleGate({ allowedRole, children }: props) {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return (
      <div className="flex flex-col justify-center items-center flex-1">
        <Card className="-mt-14">
          <CardHeader>
            <CardTitle>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You do not have permission to access the contents of this page.
              </CardDescription>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }
  return <>{children}</>;
}
