"use client";
import { Cross } from "lucide-react";
import React, { useState } from "react";
import { Icons } from "./Icons";
import Image from "next/image";

const CartItem = () => {
  const [quantity, setQuantity] = useState(0);
  const increment = () => {
    if (quantity >= 0) {
      setQuantity(quantity + 1);
    }
  };
  return (
    <div className="flex gap-x-2">
      {/* image */}
      <Image
        alt="cart item"
        src="/images/toaster.png"
        width={80}
        height={80}
        objectFit="cover"
      />
      <div className="flex-1">
        <p className="font-semibold">Tray table</p>
        <p className="text-sm">Color: Red</p>
        <div className="flex border-2 border-black rounded-md max-w-min">
          <button className="px-3 text-base py-1">-</button>
          <div className="px-3 text-base py-1">{quantity}</div>
          <button className="px-3 text-base py-1" onClick={increment}>
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-y-2">
        <p className="font-semibold">$20.00</p>
        <button>
          <Icons.Cancel />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
