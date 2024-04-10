"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  postSchema,
  TPostValues,
} from "@/lib/validators/account-credentials-validators";
import { post } from "@/action/post";
import { db } from "@/lib/db";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function Post() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      post: "",
    },
  });

  const router = useRouter();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof postSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    post(values).then((data) => {
      toast.success("post created");
      router.refresh();
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="post"
            render={({ field }) => (
              <FormItem>
                <FormLabel>post</FormLabel>
                <FormControl>
                  <Input placeholder="Enter new post here.." {...field} />
                </FormControl>
                <FormDescription>Enter your new post</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div></div>
    </>
  );
}
