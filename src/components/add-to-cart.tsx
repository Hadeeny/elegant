"use client";
import { Color, Image, Product, Size } from "@prisma/client";
import { Button } from "./ui/button";
import { Decimal } from "@prisma/client/runtime/library";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "@/lib/types";

export const AddToCartClient: React.FC<CartItem> = ({ item }) => {
  const cart = useCart();
  return (
    <Button onClick={() => cart.addItem(item)} className="w-full">
      Add to cart
    </Button>
  );
};
