"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CheckOutSteps {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
}

export const CheckoutProcess: React.FC<CheckOutSteps> = ({
  step1,
  step2,
  step3,
}) => {
  const pathName = usePathname();
  const checkout_routes = [
    {
      label: "Shopping cart",
      href: "/cart",
      active: pathName === "/cart",
    },
    {
      label: "Checkout details",
      href: "/checkout-details",
      active: pathName === "/checkout-details",
    },
    {
      label: "Order complete",
      href: "/order",
      active: pathName === "/order",
    },
  ];
  return (
    <ul className="flex items-center justify-between sm:justify-center w-full sm:w-auto my-6 text-base sm:text-xl gap-x-6 ">
      <li className="flex gap-x-2 items-center ">
        <div
          className={cn(
            "size-8 flex rounded-full dark:bg-gray-200 dark:text-black bg-gray-800 text-white text-sm items-center justify-center",
            { step1: "hidden" }
          )}
        >
          1
        </div>
        {step1 ? (
          <Link className={cn("text-green-300")} href={"/cart"}>
            Shopping cart
          </Link>
        ) : (
          <p className="opacity-20 sm:block hidden "> Shopping cart</p>
        )}
      </li>
      <li className="flex gap-x-2 items-center">
        <div className="size-8 flex rounded-full dark:bg-gray-200 dark:text-black bg-gray-800 text-white text-sm items-center justify-center">
          2
        </div>
        {step2 ? (
          <Link className="text-green-300" href={"/checkout-details"}>
            Checkout Details
          </Link>
        ) : (
          <p className="opacity-20 hidden sm:block"> Checkout Details</p>
        )}
      </li>
      <li className="sm:flex gap-x-2 hidden items-center">
        <div className="size-8 flex rounded-full dark:bg-gray-200 dark:text-black bg-gray-800 text-white text-sm items-center justify-center">
          3
        </div>
        {step3 ? (
          <Link className="text-green-300" href={"/cart"}>
            Order Complete
          </Link>
        ) : (
          <p className="opacity-20">Order Complete</p>
        )}
      </li>
    </ul>
  );
};
