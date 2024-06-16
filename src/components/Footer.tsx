import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import { Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <MaxWidthWrapper
      className={
        "bg-black text-muted-foreground mt-5 items-center flex flex-col justify-center py-8"
      }
    >
      <ul className="flex flex-col sm:flex-row w-full items-center">
        <li className="flex-1 ">
          <Link className="text-white font-normal text-xl" href={"/"}>
            3legant
          </Link>{" "}
          <span className="hidden sm:inline">|</span>{" "}
          <span className="hidden sm:inline">Gift & Decoration store</span>
        </li>
        <div className="flex flex-col items-center sm:flex-row gap-4">
          <div className="sm:hidden block mt-4 sm:mt-auto">
            Gift & Decoration store
          </div>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/shop"}>Shop</Link>
          </li>
          <li>
            <Link href={"/product"}>Product</Link>
          </li>
          <li>
            <Link href={"/blog"}>Blog</Link>
          </li>
          <li>
            <Link href={"/contact-us"}>Contact Us</Link>
          </li>
        </div>
      </ul>
      <Divider className="my-4" />
      <div className="flex flex-col sm:flex-row items-center w-full gap-x-4 sm:space-y-0 space-y-5">
        <p className="order-4 text-sm sm:-order-first mt-6 sm:mt-0">
          Copyright © 2024 3legant. All rights reserved
        </p>
        <Link href={"/"} className="text-white text-sm">
          Privacy Policy
        </Link>
        <Link href={"/"} className="text-white text-sm flex-1">
          Terms of Use
        </Link>
        <div className="flex gap-4 items-center">
          <Link href={"www.instagram.com"}>
            <Instagram className="cursor-pointer hover:text-blue-300" />
          </Link>
          <Link href={"www.fb.com"}>
            <Facebook className="cursor-pointer hover:text-blue-300" />
          </Link>
          <Link href={"www.youtube.com"}>
            <Youtube className="cursor-pointer hover:text-blue-300" />
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Footer;
