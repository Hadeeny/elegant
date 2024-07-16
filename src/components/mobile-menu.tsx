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
import { ModeToggle } from "./mode-toggle";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import QueryResults from "./query-results";
import { useDebouncedCallback } from "use-debounce";

type Store = {
  name: string | null;
  id: string | null;
};

type StoreProps = {
  stores: Store[];
};

const MobileMenu: React.FC<StoreProps> = ({ stores }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const session = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/s/" },
    { name: "Cart", link: "/cart" },
    { name: "Products", link: "/#products" },
  ];

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <>
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
          {menuItems.map((menu) => (
            <NavbarItem key={menu.link}>
              <Link
                color="foreground"
                href={menu.link}
                className={`${
                  pathname === menu.link && "underline underline-offset-2"
                } font-extralight`}
              >
                {menu.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <span className="cursor-pointer border-2 px-2 rounded-md hidden items-center gap-x-2 sm:flex">
            <input
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              defaultValue={searchParams.get("q")?.toString()}
              type="search"
              className="focus:outline-none h-10 dark:bg-transparent"
            />

            <Icons.search />
          </span>
          <span className="cursor-pointer hidden sm:flex">
            <Link href="/account">
              <Icons.user className="stroke-black dark:stroke-white" />
            </Link>
          </span>
          <Cart />
          <div className="hidden sm:block">
            <ModeToggle />
          </div>
        </NavbarContent>
        <NavbarMenu className="flex flex-col flex-1">
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
          <div className="gap-y-8 ">
            <div className="gap-x-2 space-y-2 my-4">
              <NavbarMenuItem>
                {session.data?.user ? (
                  <Link
                    href="/account"
                    className={buttonVariants({
                      className: "w-full",
                      size: "lg",
                    })}
                  >
                    Account
                  </Link>
                ) : (
                  <Link
                    href="/sign-in"
                    className={buttonVariants({
                      className: "w-full",
                      size: "lg",
                    })}
                  >
                    Sign in
                  </Link>
                )}
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
              <div className="bg-transparent h-10 w-full" />
            </div>
          </div>
        </NavbarMenu>
      </Navbar>
      <QueryResults />
    </>
  );
};
export default MobileMenu;
