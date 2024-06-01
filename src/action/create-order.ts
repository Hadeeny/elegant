"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getUserByEmail } from "../data/users";
import {
  TCheckoutForm,
  CheckoutForm,
} from "@/lib/validators/account-credentials-validators";
import { Color, Image, Product, Size } from "@prisma/client";
import { CartItem } from "@/lib/types";
export const createOrder = async (
  values: TCheckoutForm,
  orderItems: CartItem[]
) => {
  const validatedFields = CheckoutForm.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Field" };
  }

  const ValidData = validatedFields.data;
  Object.values(ValidData).map((field) => {
    if (!field) {
      return { error: "You must enter a valid " + field };
    }
  });

  const session = await auth();
  const user = session?.user;

  if (!user) {
    return { error: "Access denied" };
  }

  const orderAddress = `${ValidData.street}, ${ValidData.city}, ${ValidData.country}`;

  const order = await db.order.create({
    data: {
      address: orderAddress,
      phone: ValidData.phoneNumber,
      customerName: `${ValidData.firstName} ${ValidData.lastName}`,
      email: ValidData.email,
      storeId: "clw75gdfg0004k1rff9ezy4dh",
      orderItems: {
        create: orderItems.map((item) => ({
          productId: item.id,

          quantity: item.quantity, // Assuming you have quantity in your CartItem
          price: item.price, // Assuming you have price in your CartItem
          // Add any other necessary fields from OrderItem
        })),
      },
    },
  });

  return { success: "Order created successfully!", order };
};
