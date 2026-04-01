import { create } from "zustand";
import { CartItem, Product } from "../types";

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
  setLoading: (loading: boolean) => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isLoading: false,
  addItem: (item) => {
    const { items } = get();
    const existingItem = items.find((i) => i.productId === item.productId);
    if (existingItem) {
      set({
        items: items.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      });
    } else {
      set({ items: [...items, item] });
    }
  },
  removeItem: (itemId) => {
    set({ items: get().items.filter((i) => i.id !== itemId) });
  },
  updateQuantity: (itemId, quantity) => {
    set({
      items: get().items.map((i) =>
        i.id === itemId ? { ...i, quantity } : i
      ),
    });
  },
  clearCart: () => set({ items: [] }),
  setItems: (items) => set({ items }),
  setLoading: (loading) => set({ isLoading: loading }),
  getTotal: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },
}));
