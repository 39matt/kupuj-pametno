import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CheckoutClient from "@/app/cart/components/CheckoutClient";

export default function UnifiedCheckoutPage() {
    return (
        <main className="max-w-7xl mx-auto py-10 px-4 font-sans text-gray-900">
            <div className="mb-8">
                <Link href="/" className="flex items-center text-gray-400 hover:text-black transition-colors text-xs font-black uppercase tracking-widest">
                    <ArrowLeft size={16} className="mr-2" /> Nazad na prodavnicu
                </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-10">
                Završi <span className="text-[#FF181A]">Porudžbinu</span>
            </h1>

            <CheckoutClient />
        </main>
    );
}