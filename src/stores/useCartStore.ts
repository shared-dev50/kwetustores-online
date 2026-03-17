import { create } from "zustand";
import type { CartItem } from "../entities/types";

interface CartState {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  addItem: newItem => {
    const { cart } = get();
    const existing = cart.find(i => i.product.id === newItem.product.id);

    if (existing) {
      set({
        cart: cart.map(i =>
          i.product.id === newItem.product.id
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i,
        ),
      });
    } else {
      set({ cart: [...cart, newItem] });
    }
  },

  removeItem: id =>
    set(state => ({
      cart: state.cart.filter(item => item.product.id !== id),
    })),

  updateQuantity: (id, amount) =>
    set(state => ({
      cart: state.cart.map(item =>
        item.product.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    })),

  clearCart: () => set({ cart: [] }),
}));
