"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { AdminMenu } from "./admin-menu";

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/dashboard/${params.storeId}`,
      label: "Overview",
      active: pathName === `/dashboard/${params.storeId}`,
    },

    {
      href: `/dashboard/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathName === `/dashboard/${params.storeId}/billboards`,
    },
    {
      href: `/dashboard/${params.storeId}/categories`,
      label: "Categories",
      active: pathName === `/dashboard/${params.storeId}/categories`,
    },
    {
      href: `/dashboard/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathName === `/dashboard/${params.storeId}/sizes`,
    },
    {
      href: `/dashboard/${params.storeId}/colors`,
      label: "Colours",
      active: pathName === `/dashboard/${params.storeId}/colors`,
    },
    {
      href: `/dashboard/${params.storeId}/products`,
      label: "Products",
      active: pathName === `/dashboard/${params.storeId}/products`,
    },
    {
      href: `/dashboard/${params.storeId}/settings`,
      label: "Settings",
      active: pathName === `/dashboard/${params.storeId}/settings`,
    },
  ];
  return (
    <>
      <nav
        className={cn(
          "sm:flex items-center hidden  space-x-4 lg lg:space-x-6",
          className
        )}
      >
        {routes.map((route, i) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
      <div className="sm:hidden block ml-4">
        <AdminMenu routes={routes} />
      </div>
    </>
  );
};
