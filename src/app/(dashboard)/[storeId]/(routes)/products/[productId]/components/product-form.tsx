"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import {
  ProductFormSchema,
  TProductFormValues,
} from "@/lib/validators/account-credentials-validators";

import Link from "next/link";
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@nextui-org/react";
import {
  Billboard,
  Category,
  Color,
  Image,
  Product,
  Size,
  Store,
} from "@prisma/client";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AlertModal from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { register } from "module";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
// import ProductDashboard from "./custom-form";
import CustomForm from "./custom-form";
// import Image from 'next/image'

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
  userId: string;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  userId,
  categories,
  sizes,
  colors,
}) => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = initialData ? "Edit Product" : "Create Product";
  const description = initialData ? "Edit a Product" : "Add a Product";
  const toastMessage = initialData ? "Product Updated" : "Product Created";
  const action = initialData ? "Save Changes" : "Create";

  const defaultValues: TProductFormValues = initialData
    ? {
        name: initialData.name || "", // Providing an empty string if name is null
        images: initialData.images,
        price: Number(initialData.price),
        categoryId: initialData.categoryId,
        colorId: initialData.colorId,
        sizeId: initialData.sizeId,
        isArchived: initialData.isArchived,
        isFeatured: initialData.isFeatured,
      }
    : {
        name: "", // Default empty string if initialData is null
        images: [],
        price: 0,
        categoryId: "",
        colorId: "",
        sizeId: "",
        isFeatured: false,
        isArchived: false,
      };

  const form = useForm<TProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: TProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          {
            ...data,
            userId,
            // imageUrl: data.imageUrl,
          }
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, {
          ...data,
          userId,
          // imageUrl: data.imageUrl,
        });
      }

      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const deleteStore = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/products/${params.productId}`,
        {
          data: { userId },
        }
      );
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success("Product deleted.");
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={deleteStore}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Divider />
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="#">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="#">Products</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Edit Product</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-7 w-7">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                      Pro Controller
                    </h1>
                    <Badge variant="outline" className="ml-auto sm:ml-0">
                      In stock
                    </Badge>
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                      <Button variant="outline" size="sm">
                        Discard
                      </Button>
                      <Button size="sm">{action}</Button>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                      <Card x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                          <CardTitle>Product Details</CardTitle>
                          <CardDescription>
                            Lipsum dolor sit amet, consectetur adipiscing elit
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6">
                            <div className="grid gap-3">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="description">Description</Label>
                              <Textarea
                                id="description"
                                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                                className="min-h-32"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card x-chunk="dashboard-07-chunk-1">
                        <CardHeader>
                          <CardTitle>Variant</CardTitle>
                          <CardDescription>
                            Lipsum dolor sit amet, consectetur adipiscing elit
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[100px]">SKU</TableHead>
                                <TableHead>Color</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="w-[100px]">
                                  Size
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-semibold">
                                  GGPC-001
                                </TableCell>
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name="colorId"
                                    render={({ field }) => (
                                      <FormItem>
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select a Colour" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {colors.map((color) => (
                                              <SelectItem
                                                key={color.id}
                                                value={color.id}
                                              >
                                                {color.name}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </FormItem>
                                    )}
                                  ></FormField>
                                </TableCell>
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            placeholder="9.99"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name="sizeId"
                                    render={({ field }) => (
                                      <FormItem>
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select a size" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {sizes.map((size) => (
                                              <SelectItem
                                                key={size.id}
                                                value={size.id}
                                              >
                                                {size.name}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </FormItem>
                                    )}
                                  ></FormField>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                        <CardFooter className="justify-center border-t p-4">
                          <Button size="sm" variant="ghost" className="gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            Add Variant
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card x-chunk="dashboard-07-chunk-2">
                        <CardHeader>
                          <CardTitle>Product Category</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6 sm:grid-cols-3">
                            <FormField
                              control={form.control}
                              name="categoryId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Select Category</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {categories.map((category) => (
                                        <SelectItem
                                          key={category.id}
                                          value={category.id}
                                        >
                                          {category.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            ></FormField>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                      <Card
                        className="overflow-hidden"
                        x-chunk="dashboard-07-chunk-4"
                      >
                        <CardHeader>
                          <CardTitle>Product Images</CardTitle>
                          <CardDescription>
                            Lipsum dolor sit amet, consectetur adipiscing elit
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                  <ImageUpload
                                    value={field.value.map((img) => img.url)}
                                    disabled={loading}
                                    onChange={(url) => {
                                      field.onChange([...field.value, { url }]);
                                      console.log(field.value);
                                    }}
                                    onRemove={(url) =>
                                      field.onChange([
                                        ...field.value.filter(
                                          (current) => current.url !== url
                                        ),
                                      ])
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                      <Card x-chunk="dashboard-07-chunk-3">
                        <CardHeader>
                          <CardTitle>Product Status</CardTitle>
                          <CardDescription>
                            This product will appear on the homepage
                          </CardDescription>
                        </CardHeader>

                        <CardContent>
                          <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Featured</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>

                      <Card x-chunk="dashboard-07-chunk-5">
                        <CardHeader>
                          <CardTitle>Archive Product</CardTitle>
                          <CardDescription>
                            Product will not appear anywhere on the store
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="isArchived"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Archived</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 md:hidden">
                    <Button variant="outline" size="sm">
                      Discard
                    </Button>
                    <Button size="sm">Save Product</Button>
                  </div>
                </div>
              </main>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
