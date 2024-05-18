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
      <div className="relative w-full aspect-square">
        <Image
          src={images[currentIndex].url}
          className="aspect-square object-cover"
          alt=""
          fill
        />
      </div>
      <div className="grid gap-4 mt-8 grid-cols-4">
        {images.map((image, index) => (
          <div key={image.id} className="w-[100px] relative aspect-square">
            <Image
              className="cursor-pointer  object-cover"
              onClick={() => setCurrentIndex(index)}
              src={image.url}
              alt="image"
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};
