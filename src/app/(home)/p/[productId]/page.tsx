import { ProductDetails } from "@/components/product-details";
import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Spinner from "@/components/ui/spinner";

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
      {/* TODO */}
      {/* <ProductBreadcrumb /> */}

      <Suspense fallback={<Spinner />}>
        <ProductDetails productId={productId} />
      </Suspense>
    </MaxWidthWrapper>
  );
};

export default ProductPage;
