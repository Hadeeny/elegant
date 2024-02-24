import MaxWidthWrapper from "@/components/max-width-wrapper";
import Image from "next/image";
import chair from "/images/bigchair.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightFromLine } from "lucide-react";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { ImagesSlide } from "@/components/image-slider";

export default function Home() {
  const images = [
    { id: 0, link: "/images/bigchair.png" },
    { id: 1, link: "/images/bigchair.png" },
    { id: 2, link: "/images/bigchair.png" },
  ];
  return (
    <MaxWidthWrapper>
      <ImagesSlide />

      <div className="my-4 sm:my-8 flex flex-col sm:flex-row items-center gap-y-4">
        <div className="w-full sm:w-1/2">
          <h2 className="font-semibold text-3xl sm:text-6xl">
            Simply unique / <br /> Simply better
          </h2>
        </div>
        <div className="w-full sm:w-1/2">
          <p className="text-lg">
            <span className="font-semibold">3legant</span> is a gift &
            decorations store based in HCMC, Vietnam. Est since 2019.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-x-6 sm:flex-row gap-y-6 items-center">
        <div className="w-full sm:bg-1/2 relative">
          <div className="absolute top-8 left-8">
            <h2 className="sm:text-3xl text-xl font-semibold sm:mb-4">
              Living Room
            </h2>
            <Link
              href={"/"}
              className="flex gap-x-2 underline underline-offset-4 items-center"
            >
              Shop now <Icons.ArrowRight />
            </Link>
          </div>
          <Image
            src="/images/livingchair.png"
            width={1000}
            height={1000}
            alt="auth chair"
          />
        </div>
        <div className="w-full sm:bg-1/2 gap-y-6 flex flex-col">
          <div className="relative">
            <div className="absolute bottom-8 left-8">
              <h2 className="sm:text-3xl text-xl font-semibold sm:mb-4">
                BedRoom
              </h2>
              <Link
                href={"/"}
                className="flex gap-x-2 underline underline-offset-4 items-center"
              >
                Shop now <Icons.ArrowRight />
              </Link>
            </div>
            <Image
              src="/images/cubboard.png"
              alt="cupboard"
              width={1000}
              height={1000}
            />
          </div>
          <div className="relative">
            <div className="absolute bottom-8 left-8">
              <h2 className="sm:text-3xl text-xl font-semibold sm:mb-4">
                Kitchen
              </h2>
              <Link
                href={"/"}
                className="flex gap-x-2 underline underline-offset-4 items-center"
              >
                Shop now <Icons.ArrowRight />
              </Link>
            </div>
            <Image
              src="/images/toaster.png"
              alt="toaster"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
