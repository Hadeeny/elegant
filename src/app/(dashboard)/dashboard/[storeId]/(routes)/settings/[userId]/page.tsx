import { Form } from "@/components/ui/form";
import React from "react";
import UserClient from "./components/user-client";
import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserPage = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const initialData = await db.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!initialData) {
    return;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update User</CardTitle>
        <CardDescription>Change User Role</CardDescription>
      </CardHeader>
      <CardContent>
        <UserClient initialData={initialData} />
      </CardContent>
    </Card>
  );
};

export default UserPage;
