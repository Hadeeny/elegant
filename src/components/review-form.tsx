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
import toast from "react-hot-toast";
import { Textarea } from "./ui/textarea";
import ReactStars from "react-rating-stars-component";
import { use, useState, useTransition } from "react";
import {
  ReviewSchema,
  TReviewValue,
} from "@/lib/validators/account-credentials-validators";
import { createReview } from "@/action/create-review";
import { Loader2 } from "lucide-react";

const ReviewForm: React.FC<{ productId: string }> = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      review: "",
    },
  });

  const ratingChange = (newRating: number) => {
    setRating(newRating);
  };

  function onSubmit(data: TReviewValue) {
    try {
      startTransition(() => {
        createReview(data, rating, productId).then((response) => {
          toast("New review created");
          form.reset();
          setRating(0);
        });
      });
    } catch (error) {
      toast.error("something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reviews</FormLabel>
              <FormControl>
                <Textarea placeholder="share your thoughts" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ReactStars count={5} onChange={ratingChange} size={30} />
        <Button disabled={isPending} size={"lg"} type="submit">
          {isPending && <Loader2 size={20} className="animate-spin mr-2" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};
export default ReviewForm;
