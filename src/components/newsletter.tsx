"use client";
import React from "react";
import newsletter from "./../../public/images/newsletter.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";

const Newsletter = () => {
  const formSchema = z.object({
    email: z.string().email(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="flex flex-col gap-y-2 sm:text-black items-center relative py-20 bg-[#F2F4F6] sm:bg-[url('./../../public/images/newsletter.png')]">
      {/* <Image alt="Newsletter" src={newsletter} className="absolute inset-0" /> */}
      <h2 className="font-semibold text-2xl">Join Our Newsletter</h2>
      <p>Sign up for deals, new products and promotions</p>
      <Form {...form}>
        <form className="flex gap-x-2 items-center mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="email address "
                    className="bg-white/90"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign up</Button>
        </form>
      </Form>
    </div>
  );
};

export default Newsletter;
