import { ProductDetails } from "@/components/product-details";
import React, { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Spacer } from "@nextui-org/react";

function ProductBreadcrumb() {
  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const ProductPage = ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  return (
    <MaxWidthWrapper>
      <ProductBreadcrumb />

      <Suspense fallback={<p>Loading product details</p>}>
        <ProductDetails productId={productId} />
      </Suspense>
    </MaxWidthWrapper>
  );
};

export default ProductPage;
