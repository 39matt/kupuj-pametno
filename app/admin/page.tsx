'use client';

import React, { useState } from 'react';
import { addProduct } from './actions';
import { PackagePlus, Upload, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AdminDashboard() {
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });
    const [loading, setLoading] = useState(false);


    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const result = await addProduct(formData);
        setLoading(false);

        if (result.success) {
            setStatus({ type: 'success', msg: result.message });
            (document.getElementById('product-form') as HTMLFormElement).reset();
        } else {
            setStatus({ type: 'error', msg: result.message });
        }
    }

    return (
        <main className="max-w-4xl mx-auto py-12 px-4 font-sans">
            <div className="flex items-center gap-4 mb-10">
                <div className="bg-[#F5A623] p-3 rounded-2xl text-white shadow-lg shadow-orange-100">
                    <PackagePlus size={32} />
                </div>
                <h1 className="text-3xl font-black uppercase tracking-tighter text-gray-900">Novi Proizvod</h1>
            </div>

            {status.type && (
                <div className={`mb-8 p-5 rounded-4xl flex items-center gap-3 font-bold border ${
                    status.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
                }`}>
                    {status.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    {status.msg}
                </div>
            )}

            <form id="product-form" action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50">

                <div className="md:col-span-2 space-y-6">
                    <AdminField label="Naziv" name="name" placeholder="npr. Cetka-Cetka" required />
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Opis proizvoda</label>
                        <textarea name="description" rows={4} required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#F5A623] transition-all text-sm font-medium resize-none" placeholder="Opišite proizvod..." />
                    </div>
                </div>

                <div className="space-y-6">
                    <AdminField label="Cena (RSD)" name="price" type="number" placeholder="5000" required />
                    <AdminField label="Stara Cena (RSD)" name="oldPrice" type="number" placeholder="7500" required />
                    <AdminField label="Popust (%)" name="discountPercentage" type="number" placeholder="33" required />
                </div>

                <div className="space-y-6">
                    {/* FILE UPLOAD POLJE */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Slike proizvoda</label>
                        <div className="relative group">
                            <input
                                type="file"
                                name="images"
                                accept="image/*"
                                multiple
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="w-full p-8 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-2 group-hover:border-[#F5A623] transition-colors bg-gray-50">
                                <Upload size={24} className="text-gray-400 group-hover:text-[#F5A623]" />
                                <span className="text-[10px] font-black uppercase text-gray-400 group-hover:text-black">Klikni ili prevuci slike</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                        <input type="checkbox" name="isFeatured" id="isFeatured" className="w-5 h-5 accent-[#F5A623]" />
                        <label htmlFor="isFeatured" className="text-xs font-black uppercase text-gray-600 cursor-pointer select-none">Istaknuti proizvod</label>
                    </div>
                </div>

                <div className="md:col-span-2 pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white py-6 rounded-4xl font-black text-xl uppercase tracking-widest shadow-xl shadow-green-100 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                        {loading ? 'Učitavanje...' : <>Objavi Proizvod <Save size={24} /></>}
                    </button>
                </div>
            </form>
        </main>
    );
}

interface AdminFieldProps {
    label: string;
    name: string;
    placeholder: string;
    required?: boolean;
    type?: "text" | "number" | "email" | "password" | "tel";
}

function AdminField({
                        label,
                        name,
                        placeholder,
                        required = false,
                        type = "text"
                    }: AdminFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                {label}
            </label>
            <input
                type={type}
                name={name}
                required={required}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#F5A623] transition-all text-sm font-medium"
                placeholder={placeholder}
            />
        </div>
    );
}