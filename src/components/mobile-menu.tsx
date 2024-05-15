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
import { Store } from "@prisma/client";
import { ModeToggle } from "./mode-toggle";

interface props {
  stores: Store[];
}

const MobileMenu: React.FC<props> = ({ stores }) => {
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
          <Link href="/account">
            <Icons.user />
          </Link>
        </span>
        <Cart />
        <div className="hidden sm:block">
          <ModeToggle />
        </div>
      </NavbarContent>
      <NavbarMenu className="flex flex-col justify-between">
        <div className="">
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
            <NavbarMenuItem>
              <Link
                href="/sign-in"
                className={buttonVariants({
                  className: "w-full",
                  size: "lg",
                })}
              >
                Sign in
              </Link>
            </NavbarMenuItem>
            <div className="flex items-center gap-x-4">
              <NavbarMenuItem>
                <Instagram size={30} />
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Facebook size={30} />
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Youtube size={30} />
              </NavbarMenuItem>
              <NavbarMenuItem>
                <ModeToggle />
              </NavbarMenuItem>
            </div>
          </div>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};
export default MobileMenu;
