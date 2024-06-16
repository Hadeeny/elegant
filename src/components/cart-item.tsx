"use client";
import { Cross } from "lucide-react";
import React, { useState } from "react";
import { Icons } from "./Icons";
import Image from "next/image";
import { Color, Image as PrismaImage, Product, Size } from "@prisma/client";
// import { CartItem as CartItemProps } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";

interface CartItemProps {
  item: Product & {
    size: Size;
    images: PrismaImage[];
    color: Color;
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const increment = () => {
    if (quantity >= 1) {
      setQuantity(quantity + 1);
    }
  };
  const cart = useCart();

  const remove = (id: string) => {
    cart.removeItem(id);
  };
  return (
    <div className="flex gap-x-2">
      {/* image */}
      <div className="relative w-[80px] aspect-square">
        <Image
          alt="cart item"
          src={item.images[0].url}
          fill
          objectFit="cover"
          className="aspect-square"
        />
      </div>
      <div className="flex-1">
        <div className="w-[4rem]">
          <p className="font-semibold text-nowrap">{item.name}</p>
        </div>
        <p className="text-sm">Color: {item.color.name}</p>
        <div className="flex border-2 border-black rounded-md max-w-min">
          <button
            disabled={item.quantity <= 1}
            onClick={() => cart.decrement(item.id)}
            className="px-3 text-base py-1"
          >
            -
          </button>
          <div className="px-3 text-base py-1">{item.quantity}</div>
          <button
            className="px-3 text-base py-1"
            onClick={() => cart.increment(item.id)}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-y-2">
        <p className="font-semibold">
          {formatPrice(Number(item.price) * item.quantity)}
        </p>
        <button onClick={() => remove(item.id)}>
          <Icons.Cancel />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
