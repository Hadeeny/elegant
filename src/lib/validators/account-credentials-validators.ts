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
