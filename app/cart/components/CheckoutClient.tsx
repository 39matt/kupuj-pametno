'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus, Send, ShoppingBag, Loader2 } from 'lucide-react';
import { useCartStore } from "@/app/utils/store/useCartStore";
import { ICartItem } from "@/app/utils/models/CartItem";
import {createOrder} from "@/app/cart/actions";

export default function CheckoutClient() {
    const { items, addItem, removeItem, clearCart } = useCartStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getDiscountedTotal = (basePrice: number, quantity: number) => {
        if (quantity === 2) return Math.round(basePrice * 2 * 0.95);
        if (quantity >= 3) return Math.round(basePrice * quantity * 0.90);
        return basePrice * quantity;
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 min-h-[60vh]">
                <ShoppingBag size={64} className="text-gray-100 mb-4" />
                <h2 className="text-xl font-black uppercase tracking-tighter italic">Vaša korpa je prazna</h2>
                <Link href="/" className="mt-4 text-[#FF181A] font-bold underline uppercase tracking-tighter hover:text-black transition-colors">
                    Nazad na prodavnicu
                </Link>
            </div>
        );
    }

    const subtotal = items.reduce((acc, item) => acc + getDiscountedTotal(item.price, item.quantity), 0);
    const shipping = 460;
    const total = subtotal + shipping;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        const fd = new FormData(e.currentTarget);

        const formDataObj = {
            full_name: fd.get('full_name') as string,
            phone: fd.get('phone') as string,
            city: fd.get('city') as string,
            zip_code: fd.get('zip_code') as string,
            address: fd.get('address') as string,
            email: fd.get('email') as string,
            note: fd.get('note') as string,
        };

        try {
            const result = await createOrder(formDataObj, items, total - shipping);

            if (result.success) {
                clearCart();
                window.location.href = '/hvala';
            } else {
                alert("Greška: " + result.message);
            }
        } catch (error) {
            alert("Došlo je do neočekivane greške pri slanju porudžbine.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start max-w-7xl mx-auto px-4 py-10">
            {/* LEVA STRANA - FORMA */}
            <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm shadow-gray-200/50">
                    <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">Informacije za dostavu</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="Ime i Prezime *" name="full_name" placeholder="Marko Marković" required />
                        <Field label="Broj Telefona *" name="phone" placeholder="06x xxx xxxx" required type="tel" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <Field label="Grad *" name="city" placeholder="Beograd" required />
                        </div>
                        <Field label="Poštanski broj *" name="zip_code" placeholder="11000" required />
                    </div>

                    <Field label="Adresa i broj *" name="address" placeholder="Beogradska 19" required />
                    <Field label="Email *" name="email" placeholder="vas@mejl.com" type="email" required />

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Napomena za kurira</label>
                        <textarea
                            name="note"
                            rows={3}
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF181A] focus:bg-white transition-all resize-none text-sm font-medium"
                            placeholder="Opciono (npr. interfon, sprat...)"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white py-6 rounded-4xl font-black text-xl md:text-2xl uppercase tracking-widest shadow-xl shadow-green-100 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:bg-gray-200 disabled:shadow-none"
                    >
                        {isSubmitting ? (
                            <>Učitavanje... <Loader2 className="animate-spin" size={24} /></>
                        ) : (
                            <>Završi Porudžbinu <Send size={24} /></>
                        )}
                    </button>

                    <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Plaćanje se vrši pouzećem (gotovinom prilikom preuzimanja)
                    </p>
                </form>
            </div>

            {/* DESNA STRANA - PREGLED KORPE */}
            <div className="lg:col-span-5 lg:sticky lg:top-10">
                <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                    <h2 className="text-xl font-black uppercase mb-8 pb-4 border-b border-gray-200 flex items-center gap-2">
                        <ShoppingBag size={20} /> Vaša Korpa
                    </h2>

                    <div className="space-y-4 mb-8 max-h-112.5 overflow-y-auto pr-2 custom-scrollbar">
                        {items.map((item: ICartItem) => {
                            const discountedTotal = getDiscountedTotal(item.price, item.quantity);
                            return (
                                <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="relative w-20 h-20 shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                                        <Image src={item.image} alt={item.name} fill className="object-contain p-2" sizes="80px" />
                                    </div>
                                    <div className="grow min-w-0">
                                        <h4 className="text-[11px] font-black uppercase leading-tight line-clamp-2 mb-1">{item.name}</h4>
                                        <p className="text-[#FF181A] font-black text-sm mb-2">{item.price.toLocaleString()} RSD</p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                                                <button type="button" onClick={() => removeItem(item.id)} className="p-1.5 hover:bg-gray-50 transition-colors text-gray-400 hover:text-black">
                                                    <Minus size={12} />
                                                </button>
                                                <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                                                <button type="button" onClick={() => addItem({ ...item, quantity: 1 })} className="p-1.5 hover:bg-gray-50 transition-colors text-gray-400 hover:text-black">
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right font-black text-sm whitespace-nowrap tabular-nums">
                                        {discountedTotal.toLocaleString()} RSD
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="space-y-4 pt-6 border-t-2 border-dashed border-gray-200">
                        <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 tracking-widest">
                            <span>Suma artikala:</span>
                            <span className="text-black tabular-nums">{subtotal.toLocaleString()} RSD</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 tracking-widest">
                            <span>Troškovi dostave:</span>
                            <span className="text-black tabular-nums">{shipping} RSD</span>
                        </div>
                        <div className="pt-6 flex justify-between items-baseline border-t border-gray-200 mt-4">
                            <span className="font-black text-lg uppercase tracking-tighter">UKUPNO:</span>
                            <span className="text-3xl font-black text-[#FF181A] tracking-tighter italic tabular-nums">
                                {total.toLocaleString()} RSD
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface FieldProps {
    label: string;
    name: string;
    placeholder: string;
    required?: boolean;
    type?: string;
}

function Field({ label, name, placeholder, required = false, type = "text" }: FieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">{label}</label>
            <input
                type={type}
                name={name}
                required={required}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF181A] focus:bg-white transition-all text-sm font-medium"
                placeholder={placeholder}
            />
        </div>
    );
}