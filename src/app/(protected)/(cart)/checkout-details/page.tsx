import { CheckoutForm } from "@/components/checkout-form";
import { CheckoutProcess } from "@/components/checkout-process";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import React from "react";

const CheckOutDetatilsPage = () => {
  return (
    <>
      <CheckoutProcess step1={true} step2={true} />
      <div className="grid sm:grid-cols-5 grid-cols-1 items-start mt-8 gap-8">
        <div className="grid  sm:col-span-3">
          <CheckoutForm />
        </div>
        <div className="grid sm:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>Forms go in here</CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CheckOutDetatilsPage;
