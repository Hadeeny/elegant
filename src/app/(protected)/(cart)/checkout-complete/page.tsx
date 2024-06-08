import React from "react";
import { redirect } from "next/navigation";
import ConfirmOrder from "@/components/confirm-order";

const CheckoutCompletePage = ({
  searchParams: { reference },
}: {
  searchParams: { reference: string };
}) => {
  return (
    <div>
      <p>Please hold on while we verify your order</p>
      <ConfirmOrder reference={reference} />
    </div>
  );
};

export default CheckoutCompletePage;
