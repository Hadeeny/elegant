"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import {
  SizeFormSchema,
  TSizeFormValues,
} from "@/lib/validators/account-credentials-validators";

import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@nextui-org/react";
import { Size, Store } from "@prisma/client";
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
import ImageUpload from "@/components/ui/image-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SizeFormProps {
  initialData: Size | null;
  userId: string;
}

const SizeForm: React.FC<SizeFormProps> = ({ initialData, userId }) => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = initialData ? "Edit Size" : "Create Size";
  const description = initialData ? "Edit a Size" : "Add a Size";
  const toastMessage = initialData ? "Size Updated" : "Size Created";
  const action = initialData ? "Save Changes" : "Create";

  const defaultValues: TSizeFormValues = initialData
    ? {
        name: initialData.name || "", // Providing an empty string if name is null
        value: initialData.value,
      }
    : {
        name: "", // Default empty string if initialData is null
        value: "",
      };

  const form = useForm<TSizeFormValues>({
    resolver: zodResolver(SizeFormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: TSizeFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, {
          name: data.name,
          userId,
          value: data.value,
        });
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, {
          name: data.name,
          userId,
          value: data.value,
        });
      }

      router.refresh();
      router.push(`/dashboard/${params.storeId}/sizes`);
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
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`, {
        data: { userId },
      });
      router.refresh();
      router.push(`/dashboard/${params.storeId}/sizes`);
      toast.success("Size deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all products using this size first");
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default SizeForm;
