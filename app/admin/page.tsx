'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { addProduct, deleteProduct, updateProduct } from './actions';
import { createClient } from '@/app/utils/supabase/client';
import { PackagePlus, Upload, Save, AlertCircle, CheckCircle2, Trash2, Package, Edit3, X } from 'lucide-react';
import Image from 'next/image';
import {IProduct} from "@/app/utils/models/IProduct";

interface AdminFieldProps {
    label: string;
    name: string;
    placeholder: string;
    required?: boolean;
    type?: "text" | "number" | "email";
    defaultValue?: string | number;
}

export default function AdminDashboard() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });
    const [loading, setLoading] = useState(false);

    const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
    const [imagesToKeep, setImagesToKeep] = useState<string[]>([]);

    const supabase = createClient();

    const fetchProducts = useCallback(async () => {
        const { data } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setProducts(data as IProduct[]);
    }, [supabase]);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await fetchProducts();
            } catch (error: unknown) {
                console.error("Greška pri inicijalnom učitavanju:", error);
            }
        };

        loadInitialData();
    }, [fetchProducts]);

    const startEdit = (product: IProduct) => {
        setEditingProduct(product);
        setImagesToKeep(product.imageUrls || []);
        setStatus({ type: null, msg: '' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingProduct(null);
        setImagesToKeep([]);
        (document.getElementById('product-form') as HTMLFormElement).reset();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Da li ste sigurni da želite da obrišete ovaj proizvod?')) {
            const res = await deleteProduct(id);
            if (res.success) {
                if (editingProduct?.id === id) cancelEdit();
                fetchProducts();
            }
        }
    };

    async function handleSubmit(formData: FormData) {
        setLoading(true);

        let result: { success: boolean; message: string };

        if (editingProduct) {
            formData.append('existingImageUrls', imagesToKeep.join(','));
            result = await updateProduct(editingProduct.id, formData);
        } else {
            result = await addProduct(formData);
        }

        setLoading(false);

        if (result.success) {
            setStatus({ type: 'success', msg: result.message });
            if (editingProduct) cancelEdit();
            else (document.getElementById('product-form') as HTMLFormElement).reset();
            fetchProducts();
        } else {
            setStatus({ type: 'error', msg: result.message });
        }
        setTimeout(() => setStatus({ type: null, msg: '' }), 5000);
    }

    return (
        <main className="max-w-6xl mx-auto py-12 px-4 font-sans text-gray-900">
            <div className="flex items-center gap-4 mb-10">
                <div className="bg-[#F5A623] p-3 rounded-2xl text-white shadow-lg">
                    {editingProduct ? <Edit3 size={32} /> : <PackagePlus size={32} />}
                </div>
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">
                        {editingProduct ? 'Izmeni Proizvod' : 'Novi Proizvod'}
                    </h1>
                    {editingProduct && (
                        <button onClick={cancelEdit} className="text-[10px] font-black text-red-500 uppercase flex items-center gap-1 mt-1">
                            <X size={12} /> Otkaži izmenu
                        </button>
                    )}
                </div>
            </div>

            {status.type && (
                <div className={`mb-8 p-5 rounded-3xl flex items-center gap-3 font-bold border transition-all ${
                    status.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
                }`}>
                    {status.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    {status.msg}
                </div>
            )}

            <form id="product-form" action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50">
                <div className="md:col-span-2 space-y-6">
                    <AdminField
                        label="Naziv Proizvoda"
                        name="name"
                        placeholder="npr. Cetka-Cetka"
                        required
                        defaultValue={editingProduct?.name}
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Opis</label>
                        <textarea
                            key={editingProduct?.description}
                            name="description"
                            rows={4}
                            required
                            defaultValue={editingProduct?.description}
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#F5A623] transition-all text-sm font-medium resize-none"
                            placeholder="Opišite proizvod..."
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <AdminField label="Cena (RSD)" name="price" type="number" placeholder="5000" required defaultValue={editingProduct?.price} />
                    <AdminField label="Stara Cena (RSD)" name="oldPrice" type="number" placeholder="7500" required defaultValue={editingProduct?.oldPrice} />
                    <AdminField label="Popust (%)" name="discountPercentage" type="number" placeholder="33" required defaultValue={editingProduct?.discountPercentage} />
                </div>

                <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Slike (Upload)</label>

                        {/* Prikaz slika za čuvanje tokom edita */}
                        {editingProduct && imagesToKeep.length > 0 && (
                            <div className="flex gap-2 mb-2 overflow-x-auto p-2 bg-gray-50 rounded-xl">
                                {imagesToKeep.map(url => (
                                    <div key={url} className="relative w-12 h-12 shrink-0 group">
                                        <Image src={url} alt="old" fill className="object-cover rounded-lg border" />
                                        <button
                                            type="button"
                                            onClick={() => setImagesToKeep(prev => prev.filter(u => u !== url))}
                                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={10} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="relative group h-32">
                            <input type="file" name="images" accept="image/*" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            <div className="w-full h-full p-4 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-2 group-hover:border-[#F5A623] transition-colors bg-gray-50">
                                <Upload size={20} className="text-gray-400 group-hover:text-[#F5A623]" />
                                <span className="text-[9px] font-black uppercase text-gray-400 text-center">
                                    {editingProduct ? 'Dodaj još slika (opciono)' : 'Klikni ili prevuci slike'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            id="isFeatured"
                            key={editingProduct?.id}
                            defaultChecked={editingProduct?.isFeatured}
                            className="w-5 h-5 accent-[#F5A623]"
                        />
                        <label htmlFor="isFeatured" className="text-xs font-black uppercase text-gray-600 cursor-pointer select-none">Istaknut na početnoj</label>
                    </div>
                </div>

                <div className="md:col-span-2 pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white py-6 rounded-4xl font-black text-xl uppercase tracking-widest shadow-xl transition-all active:scale-95 disabled:bg-gray-100 flex items-center justify-center gap-3"
                    >
                        {loading ? (
                            'Učitavanje...'
                        ) : editingProduct ? (
                            <>
                                <span>Sačuvaj Izmene</span>
                                <Save size={24} />
                            </>
                        ) : (
                            <>
                                <span>Objavi Proizvod</span>
                                <Save size={24} />
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* TABELA PROIZVODA */}
            <div className="mt-24">
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-black p-3 rounded-2xl text-white">
                        <Package size={24} />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter">Lista Proizvoda ({products.length})</h2>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Slika & Naziv</th>
                                <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Opis</th>
                                <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Cena (Trenutna / Stara)</th>
                                <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Popust</th>
                                <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</th>
                                <th className="p-6 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Akcije</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                            {products.map((product) => (
                                <tr key={product.id} className={`hover:bg-gray-50/50 transition-colors group ${editingProduct?.id === product.id ? 'bg-orange-50' : ''}`}>
                                    {/* Slika i Naziv */}
                                    <td className="p-6">
                                        <div className="flex items-center gap-4 min-w-50">
                                            <div className="relative w-14 h-14 bg-gray-100 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                                                {product.imageUrls?.[0] && (
                                                    <Image src={product.imageUrls[0]} alt={product.name} fill className="object-contain p-1" sizes="56px" />
                                                )}
                                            </div>
                                            <span className="font-bold text-sm uppercase tracking-tight">{product.name}</span>
                                        </div>
                                    </td>

                                    {/* Opis */}
                                    <td className="p-6">
                                        <p className="text-xs text-gray-500 line-clamp-2 max-w-62.5 leading-relaxed">
                                            {product.description}
                                        </p>
                                    </td>

                                    {/* Cena */}
                                    <td className="p-6 whitespace-nowrap">
                                        <div className="flex flex-col">
                                    <span className="font-black text-sm text-[#FF181A] tabular-nums">
                                        {product.price.toLocaleString()} RSD
                                    </span>
                                            <span className="text-[10px] text-gray-400 line-through font-bold tabular-nums">
                                        {product.oldPrice.toLocaleString()} RSD
                                    </span>
                                        </div>
                                    </td>

                                    {/* Popust */}
                                    <td className="p-6">
                                <span className="bg-orange-100 text-[#F5A623] text-[10px] font-black px-2 py-1 rounded-md">
                                    -{product.discountPercentage}%
                                </span>
                                    </td>

                                    {/* Featured Status */}
                                    <td className="p-6">
                                        {product.isFeatured ? (
                                            <span className="flex items-center gap-1 text-[10px] font-black uppercase text-green-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                                        Istaknut
                                    </span>
                                        ) : (
                                            <span className="text-[10px] font-black uppercase text-gray-300">
                                        Standard
                                    </span>
                                        )}
                                    </td>

                                    {/* Akcije */}
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => startEdit(product)}
                                                className={`p-3 rounded-xl transition-all ${editingProduct?.id === product.id ? 'bg-[#F5A623] text-white shadow-lg shadow-orange-200' : 'bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-600'}`}
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-3 bg-red-50 hover:bg-red-500 rounded-xl transition-all text-red-500 hover:text-white"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {products.length === 0 && (
                        <div className="p-20 text-center text-gray-300 font-bold uppercase tracking-widest text-xs italic">
                            Nema dodatih proizvoda u bazi.
                        </div>
                    )}
                </div>
            </div>        </main>
    );
}

function AdminField({ label, name, placeholder, required = false, type = "text", defaultValue }: AdminFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">{label}</label>
            <input
                key={defaultValue} // Forsira re-render kada se prebaciš na edit drugog proizvoda
                type={type}
                name={name}
                required={required}
                defaultValue={defaultValue}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#F5A623] focus:bg-white transition-all text-sm font-medium"
                placeholder={placeholder}
            />
        </div>
    );
}