'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { addProduct, deleteProduct, updateProduct } from './actions';
import { createClient } from '@/app/utils/supabase/client';
import {
    PackagePlus, Upload, Save, AlertCircle, CheckCircle2,
    Trash2, Package, Edit3, X, ShoppingCart, Clock, MapPin, Phone, Truck
} from 'lucide-react';
import Image from 'next/image';
import { IProduct } from "@/app/utils/models/IProduct";
import {updateOrderStatus} from "@/app/cart/actions";

interface OrderItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface Order {
    id: string;
    created_at: string;
    customer_name: string;
    customer_phone: string;
    address: string;
    city: string;
    zip_code: string;
    email: string;
    total_price: number;
    status: string;
    note?: string;
    items: OrderItem[]; // Ovde smo ubili 'any'
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
    const [products, setProducts] = useState<IProduct[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });
    const [loading, setLoading] = useState(false);
    const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
    const [imagesToKeep, setImagesToKeep] = useState<string[]>([]);

    const supabase = createClient();

    const getDiscountedTotal = (basePrice: number, quantity: number) => {
        if (quantity === 2) return Math.round(basePrice * 2 * 0.95);
        if (quantity >= 3) return Math.round(basePrice * quantity * 0.90);
        return basePrice * quantity;
    };

    const fetchData = useCallback(async () => {
        const { data: prodData } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        const { data: ordData } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (prodData) setProducts(prodData as IProduct[]);
        if (ordData) setOrders(ordData as Order[]); // Type cast na Order[]
    }, [supabase]);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                await fetchData();
            } catch (err: unknown) {
                console.error("Greška pri učitavanju dashboard-a:", err);
            }
        };

        loadDashboardData();
    }, [fetchData]);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);

        try {
            let result: { success: boolean; message: string };

            if (editingProduct) {
                // 1. Prvo dodaš stare slike u formData
                formData.append('existingImageUrls', imagesToKeep.join(','));

                // 2. Pozoveš funkciju sa TAČNO dva argumenta
                result = await updateProduct(editingProduct.id, formData);
            } else {
                result = await addProduct(formData);
            }

            setLoading(false);
            if (result.success) {
                setStatus({ type: 'success', msg: result.message });
                cancelEdit();
                fetchData();
            } else {
                setStatus({ type: 'error', msg: result.message });
            }
        } catch  {
            setLoading(false);
            setStatus({ type: 'error', msg: "Greška na serveru" });
        }

        setTimeout(() => setStatus({ type: null, msg: '' }), 5000);
    };

    const handleStatusChange = async (orderId: string, nextStatus: string) => {
        const res = await updateOrderStatus(orderId, nextStatus);
        if (res.success) {
            fetchData(); // Osvežava listu narudžbina
            setStatus({ type: 'success', msg: res.message });
        } else {
            setStatus({ type: 'error', msg: res.message });
        }
    };

    const startEdit = (product: IProduct) => {
        setEditingProduct(product);
        setImagesToKeep(product.imageUrls || []);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingProduct(null);
        setImagesToKeep([]);
        (document.getElementById('product-form') as HTMLFormElement)?.reset();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Obrisati proizvod?')) {
            const res = await deleteProduct(id);
            if (res.success) fetchData();
        }
    };

    return (
        <main className="max-w-7xl mx-auto py-12 px-4 font-sans text-gray-900">
            {/* --- HEADER & TABS --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Admin Panel</h1>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Upravljanje prodavnicom & Narudžbinama</p>
                </div>

                <div className="flex bg-gray-100 p-1.5 rounded-4xl border border-gray-200">
                    <TabBtn active={activeTab === 'products'} onClick={() => setActiveTab('products')} icon={<Package size={18}/>} label="Proizvodi" />
                    <TabBtn active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} icon={<ShoppingCart size={18}/>} label="Narudžbine" count={orders.length} />
                </div>
            </div>

            {/* --- ALERTS --- */}
            {status.type && (
                <div className={`mb-8 p-6 rounded-4xl flex items-center gap-4 font-black uppercase text-xs tracking-widest border animate-in fade-in slide-in-from-top-4 ${
                    status.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                    {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    {status.msg}
                </div>
            )}

            {/* --- CONTENT: PRODUCTS --- */}
            {activeTab === 'products' && (
                <div className="space-y-12">
                    {/* Form Section */}
                    <section className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="bg-[#F5A623] p-2 rounded-xl text-white">
                                {editingProduct ? <Edit3 size={20} /> : <PackagePlus size={20} />}
                            </div>
                            <h2 className="text-xl font-black uppercase tracking-tight">
                                {editingProduct ? 'Izmena proizvoda' : 'Dodaj novi proizvod'}
                            </h2>
                        </div>

                        <form id="product-form" action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2 space-y-6">
                                <AdminField label="Naziv" name="name" placeholder="npr. Četka-Četka" defaultValue={editingProduct?.name} required />
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Opis</label>
                                    <textarea name="description" rows={3} defaultValue={editingProduct?.description} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#F5A623] transition-all text-sm font-medium" required />
                                </div>
                            </div>
                            <AdminField label="Trenutna Cena" name="price" placeholder="1000" type="number" defaultValue={editingProduct?.price} required />
                            <AdminField label="Stara Cena" name="oldPrice" type="number" placeholder="1500" defaultValue={editingProduct?.oldPrice} required />
                            <AdminField label="Popust %" name="discountPercentage" placeholder="33" type="number" defaultValue={editingProduct?.discountPercentage} required />

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Slike</label>
                                <div className="relative group h-32">
                                    <input type="file" name="images" accept="image/*" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                    <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center bg-gray-50 group-hover:border-[#F5A623] transition-all">
                                        <Upload size={20} className="text-gray-400 mb-2"/>
                                        <span className="text-[9px] font-black uppercase text-gray-400">Klikni za upload</span>
                                    </div>
                                </div>
                                {editingProduct && imagesToKeep.length > 0 && (
                                    <div className="flex gap-2 overflow-x-auto py-2">
                                        {imagesToKeep.map(url => (
                                            <div key={url} className="relative w-12 h-12 shrink-0 rounded-lg border overflow-hidden group">
                                                <Image src={url} alt="old" fill className="object-cover" />
                                                <button type="button" onClick={() => setImagesToKeep(prev => prev.filter(u => u !== url))} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><X size={12}/></button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="md:col-span-2 flex items-center justify-between pt-6 border-t border-gray-50">
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" name="isFeatured" id="isFeatured" defaultChecked={editingProduct?.isFeatured} className="w-5 h-5 accent-[#F5A623]" />
                                    <label htmlFor="isFeatured" className="text-xs font-black uppercase text-gray-500 cursor-pointer">Istaknut proizvod</label>
                                </div>
                                <div className="flex gap-4">
                                    {editingProduct && (
                                        <button type="button" onClick={cancelEdit} className="px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest bg-gray-100 hover:bg-gray-200 transition-all text-gray-500">Otkaži</button>
                                    )}
                                    <button type="submit" disabled={loading} className="px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest bg-[#4CAF50] text-white shadow-xl shadow-green-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50">
                                        {loading ? 'Slanje...' : <>{editingProduct ? 'Sačuvaj' : 'Objavi'} <Save size={18}/></>}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </section>

                    {/* Table Section */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                            <h3 className="font-black uppercase tracking-tighter text-lg">Inventar</h3>
                            <span className="bg-black text-white text-[10px] font-black px-3 py-1 rounded-full">{products.length}</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                <tr>
                                    <th className="p-6">Proizvod</th>
                                    <th className="p-6">Cena</th>
                                    <th className="p-6">Status</th>
                                    <th className="p-6 text-right">Akcije</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                {products.map(p => (
                                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 relative rounded-lg border bg-gray-50 overflow-hidden shrink-0">
                                                    {p.imageUrls?.[0] && <Image src={p.imageUrls[0]} alt="" fill className="object-contain p-1" />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm uppercase tracking-tight">{p.name}</p>
                                                    <p className="text-[10px] text-gray-400 line-clamp-1">{p.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 font-black text-sm text-[#FF181A]">{p.price.toLocaleString()} RSD</td>
                                        <td className="p-6">
                                            {p.isFeatured ? <span className="text-[9px] font-black uppercase bg-green-100 text-green-600 px-2 py-1 rounded">Istaknut</span> : <span className="text-[9px] font-black uppercase text-gray-300">Standard</span>}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => startEdit(p)} className="p-2.5 bg-gray-100 rounded-xl hover:bg-black hover:text-white transition-all"><Edit3 size={16}/></button>
                                                <button onClick={() => handleDelete(p.id)} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* --- CONTENT: ORDERS --- */}
            {activeTab === 'orders' && (
                <div className="grid grid-cols-1 gap-8">
                    {orders.length === 0 ? (
                        <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-100">
                            <ShoppingCart size={48} className="mx-auto text-gray-200 mb-4" />
                            <p className="font-black uppercase text-gray-300 tracking-widest text-xs">Trenutno nema narudžbina</p>
                        </div>
                    ) : (
                        orders.map(order => (
                            <div key={order.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl transition-all p-2 md:p-4 group">
                                <div className="flex flex-col lg:flex-row gap-4">

                                    {/* 1. STATUS I VREME (Leva strana/Top) */}
                                    <div className="lg:w-64 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-50 bg-gray-50/50 rounded-4xl">
                                        <div>
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4">
                                                <Clock size={14} className="text-[#F5A623]"/>
                                                {new Date(order.created_at).toLocaleDateString('sr-RS')}
                                            </div>
                                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                                                order.status === 'novo'
                                                    ? 'bg-orange-500 text-white animate-pulse'
                                                    : 'bg-green-500 text-white'
                                            }`}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                                {order.status}
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">ID Narudžbine</p>
                                            <p className="text-[11px] font-mono font-bold text-gray-600">#{order.id.slice(0, 8).toUpperCase()}</p>
                                        </div>
                                    </div>

                                    {/* 2. KUPAC INFO (Sredina) */}
                                    <div className="flex-[1.5] p-6 space-y-6">
                                        <div>
                                            <h3 className="text-2xl font-black uppercase tracking-tighter text-black mb-4">
                                                {order.customer_name}
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                                                    <div className="p-2 bg-white rounded-lg shadow-sm text-[#F5A623]"><Phone size={16}/></div>
                                                    <span className="text-sm font-black tabular-nums">{order.customer_phone}</span>
                                                </div>
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                                                    <div className="p-2 bg-white rounded-lg shadow-sm text-[#F5A623]"><MapPin size={16}/></div>
                                                    <span className="text-sm font-bold truncate">{order.city}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50">
                                            <p className="text-[10px] font-black uppercase text-orange-400 tracking-widest mb-1">Adresa za dostavu</p>
                                            <p className="text-sm font-bold text-gray-700">{order.address}, {order.zip_code} {order.city}</p>
                                        </div>
                                    </div>

                                    {/* 3. ARTIKLI I CENA (Desna strana) */}
                                    <div className="flex-1 p-6 bg-black rounded-4xl text-white flex flex-col justify-between">
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-4">Sadržaj korpe</p>
                                            <div className="space-y-3 max-h-32 overflow-y-auto custom-scrollbar pr-2">
                                                {order.items.map((item: OrderItem, idx: number) => (
                                                    <div key={idx} className="flex justify-between items-start text-xs font-bold border-b border-white/10 pb-2">
                                            <span className="leading-tight pr-4">
                                                <span className="text-[#F5A623] mr-2">x{item.quantity}</span>
                                                {item.name}
                                            </span>
                                                        <span className="text-gray-400 whitespace-nowrap">
                                                {getDiscountedTotal(item.price, item.quantity).toLocaleString()} RSD
                                            </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-white/20">
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Za naplatu</p>
                                                    <p className="text-2xl font-black text-[#F5A623] tracking-tighter italic">
                                                        {order.total_price.toLocaleString()} <span className="text-xs uppercase not-italic">RSD</span>
                                                    </p>
                                                </div>
                                                {/* Action Buttons u Orders sekciji */}
                                                <div className="flex md:flex-col justify-end gap-3 min-w-35">
                                                    {order.status === 'novo' && (
                                                        <button
                                                            onClick={() => handleStatusChange(order.id, 'poslato')}
                                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                                                        >
                                                            <Truck size={16} /> Poslato
                                                        </button>
                                                    )}

                                                    {order.status === 'poslato' && (
                                                        <button
                                                            onClick={() => handleStatusChange(order.id, 'dostavljeno')}
                                                            className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-green-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                                                        >
                                                            <CheckCircle2 size={16} /> Dostavljeno
                                                        </button>
                                                    )}

                                                    {/* Opciono: Dugme za otkazivanje/brisanje ako je novo */}
                                                    {order.status === 'novo' && (
                                                        <button
                                                            onClick={() => { if(confirm('Otkazati?')) handleStatusChange(order.id, 'otkazano') }}
                                                            className="w-full bg-gray-100 hover:bg-red-500 hover:text-white text-gray-400 p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95"
                                                        >
                                                            Otkaži
                                                        </button>
                                                    )}

                                                    {/* Vizuelni indikator za završene narudžbine */}
                                                    {order.status === 'dostavljeno' && (
                                                        <div className="w-full bg-gray-50 text-gray-300 p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-dashed border-gray-200 text-center">
                                                            Završeno
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </main>
    );
}

// --- SUB-COMPONENTS ---
function TabBtn({ active, onClick, icon, label, count }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, count?: number }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-8 py-3 rounded-[1.8rem] text-xs font-black uppercase tracking-widest transition-all ${
                active ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-black'
            }`}
        >
            {icon}
            {label}
            {count !== undefined && <span className={`ml-1 px-2 py-0.5 rounded-full text-[9px] ${active ? 'bg-black text-white' : 'bg-gray-200'}`}>{count}</span>}
        </button>
    );
}

interface AdminFieldProps {
    label: string;
    name: string;
    placeholder: string;
    required?: boolean;
    type?: "text" | "number" | "email" | "tel";
    defaultValue?: string | number;
}

function AdminField({
                        label,
                        name,
                        placeholder,
                        required = false,
                        type = "text",
                        defaultValue
                    }: AdminFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">
                {label}
            </label>
            <input
                key={defaultValue} // Ključno: resetuje input kada se promeni editingProduct
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