import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
    name: string;
    imageUrl: string;
    oldPrice: string;
    price: string;
    discountPercentage?: string;
}

const ProductCard = ({ name, imageUrl, oldPrice, price, discountPercentage }: ProductCardProps) => {
    return (
        <div className="flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 pb-4">
            <div className="relative aspect-square bg-white flex items-center justify-center p-4">
                {discountPercentage && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center z-10 text-xs border border-white shadow-sm">
                        {discountPercentage}%
                    </div>
                )}
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-contain p-2"
                />
            </div>

            <div className="px-4 flex flex-col grow items-center text-center">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-3 min-h-10">
                    {name}
                </h3>
                <div className="mt-auto flex flex-col items-center">
          <span className="text-xs text-gray-500 line-through mb-1">
            {oldPrice} din
          </span>
                    <span className="text-lg font-bold text-red-600">
            {price} din
          </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;