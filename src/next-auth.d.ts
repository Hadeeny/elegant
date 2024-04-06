import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["USER"] & {
  role: "ADMIN" | "USER";
  id: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
