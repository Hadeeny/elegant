"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import "swiper/css";
import { Color, Image, Product, Size } from "@prisma/client";
import { ProductCard } from "../product-card";
import MaxWidthWrapper from "../max-width-wrapper";

interface ExtendedProduct extends Product {
  images: Image[];
  size: Size;
  color: Color;
}

const Slider = ({ products }: { products: ExtendedProduct[] }) => {
  if (!products) {
    return;
  }
  return (
    <MaxWidthWrapper>
      <Swiper slidesPerView={"auto"} spaceBetween={20}>
        {products.map((product, i) => (
          <SwiperSlide key={i} style={{ width: "auto" }} className="">
            <ProductCard product={product} key={product.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </MaxWidthWrapper>
  );
};

export default Slider;
