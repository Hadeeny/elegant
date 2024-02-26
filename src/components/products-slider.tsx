import { ProductSliderProps } from "@/lib/types";
import Image from "next/image";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "./product-card";

export const ProductSlider = ({ title, products }: ProductSliderProps) => {
  return (
    <div className="my-12 py-4 ">
      <h2 className="font-semibold px-4 sm:px-20 text-xl mb-4 sm:mb-8 sm:text-3xl">
        {title}
      </h2>
      <div
        className="grid product-carousel bg-white py-4 md:pb-8 sm:px-20 px-4 grid-flow-col scroll-auto gap-4 sm:gap-6 
    overflow-y-auto overflow-x-scroll overscroll-x-contain"
      >
        {products.map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}
      </div>
    </div>
  );
};