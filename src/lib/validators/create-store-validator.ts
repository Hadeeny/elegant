import { z } from "zod";

export const CreateStoreSchema = z.object({
  name: z.string().min(2),
});

export type TCreateStoreSchema = z.infer<typeof CreateStoreSchema>;
