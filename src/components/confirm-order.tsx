"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";

const ConfirmOrder: React.FC<{ reference: string }> = ({ reference }) => {
  const router = useRouter();
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`/api/verify-paystack/${reference}`).then((res) => res.json()),
  });

  if (isPending) return "Confirming payment. Please hold ...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data.data.status === "success" ? (
        <Card>
          <CardHeader>
            <CardTitle>Your order has been recieved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2">
              <p>Order code:</p> <p>code</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Order code:</p> <p>code</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Order code:</p> <p>code</p>
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
