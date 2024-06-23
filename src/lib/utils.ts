import { auth } from "@/auth";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { db } from "./db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDiscount(discount: number | string, price: number | string) {
  return Number(price) - (Number(discount) * Number(price)) / 100;
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT" | "NGN";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "NGN", notation = "standard" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

interface UserProp {
  userId: string;
}

export const getCurrentUser = async (): Promise<UserProp> => {
  const session = await auth();
  const user = session?.user;
  return { userId: user?.id };
};

export const getStores = async () => {
  return await db.store.findMany();
};
export const getStore = async (id: string) => {
  return await db.store.findUnique({
    include: {
      billboards: true,
      categories: true,
      products: {
        include: {
          size: true,
          category: true,
          color: true,
          images: true
        }
      },

    },
    where: {
      id,
    },
  });
};

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});
