import CartItemsTable from "@/components/cart-items-table";
import { CheckoutProcess } from "@/components/checkout-process";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const CartPage = () => {
  return (
    <div>
      <CheckoutProcess step1 />
      <CartItemsTable />
    </div>
  );
};

export default CartPage;
