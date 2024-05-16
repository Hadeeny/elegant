"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import {
  ManageUserForm,
  SettingsFormSchema,
  TManageUserForm,
  TSettingsFormValues,
} from "@/lib/validators/account-credentials-validators";

import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@nextui-org/react";
import { Store, User, UserRole } from "@prisma/client";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AlertModal from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-tables";
import { format } from "date-fns";

interface SettingsFormProps {
  initialData: Store;
  userId: string;
  users: User[];
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData,
  userId,
  users,
}) => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const defaultValues: TSettingsFormValues = initialData
    ? {
        storeName: initialData.name || "", // Providing an empty string if name is null
        role: UserRole.USER,
      }
    : {
        storeName: "", // Default empty string if initialData is null
        role: UserRole.USER,
      };

  const form = useForm<TSettingsFormValues>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: defaultValues,
  });

  const data: UserColumn[] = users.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    role: item.role,
  }));

  const onSubmit = async (data: TSettingsFormValues) => {
    try {
      // setLoading(true);
      // await axios.patch(`/api/stores/${params.storeId}`, {
      //   name: data.storeName,
      //   userId,
      // });
      // router.refresh();
      // toast.success("Store updated.");
      console.log(data);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const deleteStore = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`, {
        data: { userId },
      });
      router.refresh();
      router.push("/admin");
      toast.success("Store deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all products and categories first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={deleteStore}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Divider />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="storeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter store name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
      <div className="text-3xl font-semibold">Manage users</div>
      <DataTable columns={columns} data={data} searchKey="name" />
      <Divider />
      <ApiAlert
        description={`${origin}/api/${params.storeId}`}
        title="NEXT_PUBLIC_API_URL"
        variant="admin"
      />
    </>
  );
};

export default SettingsForm;
