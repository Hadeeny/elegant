"use client";
import { Image as PrismaImage } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

export const ImageShowCase: React.FC<{ images: PrismaImage[] }> = ({
  images,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div>
      <div className="size-full">
        <Image
          src={images[currentIndex].url}
          alt=""
          width={1000}
          height={1000}
        />
      </div>
      <div className="grid gap-4 mt-8 grid-cols-3">
        {images.map((image, index) => (
          <div key={image.id} className="">
            <Image
              className="cursor-pointer"
              onClick={() => setCurrentIndex(index)}
              src={image.url}
              alt="image"
              width={1000}
              height={10}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
