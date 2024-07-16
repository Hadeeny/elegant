import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: String;
  children: ReactNode;
}) => {
  return (
    <div className={cn("mx-auto w-full px-4 md:px-20", className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
