"use client";

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

export const StoreModal = () => {
  const { isOpen, onClose, onOpen } = useStoreModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateStoreSchema>({
    resolver: zodResolver(CreateStoreSchema),
  });

  const onSubmit = (data: TCreateStoreSchema) => {
    console.log(data);
  };
  return (
    <Modal
      title="create store"
      description="Add a new store to Manage stores and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input radius="sm" label="Enter a store name" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name?.message}</p>
        )}
        <div className="flex gap-x-4">
          <Button radius="sm" color="primary" type="submit" className="">
            Submit
          </Button>
          <Button onClick={onClose} radius="sm" variant="ghost">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
