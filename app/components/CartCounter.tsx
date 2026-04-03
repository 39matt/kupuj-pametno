'use client';

import { ShoppingCart } from 'lucide-react';
import {useCartStore} from "@/app/utils/store/useCartStore";

export default function CartCounter() {
    const items = useCartStore((state) => state.items);
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="relative group">
            <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF181A] text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-sm">
                    {totalItems}
                </span>
            )}
        </div>
    );
}