import Image from "next/image";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { formatPrice, getDiscount } from "@/lib/utils";
import { Product } from "@/lib/types";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div>
      <div className="sm:w-[250px] w-[220px] relative">
        <div className="mx-auto absolute sm:top-5 top-2 w-11/12 sm:w-10/12 inset-0 flex items-start justify-between">
          <div className="space-y-2">
            <p className="bg-white py-1 px-4 rounded-md text-sm uppercase">
              New
            </p>
            <p className="bg-[#38CB89] py-1 px-2.5 text-white rounded-md text-sm uppercase">
              -{product.discount}%
            </p>
          </div>
          <button className="p-4 bg-white rounded-full">
            <Icons.Favorite />
          </button>
        </div>
        <Button className="w-11/12 sm:w-10/12 inset-x-0 h-9 sm:h-10 mx-auto absolute bottom-2 sm:bottom-4">
          Add to cart
        </Button>
        <Image src={product.image} alt="chair" width={300} height={370} />
      </div>
      <div className="mt-2">
        <p className="font-semibold">{product.name}</p>
        <div className="flex gap-x-4">
          <p className="font-semibold">
            {formatPrice(product.price, { currency: "USD" })}
          </p>
          <p className="line-through opacity-40">
            {formatPrice(getDiscount(product.discount, product.price))}
          </p>
        </div>
      </div>
    </div>
  );
};
