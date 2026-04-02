import React from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';

const Header = () => {
    return (
        <header className="w-full font-sans bg-white">
            {/* Top Bar */}
            <div className="bg-black text-white text-xs py-2 px-4 text-center tracking-wide font-medium">
                DOBRODOŠLI U KUPUJPAMETNO - BESPLATNA DOSTAVA PREKO 5000 RSD!
            </div>

            {/* Main Header Area */}
            <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between gap-8">

                {/* Mobile Menu & Logo */}
                <div className="flex items-center gap-4">
                    <button className="md:hidden text-gray-800 hover:text-[#FF181A] transition">
                        <Menu size={28} />
                    </button>
                    <Link href="/" className="shrink-0">
            <span className="text-3xl font-black text-[#FF181A] tracking-tighter">
              Kupuj<span className="text-black">Pametno</span>
            </span>
                    </Link>
                </div>

                {/* Search Bar (Desktop) */}
                <div className="grow hidden md:flex items-center max-w-2xl relative">
                    <input
                        type="text"
                        placeholder="Unesite pojam za pretragu..."
                        className="w-full border-2 border-black rounded-full py-2.5 pl-6 pr-14 outline-none focus:ring-2 focus:ring-[#FF181A]/20 transition-all text-sm"
                    />
                    <button className="absolute right-1 top-1 bottom-1 bg-[#FF181A] text-white rounded-full w-12 flex items-center justify-center hover:bg-[#D91416] transition-colors">
                        <Search size={18} />
                    </button>
                </div>

                {/* Action Icons */}
                <div className="flex items-center space-x-6 text-gray-700">
                    <Link href="/nalog" className="hidden md:flex flex-col items-center hover:text-[#FF181A] transition-colors group">
                        <User size={24} className="group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-medium mt-1">Nalog</span>
                    </Link>
                    <Link href="/korpa" className="flex flex-col items-center hover:text-[#FF181A] transition-colors relative group">
                        <div className="relative">
                            <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
                            <span className="absolute -top-2 -right-2 bg-[#FF181A] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                0
              </span>
                        </div>
                        <span className="text-xs font-medium mt-1 hidden md:block">Korpa</span>
                    </Link>
                </div>
            </div>

            {/* Mobile Search (Shows only on small screens) */}
            <div className="md:hidden px-4 pb-4 bg-white">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Pretraga..."
                        className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-12 outline-none focus:border-[#FF181A] text-sm"
                    />
                    <button className="absolute right-1 top-1 bottom-1 text-gray-500 rounded-full w-10 flex items-center justify-center">
                        <Search size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;