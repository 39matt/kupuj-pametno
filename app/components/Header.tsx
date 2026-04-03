import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu } from 'lucide-react';
import CartCounter from "@/app/components/CartCounter";

const Header = () => {
    return (
        <header className="w-full font-sans bg-white border-b border-gray-100">
            <div className="bg-black text-white text-[10px] md:text-xs py-2 px-4 text-center tracking-widest font-bold uppercase">
                DOBRODOŠLI U <span className={"text-red-500"}>KUPUJ</span>PAMETNO
            </div>

            <div className="max-w-6xl mx-auto px-4 py-4 md:py-4 flex items-center justify-between relative min-h-20 md:min-h-auto">

                <div className="flex items-center md:hidden z-10">
                    <button className="text-gray-800 hover:text-[#FF181A] transition">
                        <Menu size={28} />
                    </button>
                </div>

                <div className="md:static absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 z-0">
                    <Link href="/" className="relative shrink-0 flex items-center">
                        <div className="relative w-52 h-24 md:w-64 md:h-24">
                            <Image
                                src="/logo.png"
                                alt="KupujPametno Logo"
                                fill
                                sizes="(max-width: 768px) 208px, 256px"
                                priority
                                className="object-contain md:object-left object-center"
                            />
                        </div>
                    </Link>
                </div>

                <div className="grow hidden md:flex items-center max-w-xl relative mx-8">
                    <input
                        type="text"
                        placeholder="Šta želite da kupite danas?"
                        className="w-full border-2 border-gray-100 rounded-xl py-2.5 pl-6 pr-14 outline-none focus:border-[#FF181A]/50 transition-all text-sm bg-gray-50"
                    />
                    <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#FF181A] text-white rounded-lg px-4 flex items-center justify-center hover:bg-[#D91416] transition-colors shadow-sm">
                        <Search size={18} />
                    </button>
                </div>

                <div className="flex items-center text-gray-700 z-10">
                    <Link href="/cart" className="flex flex-col items-center hover:text-[#FF181A] transition-colors relative group">
                        <CartCounter/>
                        <span className="text-[10px] font-bold uppercase mt-1 hidden md:block tracking-tight">Korpa</span>
                    </Link>
                </div>
            </div>

            <div className="md:hidden px-4 pb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Pretraži..."
                        className="w-full border border-gray-200 rounded-lg py-2.5 pl-4 pr-12 outline-none focus:border-[#FF181A] text-sm bg-gray-50"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;