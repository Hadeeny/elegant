"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from "@nextui-org/react";
import { Icons } from "./Icons";
// import {AcmeLogo} from "./AcmeLogo.jsx";
import { Badge } from "@/components/ui/badge";
import Cart from "./cart";
import { Button as Btn, buttonVariants } from "@/components/ui/button";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/" },
    { name: "Product", link: "/" },
    { name: "Contact us", link: "/" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit text-xl">3legant</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Shop
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Product
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Contact us
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <span className="cursor-pointer hidden sm:flex">
          <Icons.search />
        </span>
        <span className="cursor-pointer hidden sm:flex">
          <Icons.user />
        </span>
        <Cart />
      </NavbarContent>
      <NavbarMenu className="bg-white flex flex-col h-screen">
        <div className="flex-1">
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              className="border-b flex items-center py-2 border-black"
              key={`${item}-${index}`}
            >
              <Link className="w-full" href={item.link} size="lg">
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
        <div>
          {[1, 2].map((_, i) => (
            <NavbarMenuItem
              className="border-b flex items-center py-2 border-black"
              key={i}
            >
              <Link className="w-full" href={"/"} size="lg">
                cart
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
        <div className="gap-x-2 space-y-2 my-4">
          <Link
            href="/sign-in"
            className={buttonVariants({
              className: "w-full",
              size: "lg",
            })}
          >
            Sign in
          </Link>
          <div className="flex gap-x-4">
            <Instagram size={30} />
            <Facebook size={30} />
            <Youtube size={30} />
          </div>
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
