'use client';

import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { useCartStore } from "@/app/utils/store/useCartStore";
import { ICartItem } from "@/app/utils/models/CartItem";

interface AddToCartButtonProps {
    item: ICartItem;
    text?: string;
}

export default function AddToCartButton({ item, text }: AddToCartButtonProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addItem({ ...item, quantity: item.quantity });

        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'AddToCart', {
                content_name: item.name,
                content_ids: [item.id],
                content_type: 'product',
                value: item.price,
                currency: 'RSD'
            });
        }

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            disabled={isAdded}
            className={`w-full flex items-center justify-center gap-2 text-white font-black py-4 rounded-xl mt-4 text-xl shadow-lg transition-all active:scale-95 uppercase tracking-wide ${
                isAdded ? 'bg-gray-800' : 'bg-[#4CAF50] hover:bg-[#45a049]'
            }`}
        >
            {isAdded ? (
                <>
                    <Check size={24} /> Dodato u korpu
                </>
            ) : (
                <>
                    <ShoppingCart size={20} className="hidden md:block" />
                    {text || 'DODAJ U KORPU'}
                </>
            )}
        </button>
    );
}