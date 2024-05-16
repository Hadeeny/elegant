"use client";
import { UpdateRole } from "@/action/update-role";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ManageUserForm,
  TManageUserForm,
} from "@/lib/validators/account-credentials-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UserClient: React.FC<{ initialData: User }> = ({ initialData }) => {
  const defaultValues: TManageUserForm = initialData
    ? {
        role: initialData.role,
        id: initialData.id,
      }
    : {
        role: UserRole.USER,
        id: "",
      };
  const form = useForm<TManageUserForm>({
    resolver: zodResolver(ManageUserForm),
    defaultValues: defaultValues,
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (data: TManageUserForm) => {
    const user = { ...data, id: initialData.id };
    startTransition(() => {
      UpdateRole(user).then((data) => {
        if (data.error) {
          toast.error("Error updating user role");
        }
        if (data.success) {
          toast.success("user role updated successfully");
          router.back();
          router.refresh();
        }
        // setSuccess(data.success)
      });
    });

    // UpdateRole(userToUpdate);
  };
  return (
    <Card>
      <CardHeader>
        <CardDescription>Change user role for</CardDescription>
        <CardTitle className="text-xl">{initialData.email}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex items-center w-full sm:w-1/3 gap-x-4">
                  <Label>Select Role</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a colour" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(UserRole).map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField>
          </CardContent>
          <CardFooter>
            <Button disabled={isPending} type="submit">
              Update Role
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default UserClient;
