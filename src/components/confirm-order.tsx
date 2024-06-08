"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ConfirmOrder: React.FC<{ reference: string }> = ({ reference }) => {
  const router = useRouter();

  return (
    <div>
      <p>Hello confirm</p>
    </div>
  );
};

export default ConfirmOrder;
