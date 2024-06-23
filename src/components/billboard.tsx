import React from "react";
import { Billboard as PrismaBillborad } from "prisma/prisma-client";
import Image from "next/image";

type Props = {
  billboards: PrismaBillborad[];
};

const Billboard: React.FC<Props> = ({ billboards }) => {
  const billboard = billboards[0];
  return (
    <div>
      <div className="relative w-full z-0 flex items-center justify-center h-[30rem]">
        <div className="bg-black opacity-70 absolute z-[-1] inset-0" />
        <div className=" w-full flex flex-col items-center gap-y-4 justify-center inset-x-0">
          <p className="text-4xl text-white font-bold">{billboard.label}</p>
          
        </div>

        <Image
          alt={billboard.label}
          src={billboard.imageUrl}
          fill
          className="object-cover z-[-2] absolute"
        />
      </div>
    </div>
  );
};

export default Billboard;
