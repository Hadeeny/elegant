"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import {
  CategoryFormSchema,
  TCategoryFormValues,
} from "@/lib/validators/account-credentials-validators";

import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Input } from "@nextui-org/react";
import { Category } from "@prisma/client";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select } from "@/components/ui/select";

interface CategoryFormProps {
  initialData: Category | null;
  userId: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, userId }) => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData ? "Edit a Category" : "Add a Category";
  const toastMessage = initialData ? "Category Updated" : "Category Created";
  const action = initialData ? "Save Changes" : "Create";

  const defaultValues: TCategoryFormValues = initialData
    ? {
        name: initialData.name || "", // Providing an empty string if name is null
        // name: initialData.name,
        billboardId: initialData.billboardId,
      }
    : {
        name: "", // Default empty string if initialData is null
        // imageUrl: "",
        billboardId: "",
      };

  const form = useForm<TCategoryFormValues>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: TCategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          {
            label: data.name,
            userId,
            // imageUrl: data.na,
          }
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, {
          name: data.name,
          userId,
          // imageUrl: data.imageUrl,
        });
      }

      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const deleteStore = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`,
        {
          data: { userId },
        }
      );
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success("Billboard deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all categories in this billboard");
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
        <Heading title={title} description={description} />
        {initialData && (
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
        )}
      </div>
      <Divider />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <div className="">
              <Input
                variant="bordered"
                value={form.watch("name")}
                // placeholder="Name"
                disabled={loading}
                {...form.register("name")}
                className="text-2xl"
                radius="sm"
                label="Name"
              />
            </div>
            <div className="">
              {/* <Select disabled={loading} {...form.register('billboardId')} value={form.getValues('billboardId')}></Select> */}
            </div>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Divider />
    </>
  );
};

export default CategoryForm;
