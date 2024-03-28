"use client";
import { useState, useTransition } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modals";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import {
  CreateStoreSchema,
  TCreateStoreSchema,
} from "@/lib/validators/create-store-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { createStore } from "@/action/create-store";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export const StoreModal = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { isOpen, onClose, onOpen } = useStoreModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateStoreSchema>({
    resolver: zodResolver(CreateStoreSchema),
  });

  const onSubmit = (data: TCreateStoreSchema) => {
    startTransition(() => {
      createStore(data).then((data) => {
        if (data.error) {
          toast.error("Error creating store");
        }
        if (data.success && data.store.id) {
          // toast.success(data.store.id);
          window.location.assign(`/${data.store.id}`);
        }
        // setSuccess(data.success)
      });
    });
  };
  return (
    <Modal
      title="create store"
      description="Add a new store to Manage stores and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          disabled={isPending}
          radius="sm"
          label="Enter a store name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name?.message}</p>
        )}
        <div className="flex gap-x-4">
          <Button
            disabled={isPending}
            radius="sm"
            color="primary"
            type="submit"
            className=""
          >
            Submit
          </Button>
          <Button
            disabled={isPending}
            onClick={onClose}
            radius="sm"
            variant="ghost"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
