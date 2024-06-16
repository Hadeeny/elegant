import { db } from "@/lib/db";
import React from "react";
import ReviewForm from "./review-form";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Ratings } from "./ui/ratings";

const ProductReviews: React.FC<{ productId: string }> = async ({
  productId,
}) => {
  const reviews = await db.review.findMany({
    include: {
      user: true,
    },
    where: {
      productId: productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="my-8">
      <ReviewForm productId={productId} />
      {reviews.length === 0 || !reviews ? (
        <p className="my-4 text-muted-foreground">
          This product has no reviews yet
        </p>
      ) : (
        <div className="space-y-5 divide-y-2">
          <p className="my-4">{reviews.length} Reviews</p>
          {reviews.map((review) => (
            <div key={review.id} className="flex gap-x-3 py-4 items-start">
              <div>
                <Avatar>
                  <AvatarImage src={review?.user?.image || undefined} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="font-semibold">{review.user.name}</p>
                  <Ratings rating={review.rating} />
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
