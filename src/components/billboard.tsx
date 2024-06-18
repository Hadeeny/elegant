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
      {/* <div
        style={{
          backgroundImage: "url('./../../public/images/newsletter.png')",
        }}
        className={`border-2 border-black w-full h-[30rem]`}
      >
        Big billboard here
      </div> */}

      <div className="relative w-full h-[30rem]">
        <div className="absolute top-20 z-[200] w-full flex justify-center inset-x-0">
          <p className="text-4xl text-white font-bold">{billboard.label}</p>
        </div>
        <Image alt={billboard.label} src={billboard.imageUrl} fill />
      </div>
    </div>
  );
};

export default Billboard;
