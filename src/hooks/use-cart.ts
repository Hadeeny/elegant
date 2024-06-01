import { CartItem } from "@/lib/types";
import { Product, Size, Image, Color } from "@prisma/client";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartType {
  items: CartItem[];
  addItem: (data: CartItem) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
}

export const useCart = create(
  persist<CartType>(
    (set, get) => ({
      items: [],
      addItem: (data: CartItem) => {
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
      increment: (id: string) => {
        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.id === id) {
              // Increment quantity by 1
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
          return { items: updatedItems };
        });
      },
      decrement: (id: string) => {
        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.id === id) {
              // Increment quantity by 1
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
          return { items: updatedItems };
        });
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
