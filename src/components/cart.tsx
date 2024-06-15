"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "./Icons";
import { Badge } from "@/components/ui/badge";
import CartItem from "./cart-item";
import { useCart } from "@/hooks/use-cart";
import { Divider } from "@nextui-org/react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

const Cart = () => {
  const { items } = useCart();

  const totalPrice: number = items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-1">
          <Icons.CartIcon />
          <Badge className="rounded-full size-6 items-center justify-center">
            {items.length}
          </Badge>
        </button>
      </SheetTrigger>
      <SheetContent className="flex-col flex">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 divide-black space-y-4">
          {items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            items.map((item, i) => <CartItem key={i} item={item} />)
          )}
        </div>
        <div className="flex justify-between items-center">
          <p>Total</p>
          <p className="font-semibold">{formatPrice(totalPrice)}</p>
        </div>
        <Divider />
        <div className="flex font-semibold justify-between items-center">
          <p>Total</p>
          <p>{formatPrice(totalPrice)}</p>
        </div>
        <SheetFooter className="">
          <SheetClose asChild>
            <Link
              href={"/cart"}
              className={buttonVariants({
                className: "w-full",
              })}
            >
              Checkout
            </Link>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
