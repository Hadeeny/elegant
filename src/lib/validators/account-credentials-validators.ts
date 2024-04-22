import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  username: z.string(),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 8 characters long!" }),
});
export type TRegisterSchema = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 8 characters long!" }),
});
export type TLoginSchema = z.infer<typeof LoginSchema>;

export const SettingsFormSchema = z.object({
  storeName: z.string().min(2),
});
export type TSettingsFormValues = z.infer<typeof SettingsFormSchema>;

export const BillboardFormSchema = z.object({
  label: z.string().min(2),
  imageUrl: z.string().min(2),
});
export type TBillboardFormValues = z.infer<typeof BillboardFormSchema>;

export const CategoryFormSchema = z.object({
  name: z.string().min(2),
  billboardId: z.string().min(2),
});
export type TCategoryFormValues = z.infer<typeof CategoryFormSchema>;

export const SizeFormSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});
export type TSizeFormValues = z.infer<typeof SizeFormSchema>;

export const postSchema = z.object({
  post: z.string().min(2, {
    message: "post must be at least 2 characters.",
  }),
});

export type TPostValues = z.infer<typeof postSchema>;
