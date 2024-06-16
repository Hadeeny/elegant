"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";
import { Loader2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  const date = new Date(data.data.createdAt);

  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  console.log(data);
  return (
    <div>
      {data.data.status === "success" ? (
        <div className="w-11/12 p-4 sm:w-2/3 mx-auto">
          <div className="text-center my-2">
            <p className="text-xl font-normal">Thank you!! 🎉</p>
            <h2>Your order has been recieved</h2>
          </div>

          <Table>
            <TableCaption>
              Your reciept has been sent to your email{" "}
              {data.data.customer.email}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order Code</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Payment Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{orderId}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>{data.data.amount / 100}</TableCell>
                <TableCell className="text-right uppercase">
                  {data.data.channel}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>Sorry, we could not verify your order</p>
      )}
    </div>
  );
};

export default ConfirmOrder;
