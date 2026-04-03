'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import {useCartStore} from "@/app/utils/store/useCartStore";
import {ICartItem} from "@/app/utils/models/CartItem";

export default function CartList() {
    const { items, addItem, removeItem, clearCart } = useCartStore();

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 460;
    const total = subtotal + shipping;

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
                <div className="bg-gray-50 p-10 rounded-full mb-8">
                    <ShoppingBag size={80} className="text-gray-200" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Vaša korpa je trenutno prazna</h2>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">Dodajte proizvode u korpu kako biste nastavili sa kupovinom.</p>
                <Link
                    href="/"
                    className="bg-[#FF181A] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-red-100 active:scale-95"
                >
                    Počni kupovinu
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* LEVA STRANA: LISTA ARTIKALA */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex flex-col gap-4">
                    {items.map((item: ICartItem) => (
                        <div
                            key={item.id}
                            className="group relative flex flex-col sm:flex-row items-center gap-6 p-5 border border-gray-100 rounded-4xl bg-white shadow-sm hover:shadow-md transition-all"
                        >
                            {/* Slika Proizvoda */}
                            <div className="relative w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-50">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-contain p-3"
                                    sizes="128px"
                                />
                            </div>

                            {/* Detalji i Kontrole */}
                            <div className="grow flex flex-col gap-1 text-center sm:text-left">
                                <h3 className="font-extrabold text-lg leading-tight uppercase tracking-tight line-clamp-2 pr-4">
                                    {item.name}
                                </h3>
                                <p className="text-[#FF181A] font-black text-xl mb-3">
                                    {item.price.toLocaleString()} RSD
                                </p>

                                <div className="flex items-center justify-center sm:justify-start gap-6">
                                    {/* +/- Kontrole */}
                                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors text-gray-400 hover:text-black"
                                        >
                                            <Minus size={18} />
                                        </button>
                                        <span className="w-12 text-center font-black text-base">{item.quantity}</span>
                                        <button
                                            onClick={() => addItem({ ...item, quantity: 1 })}
                                            className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors text-[#FF181A]"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>

                                    {/* Brisanje artikla (skroz) */}
                                    <button
                                        onClick={() => {
                                            // Možeš dodati funkciju deleteItem u store ako želiš skroz da obrišeš jednim klikom
                                            // Za sada removeItem smanjuje do 0 što takođe briše
                                            removeItem(item.id);
                                        }}
                                        className="text-gray-300 hover:text-red-500 transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest"
                                    >
                                        <Trash2 size={16} /> Ukloni
                                    </button>
                                </div>
                            </div>

                            {/* Cena za ceo red */}
                            <div className="sm:border-l border-gray-100 sm:pl-8 text-right hidden sm:block">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Ukupno</p>
                                <p className="font-black text-xl tabular-nums">
                                    {(item.price * item.quantity).toLocaleString()} RSD
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={clearCart}
                    className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-600 transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
                >
                    <Trash2 size={14} /> Isprazni celu korpu
                </button>
            </div>

            {/* DESNA STRANA: SUMA I PLAĆANJE */}
            <div className="lg:col-span-1 lg:sticky lg:top-28">
                <div className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-50 shadow-xl shadow-gray-100/50">
                    <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 pb-4 border-b-2 border-gray-50 flex items-center justify-between">
                        Suma <span className="text-sm font-bold text-gray-400">{items.length} stavke</span>
                    </h2>

                    <div className="space-y-5 mb-10">
                        <div className="flex justify-between text-gray-500 font-bold text-sm uppercase tracking-tight">
                            <span>Artikli:</span>
                            <span className="text-black">{subtotal.toLocaleString()} RSD</span>
                        </div>
                        <div className="flex justify-between text-gray-500 font-bold text-sm uppercase tracking-tight items-center">
                            <span>Dostava:</span>
                                <span className="text-black">{shipping} RSD</span>
                        </div>

                        {subtotal < 5000 && (
                            <div className="p-3 bg-blue-50 rounded-xl text-[10px] text-blue-700 font-bold leading-relaxed border border-blue-100/50">
                                💡 Dodajte još <span className="underline">{(5000 - subtotal).toLocaleString()} RSD</span> za besplatnu dostavu!
                            </div>
                        )}

                        <div className="pt-6 border-t-2 border-gray-50 flex flex-col gap-1">
                            <div className="flex justify-between items-baseline">
                                <span className="font-black text-lg uppercase tracking-tighter">Ukupno:</span>
                                <span className="text-4xl font-black text-[#FF181A] tracking-[ -0.05em] tabular-nums">
                                    {total.toLocaleString()} RSD
                                </span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold text-right uppercase tracking-widest mt-1">PDV uključen u cenu</p>
                        </div>
                    </div>

                    <Link
                        href="/naplata"
                        className="group w-full bg-[#4CAF50] hover:bg-[#45a049] text-white flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-xl uppercase tracking-widest transition-all shadow-xl shadow-green-200 active:scale-[0.97]"
                    >
                        Plaćanje <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* Trust bedževi u korpi */}
                    <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
                        <div className="flex items-center gap-4 text-gray-400">
                            <ShieldCheck size={28} className="text-green-600 shrink-0" />
                            <div className="flex flex-col leading-none">
                                <span className="text-[10px] font-black uppercase text-black">Sigurna Kupovina</span>
                                <span className="text-[9px] font-bold">100% šifrovani podaci</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400">
                            <Truck size={28} className="text-green-600 shrink-0" />
                            <div className="flex flex-col leading-none">
                                <span className="text-[10px] font-black uppercase text-black">Brza Isporuka</span>
                                <span className="text-[9px] font-bold">Na vašoj adresi za 24/48h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}