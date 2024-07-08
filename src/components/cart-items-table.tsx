"use client";
import React from "react";
import { DataTable } from "./ui/data-tables";
import { columns } from "@/app/(protected)/(cart)/cart/_components/column";
import { useCart } from "@/hooks/use-cart";
import CartSummary from "./cart-summary";

const CartItemsTable = () => {
  const { items } = useCart();
  return (
    <>
      {!items.length ? (
        <div>You have no item in your cart</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 items-start sm:grid-cols-5">
          <div className="col-span-3">
            <DataTable
              showSearch={false}
              columns={columns}
              data={items}
              searchKey="name"
            />
          </div>
          <div className="col-span-2">
            <CartSummary />
          </div>
        </div>
      )}
    </>
  );
};

export default CartItemsTable;
