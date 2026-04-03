'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';

export default function ThankYouPage() {
    return (
        <main className="min-h-[80vh] flex items-center justify-center px-4 font-sans text-gray-900">
            <div className="max-w-xl w-full text-center">
                {/* IKONA USPEHA */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-100 rounded-full scale-150 animate-pulse" />
                        <div className="relative bg-green-500 p-6 rounded-full text-white shadow-2xl">
                            <CheckCircle2 size={64} strokeWidth={2.5} />
                        </div>
                    </div>
                </div>

                {/* NASLOV I PORUKA */}
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                    Porudžbina Primljena!
                </h1>
                <p className="text-gray-500 font-medium text-lg mb-10 leading-relaxed">
                    Hvala vam na poverenju. Vaša porudžbina je uspešno zabeležena i naši operateri će vas uskoro kontaktirati radi potvrde.
                </p>

                {/* INFO KARTICE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
                    <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                        <Truck className="text-[#F5A623] mb-3" size={24} />
                        <h3 className="font-black uppercase text-[10px] tracking-widest text-gray-400 mb-1">Dostava</h3>
                        <p className="text-sm font-bold">24h - 48h (Radni dani)</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                        <ShoppingBag className="text-[#F5A623] mb-3" size={24} />
                        <h3 className="font-black uppercase text-[10px] tracking-widest text-gray-400 mb-1">Plaćanje</h3>
                        <p className="text-sm font-bold">Pouzećem (Gotovina)</p>
                    </div>
                </div>

                {/* DUGME ZA POVRATAK */}
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="bg-black text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
                    >
                        Nazad na Prodavnicu
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <p className="mt-12 text-[10px] font-bold uppercase text-gray-300 tracking-[0.2em]">
                    Kupuj Pametno &copy; 2026
                </p>
            </div>
        </main>
    );
}