import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageShowCase } from "./image-showcase";
import { AddToCartClient } from "./add-to-cart";
import { Decimal } from "@prisma/client/runtime/library";

export const ProductDetails: React.FC<{ productId: string }> = async ({
  productId,
}) => {
  const productDetails = await db.product.findFirst({
    where: {
      id: productId,
    },
    include: {
      images: true,
      color: true,
      size: true,
    },
  });

  if (!productDetails) {
    return;
  }
  return (
    <>
      <div className="flex flex-col justify-between sm:flex-row">
        <div className="w-full sm:w-[43%]">
          <ImageShowCase images={productDetails.images} />
        </div>
        <div className="w-full sm:w-[48%] space-y-3 sm:space-y-5">
          <h1 className="text-4xl font-semibold">{productDetails.name}</h1>
          <p>
            Buy one or buy a few and make every space where you sit more
            convenient. Light and easy to move around with removable tray top,
            handy for serving snacks.
          </p>
          <p className="font-semibold text-2xl">
            {formatPrice(Number(productDetails.price))}
          </p>
          <Divider />
          <p>Available Color:</p>
          <div className="flex gap-x-2 items-center">
            <p>{productDetails.color.name}</p>
            <div
              style={{ backgroundColor: productDetails.color.value }}
              className="size-6 rounded-sm"
            />
          </div>
          <div className="flex gap-x-2 items-center">
            <p>Size:</p>
            <div className="">
              <p>{productDetails.size.name}</p>
            </div>
          </div>
          <AddToCartClient item={productDetails} />
        </div>
      </div>
    </>
  );
};
