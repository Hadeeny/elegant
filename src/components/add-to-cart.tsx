"use client";
import { Color, Image, Product, Size } from "@prisma/client";
import { Button } from "./ui/button";
import { Decimal } from "@prisma/client/runtime/library";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "@/lib/types";

type Cart = {
  item: CartItem;
};

export const AddToCartClient: React.FC<Cart> = ({ item }) => {
  const cart = useCart();
  const formattedItem = { ...item, quantity: 1 };
  return (
    <Button onClick={() => cart.addItem(formattedItem)} className="w-full">
      Add to cart
    </Button>
  );
};
