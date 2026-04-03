'use client';

import { useState } from 'react';
import { Clock } from 'lucide-react';

interface BundleOption {
    id: number;
    title: string;
    quantity: number;
    price: number;
    oldPrice: number;
    shipping: string;
    discountBadge?: string;
}

export default function ProductBundle({ basePrice }: { basePrice: number }) {
    const options: BundleOption[] = [
        {
            id: 1,
            title: 'Kupi 1 komad',
            quantity: 1,
            price: basePrice,
            oldPrice: basePrice + 1500,
            shipping: 'Cena dostave je 460 RSD',
        },
        {
            id: 2,
            title: 'Kupi 2 komada',
            quantity: 2,
            price: Math.round(basePrice * 2 * 0.95),
            oldPrice: (basePrice + 1500) * 2,
            shipping: 'Cena dostave je 460 RSD',
            discountBadge: '+5% Popusta'
        },
        {
            id: 3,
            title: 'Kupi 3 komada',
            quantity: 3,
            price: Math.round(basePrice * 3 * 0.90),
            oldPrice: (basePrice + 1500) * 3,
            shipping: 'Cena dostave je 460 RSD',
            discountBadge: '+10% Popusta'
        }
    ];

    const [selected, setSelected] = useState(options[0].id);

    return (
        <div className="w-full font-sans my-8">
            <div className="bg-[#F5A623] text-white flex items-center justify-center gap-2 py-2 rounded-t-xl font-bold text-sm md:text-base">
                Akcija traje još 12:51:31 <Clock size={18} fill="currentColor" className="text-[#F5A623] bg-white rounded-full p-0.5" />
            </div>

            <div className="border-2 border-t-0 border-[#F5A623]/30 rounded-b-xl overflow-hidden bg-white">
                {options.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => setSelected(option.id)}
                        className={`relative flex items-center justify-between p-4 cursor-pointer transition-all border-b border-gray-100 last:border-b-0 ${
                            selected === option.id ? 'bg-[#FFF9F0]' : 'hover:bg-gray-50'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                selected === option.id ? 'border-[#F5A623]' : 'border-gray-300'
                            }`}>
                                {selected === option.id && <div className="w-3 h-3 bg-[#F5A623] rounded-full" />}
                            </div>

                            <div>
                                <h4 className="font-bold text-gray-900">{option.title}</h4>
                                <p className="text-gray-500 text-sm">{option.shipping}</p>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="font-black text-xl text-gray-900">
                                {option.price.toLocaleString()} RSD
                            </div>
                            <div className="text-gray-400 line-through text-sm font-bold">
                                {option.oldPrice.toLocaleString()} RSD
                            </div>
                        </div>

                        {option.discountBadge && (
                            <div className="absolute -top-3 right-4 bg-[#F5A623] text-white text-[10px] font-black px-2 py-1 rounded-md uppercase shadow-sm">
                                {option.discountBadge}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white font-black py-4 rounded-xl mt-4 text-xl shadow-lg transition-transform active:scale-95 uppercase tracking-wide">
                NARUČI ODMAH — {options.find(o => o.id === selected)?.price.toLocaleString()} RSD
            </button>
        </div>
    );
}