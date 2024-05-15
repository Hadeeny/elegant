"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import {
  ColorFormSchema,
  TColorFormValues,
} from "@/lib/validators/account-credentials-validators";

import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@nextui-org/react";
import { Color } from "@prisma/client";
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

interface ColorFormProps {
  initialData: Color | null;
  userId: string;
}

const ColorForm: React.FC<ColorFormProps> = ({ initialData, userId }) => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = initialData ? "Edit Colour" : "Create Colour";
  const description = initialData ? "Edit a Colour" : "Add a Colour";
  const toastMessage = initialData ? "Colour Updated" : "Colour Created";
  const action = initialData ? "Save Changes" : "Create";

  const defaultValues: TColorFormValues = initialData
    ? {
        name: initialData.name || "", // Providing an empty string if name is null
        value: initialData.value,
      }
    : {
        name: "", // Default empty string if initialData is null
        value: "",
      };

  const form = useForm<TColorFormValues>({
    resolver: zodResolver(ColorFormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: TColorFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, {
          name: data.name,
          userId,
          value: data.value,
        });
      } else {
        await axios.post(`/api/${params.storeId}/colors`, {
          name: data.name,
          userId,
          value: data.value,
        });
      }

      router.refresh();
      router.push(`/dashboard/${params.storeId}/colors`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const deleteColor = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`, {
        data: { userId },
      });
      router.refresh();
      router.push(`/dashboard/${params.storeId}/colors`);
      toast.success("Colour deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all products using this color first");
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
        onConfirm={deleteColor}
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
                    <Input placeholder="Colour Name" {...field} />
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
                    <div className="flex gap-x-4 items-center">
                      <Input placeholder="Colour Value" {...field} />
                      <div
                        className="size-8 rounded-sm border"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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

export default ColorForm;
