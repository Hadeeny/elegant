"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "./ui/image-slider";

export function ImagesSlide() {
  const images = [
    "/images/bigchair.png",
    "/images/bigchair.png",
    "/images/bigchair.png",
  ];
  return (
    <ImagesSlider autoplay={true} className="h-[35rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      ></motion.div>
    </ImagesSlider>
  );
}
