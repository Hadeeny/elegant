import { ProductSliderProps } from "@/lib/types";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import { Icons } from "./Icons";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { Image as PrismaImage } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { db } from "@/lib/db";
import Link from "next/link";

interface ProductProps {
  where?: {
    categoryId?: string;
    storeId?: string;
  };
  title: string;
  id: string;
  showAction?: boolean;
}

export const ProductSlider: React.FC<ProductProps> = async ({
  title,
  id,
  showAction = true,
  where = {},
}) => {
  const products = await db.product.findMany({
    where: where,
    take: 10,
    include: {
      images: true,
      size: true,
      color: true,
    },
  });
  if (products.length === 0) {
    return;
  }
  return (
    <div className="my-2 py-4 ">
      <div className="flex items-center justify-between relative">
        <h2 className="font-semibold px-4 sm:px-20 text-xl mb-4 sm:mb-8 sm:text-3xl">
          {title}
        </h2>
        {showAction && (
          <Link
            className={buttonVariants({
              variant: "link",
              className: "pr-4 md:pr-20",
            })}
            href={`/s/${where.storeId}`}
          >
            See more
          </Link>
        )}
      </div>
      <div
        className="grid product-carousel py-4 md:pb-8 sm:px-20 px-4 grid-flow-col scroll-auto gap-4 sm:gap-6 
    overflow-y-auto overflow-x-scroll overscroll-x-contain"
      >
        {products.map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}
      </div>
    </div>
  );
};
