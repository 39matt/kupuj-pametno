'use client'; // Ovo je obavezno

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function ProductGallery({ images, name }: { images: string[], name: string }) {
    const [mainImage, setMainImage] = useState(images[0] || 'https://placehold.co/800x600');
    const [isFullScreen, setIsFullScreen] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            {/* Glavna slika */}
            <div
                className="relative aspect-4/3 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 cursor-zoom-in"
                onClick={() => setIsFullScreen(true)}
            >
                <Image
                    src={mainImage}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 95vw, (max-width: 1200px) 40vw, 500px"
                    priority
                    className="object-contain p-4"
                />
            </div>

            {/* Thumbnail-ovi */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {images.map((url, index) => (
                        <div
                            key={index}
                            onClick={() => setMainImage(url)}
                            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                                mainImage === url ? 'border-[#FF181A]' : 'border-gray-100 hover:border-gray-300'
                            }`}
                        >
                            <Image src={url} alt={`${name} ${index}`} fill sizes="(max-width: 768px) 20vw, 150px" className="object-cover" />
                        </div>
                    ))}
                </div>
            )}

            {/* Full Screen Overlay (Lightbox) */}
            {isFullScreen && (
                <div
                    className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-4 md:p-10"
                    onClick={() => setIsFullScreen(false)}
                >
                    <button
                        className="absolute top-6 right-6 text-white hover:text-gray-300 transition"
                        onClick={() => setIsFullScreen(false)}
                    >
                        <X size={40} />
                    </button>
                    <div className="relative w-full h-full">
                        <Image
                            src={mainImage}
                            alt={name}
                            fill
                            sizes="100vw"
                            className="object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}