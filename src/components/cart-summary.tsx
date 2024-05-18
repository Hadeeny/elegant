"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import toast from "react-hot-toast";
import { Divider } from "@nextui-org/react";

const FormSchema = z.object({
  type: z.enum(["free", "express", "pick_up"], {
    required_error: "You need to select a notification type.",
  }),
});

export function CartOptions() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    // toast.c({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <Card>
                    <CardHeader>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="free" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Free Shipping
                        </FormLabel>
                      </FormItem>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="express" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Express Shipping
                        </FormLabel>
                      </FormItem>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="pick_up" />
                        </FormControl>
                        <FormLabel className="font-normal">Pick Up</FormLabel>
                      </FormItem>
                    </CardHeader>
                  </Card>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

const CartSummary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <CartOptions />
        <div className="flex my-4 items-center justify-between">
          <p>Subtotal</p>
          <p>Subtotal</p>
        </div>
        <Divider />
        <div className="flex my-4 items-center justify-between">
          <p>Total</p>
          <p>Subtotal</p>
        </div>
      </CardContent>

      <CardFooter>
        <Link
          className={cn(buttonVariants({ className: "w-full" }))}
          href="/checkout-details"
        >
          Checkout
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
