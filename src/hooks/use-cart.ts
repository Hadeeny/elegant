import { CartItem } from "@/lib/types";
import { Product, Size, Image, Color } from "@prisma/client";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartType {
  items: (Product & { size: Size; images: Image[]; color: Color })[];
  addItem: (
    data: Product & { size: Size; images: Image[]; color: Color }
  ) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<CartType>(
    (set, get) => ({
      items: [],
      addItem: (
        data: Product & { size: Size; images: Image[]; color: Color }
      ) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item?.id === data.id);
        if (existingItem) {
          return toast("Item already in cart");
        }
        set({
          items: [...get().items, data],
        });
        toast.success("Item add to cart");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item?.id !== id)] });
        toast.success("Items removed from cart");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
