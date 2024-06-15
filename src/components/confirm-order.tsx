"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";
import { Loader2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";

const ConfirmOrder: React.FC<{ reference: string; orderId: string }> = ({
  reference,
  orderId,
}) => {
  const router = useRouter();
  const cart = useCart();
  const { isPending, error, data, isSuccess } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`/api/verify-paystack/${orderId}/${reference}`).then((res) =>
        res.json()
      ),
  });

  if (isSuccess) {
    cart.removeAll;
  }

  if (isPending)
    return (
      <div className="flex flex-col items-center mb-8">
        <p className="text-xl font-semibold">Confirming payment</p>
        <Loader2 size={35} className="animate-spin my-8" />
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data.data.status === "success" ? (
        <Card>
          <CardHeader className="text-center">
            <p className="text-xl font-normal">Thank you!! 🎉</p>
            <CardTitle>Your order has been recieved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2">
              <p>Order code:</p>

              <p>{orderId}</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Date:</p> <p>{data.data.createdAt}</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Total:</p>
              <p>{formatPrice(data.data.amount)}</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Payment method:</p>
              <p>{data.data.channel}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p>Sorry, we could not verify your order</p>
      )}
    </div>
  );
};

export default ConfirmOrder;
