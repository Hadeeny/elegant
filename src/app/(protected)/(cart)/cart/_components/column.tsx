"use client";

import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Color, Image as PrismaImage } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

const SelectQuantity: React.FC<{ quantity: number; id: string }> = ({
  quantity,
  id,
}) => {
  const cart = useCart();
  return (
    <>
      <div className="flex border-2 border-black rounded-md max-w-min">
        <button
          disabled={quantity <= 1}
          onClick={() => cart.decrement(id)}
          className="px-3 text-base py-1"
        >
          -
        </button>
        <div className="px-3 text-base py-1">{quantity}</div>
        <button
          className="px-3 text-base py-1"
          onClick={() => cart.increment(id)}
        >
          +
        </button>
      </div>
    </>
  );
};

export type CartColumn = {
  id: string;
  name: string;
  price: Decimal;
  images: PrismaImage[];
  color: Color;
  quantity: number;
};

export const columns: ColumnDef<CartColumn>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({
      row: {
        original: { name, images, color },
      },
    }) => (
      <div className="flex items-center gap-x-4">
        <div className="relative w-[60px] aspect-square">
          <Image
            fill
            alt={name}
            className="object-cover aspect-square"
            src={images[0].url}
          />
        </div>
        <div>
          <p>{name}</p>
          <p>{color.name}</p>
          <div>Remove</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({
      row: {
        original: { quantity, id },
      },
    }) => {
      return <SelectQuantity quantity={quantity} id={id} />;
    },
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({
      row: {
        original: { price },
      },
    }) => <p>{formatPrice(Number(price))}</p>,
  },

  {
    accessorKey: "subtotal",
    header: "Subtotal",
    cell: ({
      row: {
        original: { price, quantity },
      },
    }) => <p>{formatPrice(Number(price) * quantity)}</p>,
  },
];
