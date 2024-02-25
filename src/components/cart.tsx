import React from "react";
import { Button } from "@/components/ui/button";
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

const Cart = () => {
  const cartItems = [1, 3, 4];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-1">
          <Icons.CartIcon />
          <Badge className="rounded-full size-6 items-center justify-center">
            5
          </Badge>
        </button>
      </SheetTrigger>
      <SheetContent className="flex-col flex">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 divide-black space-y-4">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item, i) => <CartItem key={i} />)
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              disabled={cartItems.length === 0}
              className="w-full"
              type="submit"
            >
              Checkout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
