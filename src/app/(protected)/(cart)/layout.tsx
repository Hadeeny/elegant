import { CheckoutProcess } from "@/components/checkout-process";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Link from "next/link";

export default function cartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mt-14">
        <h2 className="font-semibold text-4xl text-center">Check Out</h2>
      </div>
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </div>
  );
}
