import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {ICartItem} from "@/app/utils/models/CartItem";

interface CartState {
    items: ICartItem[];
    addItem: (newItem: ICartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],

            addItem: (newItem: ICartItem) => set((state) => {
                const existingItem = state.items.find((item) => item.id === newItem.id);

                if (existingItem) {
                    return {
                        items: state.items.map((item) =>
                            item.id === newItem.id
                                ? { ...item, quantity: item.quantity + newItem.quantity }
                                : item
                        ),
                    };
                }
                return { items: [...state.items, newItem] };
            }),

            removeItem: (id: string) => set((state) => {
                const existingItem = state.items.find((item) => item.id === id);
                if (existingItem && existingItem.quantity > 1) {
                    return {
                        items: state.items.map((item) =>
                            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                        ),
                    };
                }
                return { items: state.items.filter((item) => item.id !== id) };
            }),

            clearCart: () => set({ items: [] }),
        }),
        { name: 'shopping-cart' }
    )
);