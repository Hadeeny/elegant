"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import {
  BillboardFormSchema,
  TBillboardFormValues,
} from "@/lib/validators/account-credentials-validators";

import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Input } from "@nextui-org/react";
import { Billboard, Store } from "@prisma/client";
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

interface BillboardFormProps {
  initialData: Billboard | null;
  userId: string;
}

const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
  userId,
}) => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = initialData ? "Edit Billboard" : "Create Billboard";
  const description = initialData ? "Edit a Billboard" : "Add a Billboard";
  const toastMessage = initialData ? "Billboard Updated" : "Billboard Created";
  const action = initialData ? "Save Changes" : "Create";

  const defaultValues: TBillboardFormValues = initialData
    ? {
        label: initialData.label || "", // Providing an empty string if name is null
        imageUrl: initialData.imageUrl,
      }
    : {
        label: "", // Default empty string if initialData is null
        imageUrl: "",
      };

  const form = useForm<TBillboardFormValues>({
    resolver: zodResolver(BillboardFormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: TBillboardFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          {
            label: data.label,
            userId,
            imageUrl: data.imageUrl,
          }
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, {
          label: data.label,
          userId,
          imageUrl: data.imageUrl,
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full sm:w-1/3">
            <Input
              variant="bordered"
              value={form.watch("label")}
              // placeholder="Name"
              disabled={loading}
              {...form.register("label")}
              className="text-2xl"
              radius="sm"
              label="Billboard Label"
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

export default BillboardForm;
