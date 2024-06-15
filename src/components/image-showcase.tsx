"use client";
import { cn } from "@/lib/utils";
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
          className="aspect-square rounded-sm object-cover"
          alt=""
          fill
        />
      </div>
      <div className="flex gap-4 my-4 ">
        {images.map((image, index) => (
          <div key={image.id} className="w-[50px] relative aspect-square">
            <Image
              className={cn("cursor-pointer  rounded-md object-cover", {
                "border-white border-2": index == currentIndex,
              })}
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
