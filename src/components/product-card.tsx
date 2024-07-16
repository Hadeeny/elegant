import Image from "next/image";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { formatPrice, getDiscount } from "@/lib/utils";
import { Color, Image as PrismaImage, Product, Size } from "@prisma/client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { AddToCartClient } from "./add-to-cart";
// import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product & {
    images: PrismaImage[];
    size: Size;
    color: Color;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  if (!product) {
    return;
  }
  return (
    <div className="flex sm:w-[250px] w-[220px] flex-col gap-2">
      <div className="relative">
        <Card className="py-4 relative rounded-none">
          <div className="absolute flex left-3 flex-col gap-2 z-10">
            <Badge className="rounded-md bg-white uppercase">New</Badge>
            {/* TODO */}
            {/* <Badge className="rounded-md bg-[#38CB89] uppercase">-20%</Badge> */}
          </div>
          <div className="absolute z-10 right-3">
            {/* TODO */}
            {/* <button className="p-3 bg-white rounded-full">
              <Icons.Favorite />
            </button> */}
          </div>
          <CardBody className="overflow-visible py-2">
            <Link
              href={`/p/${product.id}`}
              className="w-full flex justify-center items-center"
            >
              <div className="w-[220px] h-[200px] relative flex justify-self-center">
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  alt=""
                  className="aspect-square"
                  src={product.images[0].url}
                />
              </div>
            </Link>
          </CardBody>
          <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
            <AddToCartClient item={product} />
          </CardFooter>
        </Card>
      </div>
      <Link href={`/${product.id}`} className="mt-2">
        <p className="font-semibold">{product?.name}</p>
        <div className="flex gap-x-4">
          <p className="font-semibold">{formatPrice(Number(product.price))}</p>
          {/* <p className="line-through opacity-40">
            {formatPrice(getDiscount(20, product!.price.toNumber()))}
          </p> */}
        </div>
      </Link>
    </div>
  );
};

{
  /* <div className="sm:w-[250px] bg-white w-[220px] relative">
        <div className="mx-auto absolute sm:top-5 top-2 w-11/12 sm:w-10/12 inset-0 flex items-start justify-between">
          <div className="space-y-2">
            <p className="bg-white py-1 px-4 rounded-md text-sm uppercase">
              New
            </p>
            <p className="bg-[#38CB89] py-1 px-2.5 text-white rounded-md text-sm uppercase">
              -20%
            </p>
          </div>
          <button className="p-4 bg-white rounded-full">
            <Icons.Favorite />
          </button>
        </div>
        <Button className="w-11/12 sm:w-10/12 inset-x-0 h-9 sm:h-10 mx-auto absolute bottom-2 sm:bottom-4">
          Add to cart
        </Button>
        <Image
          src={product.images[0].url}
          alt="chair"
          width={300}
          height={370}
        />
      </div>
      <div className="mt-2">
        <p className="font-semibold">{product?.name}</p>
        <div className="flex gap-x-4">
          <p className="font-semibold">
            {formatPrice(product!.price.toNumber(), { currency: "USD" })}
          </p>
          <p className="line-through opacity-40">
            {formatPrice(getDiscount(20, product!.price.toNumber()))}
          </p>
        </div>
      </div> */
}
