'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShieldCheck, Truck, ArrowLeft, Send, ShoppingBag } from 'lucide-react';
import {useCartStore} from "@/app/utils/store/useCartStore";
import {ICartItem} from "@/app/utils/models/CartItem";

export default function UnifiedCheckout() {
    const { items, addItem, removeItem } = useCartStore();
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 460;
    const total = subtotal + shipping;

    const cartDetails = items.map(i => `${i.name} (x${i.quantity}) - ${i.price * i.quantity} RSD`).join('\n');

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center font-sans">
                <ShoppingBag size={64} className="text-gray-100 mb-4" />
                <h2 className="text-xl font-black uppercase italic tracking-tighter">Vaša korpa je prazna</h2>
                <Link href="/" className="mt-4 text-[#FF181A] font-bold underline uppercase tracking-tighter">Nazad na prodavnicu</Link>
            </div>
        );
    }

    return (
        <main className="max-w-7xl mx-auto py-10 px-4 font-sans text-gray-900">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                <div className="lg:col-span-7">
                    <div className="mb-8">
                        <Link href="/" className="flex items-center text-gray-400 hover:text-black transition-colors text-xs font-black uppercase tracking-widest">
                            <ArrowLeft size={16} className="mr-2" /> Nazad na kupovinu
                        </Link>
                    </div>

                    <h1 className="text-3xl font-black uppercase tracking-tighter mb-10">
                        Završi <span className="text-[#FF181A]">Porudžbinu</span>
                    </h1>

                    <form
                        action="https://formspree.io/f/TVOJ_ID_OVDE"
                        method="POST"
                        className="space-y-8 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm"
                    >
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
                        <Field label="Email *" name="email" placeholder="vas@mejl.com" type="email" required/>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Napomena za kurira</label>
                            <textarea name="note" rows={3} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#FF181A] transition-all resize-none text-sm" placeholder="Npr. pozovite me pre dolaska..." />
                        </div>

                        <input type="hidden" name="_subject" value={`Nova porudžbina: ${total} RSD`} />
                        <input type="hidden" name="Sadržaj Korpe" value={cartDetails} />
                        <input type="hidden" name="Ukupno za naplatu" value={`${total} RSD`} />

                        <input type="hidden" name="_next" value="https://tvojsajt.com/hvala" />

                        <button
                            type="submit"
                            className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white py-6 rounded-4xl font-black text-2xl uppercase tracking-widest shadow-xl shadow-green-100 transition-all flex items-center justify-center gap-4 active:scale-95"
                        >
                            Potvrdi Porudžbinu <Send size={24} />
                        </button>

                        <p className="text-[10px] text-gray-400 font-bold text-center uppercase tracking-tighter italic">Plaćanje se vrši pouzećem prilikom preuzimanja pošiljke.</p>
                    </form>
                </div>

                {/* DESNA STRANA: PREGLED I EDITOVANJE KORPE */}
                <div className="lg:col-span-5">
                    <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-black uppercase mb-8 pb-4 border-b border-gray-200">Vaša Korpa</h2>

                        <div className="space-y-4 mb-8 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
                            {items.map((item: ICartItem) => (
                                <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100">
                                    <div className="relative w-20 h-20 shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                                        <Image src={item.image} alt={item.name} fill className="object-contain p-2" sizes="80px" />
                                    </div>
                                    <div className="grow">
                                        <h4 className="text-[11px] font-black uppercase leading-tight line-clamp-2 mb-1">{item.name}</h4>
                                        <p className="text-[#FF181A] font-black text-sm mb-2">{item.price.toLocaleString()} RSD</p>

                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                                                <button type="button" onClick={() => removeItem(item.id)} className="p-1 hover:bg-gray-50"><Minus size={12} /></button>
                                                <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                                                <button type="button" onClick={() => addItem({ ...item, quantity: 1 })} className="p-1 hover:bg-gray-50"><Plus size={12} /></button>
                                            </div>
                                            <button type="button" onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                    <div className="text-right font-black text-sm whitespace-nowrap">
                                        {(item.price * item.quantity).toLocaleString()} RSD
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-6 border-t-2 border-dashed border-gray-200">
                            <div className="flex justify-between text-xs font-black uppercase text-gray-500">
                                <span>Iznos:</span>
                                <span className="text-black">{subtotal.toLocaleString()} RSD</span>
                            </div>
                            <div className="flex justify-between text-xs font-black uppercase text-gray-500">
                                <span>Dostava:</span>
                                <span className={"text-black"}>
                                    {`${shipping} RSD`}
                                </span>
                            </div>
                            <div className="pt-6 flex justify-between items-baseline border-t border-gray-200 mt-4">
                                <span className="font-black text-lg uppercase tracking-tighter">UKUPNO:</span>
                                <span className="text-3xl font-black text-[#FF181A] tracking-tighter italic">
                                    {total.toLocaleString()} RSD
                                </span>
                            </div>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-[9px] font-black uppercase text-gray-400">
                                <ShieldCheck size={18} className="text-green-600" /> Sigurna kupovina
                            </div>
                            <div className="flex items-center gap-2 text-[9px] font-black uppercase text-gray-400">
                                <Truck size={18} className="text-green-600" /> Isporuka 24/48h
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}

interface FieldProps {
    label: string;
    name: string;
    placeholder: string;
    required?: boolean;
    type?: "text" | "email" | "tel" | "number";
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