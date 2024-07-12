"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";

// Import Swiper styles
import "swiper/css";
import Image from "next/image";

export function ImagesSlide() {
  const images = [
    "/images/bigchair.png",
    "/images/bigchair.png",
    "/images/bigchair.png",
  ];
  return (
    <Swiper
      slidesPerView={1}
      autoplay={{ delay: 5000 }}
      pagination={true}
      modules={[Autoplay]}
      speed={600}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {images.map((img, i) => (
        <SwiperSlide key={i} className="">
          <div className="w-full h-[400px] relative">
            <Image
              fill
              style={{ objectFit: "cover" }}
              alt=""
              className=""
              src={img}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
