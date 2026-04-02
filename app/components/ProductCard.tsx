import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
    id: string;
    name: string;
    imageUrl: string;
    oldPrice: string;
    price: string;
    discountPercentage?: string;
}

const ProductCard = ({ id, name, imageUrl, oldPrice, price, discountPercentage }: ProductCardProps) => {
    return (
        <Link href={`/products/${id}`} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 group cursor-pointer">
            <div className="relative aspect-5/4 w-full overflow-hidden bg-gray-100">
                {discountPercentage && (
                    <div className="absolute top-0 right-0 bg-[#FF181A] text-white text-[16px] tracking-wider font-bold px-3 py-1 uppercase z-10 rounded-bl-lg">
                        {discountPercentage} %
                    </div>
                )}

                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="p-4 md:p-5 flex flex-col grow items-center text-center justify-between bg-white">
                <h3 className="text-[13px] md:text-lg font-bold text-gray-800 line-clamp-2 mb-3 leading-snug min-h-10">
                    {name}
                </h3>

                <div className="flex flex-col items-center mt-auto">
                    <span className="text-sm md:text-xl font-extrabold text-[#FF181A] mb-0.5">
                        {price} din
                    </span>

                    <span className="text-[11px] md:text-lg font-black text-gray-900 line-through">
                        {oldPrice} din
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;