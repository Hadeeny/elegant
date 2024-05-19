"use client";
import { useCart } from "@/hooks/use-cart";
import React from "react";
import CartItem from "./cart-item";

const OrderSummary = () => {
  const { items } = useCart();
  return (
    <div className="space-y-4 ">
      {items.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default OrderSummary;
