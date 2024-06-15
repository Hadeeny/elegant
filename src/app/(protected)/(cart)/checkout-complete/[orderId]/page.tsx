import React from "react";
import ConfirmOrder from "@/components/confirm-order";

const CheckoutCompletePage = ({
  searchParams: { reference },
  params: { orderId },
}: {
  searchParams: { reference: string };
  params: { orderId: String };
}) => {
  return (
    <div>
      <ConfirmOrder orderId={orderId.toString()} reference={reference} />
    </div>
  );
};

export default CheckoutCompletePage;
