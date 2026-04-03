'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import AddToCartButton from './AddToCartButton';
import { IProduct } from "@/app/utils/models/IProduct";

export default function ProductBundle({ productInfo }: { productInfo: IProduct }) {
    const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 51, seconds: 31 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (value: number) => value.toString().padStart(2, '0');

    const options = [
        {
            id: 1,
            title: 'Kupi 1 komad',
            quantity: 1,
            price: productInfo.price,
            oldPrice: productInfo.price + 1500,
            discount: ''
        },
        {
            id: 2,
            title: 'Kupi 2 komada',
            discount: '5% POPUST',
            quantity: 2,
            price: Math.round(productInfo.price * 2 * 0.95),
            oldPrice: (productInfo.price + 1500) * 2
        },
        {
            id: 3,
            title: 'Kupi 3 komada',
            discount: '10% POPUST',
            quantity: 3,
            price: Math.round(productInfo.price * 3 * 0.90),
            oldPrice: (productInfo.price + 1500) * 3
        }
    ];

    const [selectedId, setSelectedId] = useState(1);
    const current = options.find(o => o.id === selectedId)!;

    return (
        <div className="w-full font-sans my-6">
            <div className="bg-[#F5A623] text-white flex items-center justify-center gap-2 py-2.5 rounded-t-xl font-black text-sm uppercase">
                Akcija traje još {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                <Clock size={16} fill="currentColor" className="text-[#F5A623] bg-white rounded-full p-0.5 ml-1" />
            </div>

            <div className="border-2 border-t-0 border-[#F5A623]/30 rounded-b-xl overflow-hidden bg-white shadow-sm mb-6">
                {options.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => setSelectedId(option.id)}
                        className={`p-4 cursor-pointer flex justify-between items-center transition-colors ${
                            selectedId === option.id ? 'bg-[#FFF9F0]' : 'hover:bg-gray-50 border-b border-gray-100 last:border-0'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                selectedId === option.id ? 'border-[#F5A623]' : 'border-gray-300'
                            }`}>
                                {selectedId === option.id && <div className="w-2.5 h-2.5 bg-[#F5A623] rounded-full" />}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{option.title}</h4>
                                {option.discount && (
                                    <p className="text-[#FF181A] text-[11px] md:text-xs font-extrabold mt-0.5">{option.discount}</p>
                                )}
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="font-black text-lg text-[#FF181A] leading-none">
                                {option.price.toLocaleString()} RSD
                            </div>
                            <div className="text-[11px] text-gray-400 line-through font-bold mt-1">
                                {option.oldPrice.toLocaleString()} RSD
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* DUGME ZA KORPU */}
            <AddToCartButton
                item={{
                    id: productInfo.id,
                    name: productInfo.name,
                    price: productInfo.price,
                    quantity: current.quantity,
                    image: productInfo.imageUrls[0] || ""
                }}
                text={`DODAJ U KORPU — ${current.price.toLocaleString()} RSD`}
            />

        </div>
    );
}