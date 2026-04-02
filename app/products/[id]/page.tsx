import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star, Check, Truck, ShieldCheck } from 'lucide-react';
import {createClient} from "@/app/utils/supabase/server";
import ProductCard from "@/app/components/ProductCard";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const supabase = await createClient();

    // 1. Fetch the main product
    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !product) {
        notFound();
    }

    // 2. Fetch related products (e.g., getting 4 random or newest products)
    const { data: relatedProducts } = await supabase
        .from('products')
        .select('*')
        .neq('id', id)
        .limit(4);

    return (
        <main className="max-w-6xl mx-auto py-10 px-4 font-sans text-gray-900 bg-white">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">

                <div className="flex flex-col gap-4">
                    <div className="relative aspect-4/3 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                        <Image
                            src={product.imageUrls?.[0] || 'https://placehold.co/800x600/ffffff/a1a1aa?text=No+Image'}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                            className="object-contain p-4"
                        />
                    </div>
                    {product.imageUrls?.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {product.imageUrls.slice(0, 4).map((url: string, index: number) => (
                                <div key={index} className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 cursor-pointer hover:border-gray-400 transition-colors">
                                    <Image src={url} alt={`Slika ${index + 1}`} fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw" className="object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-start pt-2">

                    <div className="flex items-center gap-1 text-yellow-400 mb-3">
                        <Star fill="currentColor" size={18} />
                        <Star fill="currentColor" size={18} />
                        <Star fill="currentColor" size={18} />
                        <Star fill="currentColor" size={18} />
                        <Star fill="currentColor" size={18} />
                        <span className="text-gray-500 text-sm ml-2">(24 ocene)</span>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
                        {product.name}
                    </h1>

                    <div className="flex flex-col gap-2 mb-6 text-sm">
                        <div className="flex items-center text-green-600 font-bold bg-green-50 w-max px-3 py-1 rounded-md">
                            <Check size={16} className="mr-1" strokeWidth={3} />
                            Na stanju - Spremno za slanje
                        </div>
                        <div className="flex items-center text-gray-600 mt-2">
                            <Truck size={18} className="mr-2 text-gray-400" />
                            Isporuka za 1-3 radna dana
                        </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 mb-8">
                        <div className="text-gray-500 line-through text-lg font-bold mb-1">
                            {product.oldPrice} RSD
                        </div>
                        <div className="text-[#FF181A] text-4xl font-black tracking-tight">
                            {product.price} RSD
                        </div>
                    </div>

                    {/* Dugme za korpu */}
                    <button className="bg-[#4CAF50] hover:bg-[#45a049] text-white text-lg font-bold py-4 px-8 rounded-xl transition-colors shadow-lg shadow-green-200 w-full mb-6">
                        DODAJ U KORPU
                    </button>

                    {/* Trust badges */}
                    <div className="flex items-center justify-center gap-6 py-4 border-t border-gray-100 text-gray-500 text-sm">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={20} className="text-green-600" />
                            Sigurna kupovina
                        </div>
                        <div className="flex items-center gap-2">
                            <Check size={20} className="text-green-600" />
                            Garancija kvaliteta
                        </div>
                    </div>
                </div>
            </div>

            {/* --- FULL WIDTH DESCRIPTION SECTION --- */}
            {/* Ovde smo promenili dizajn tako da slike i tekst idu preko celog ekrana umesto sa strane */}
            <div className="border-t border-gray-200 pt-16 mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">Detaljan opis proizvoda</h2>

                <div className="max-w-4xl mx-auto space-y-16">
                    {/* Primer bloka punog formata (Tekst iznad, velika slika ispod) */}
                    <div className="flex flex-col items-center text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Inteligentno punjenje i zaštita</h3>
                        <p className="text-justify text-gray-600 text-lg whitespace-pre-wrap leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="relative w-full aspect-21/9 rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                            <Image
                                src={product.imageUrls?.[1] || product.image_urls?.[0] || 'https://placehold.co/1200x500/ffffff/a1a1aa?text=Slika+Detalja+1'}
                                alt="Detalj proizvoda 1"
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- REVIEWS SECTION --- */}
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-20 border border-gray-100">
                <h2 className="text-2xl font-bold text-center mb-10">Šta kažu naši kupci</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Hardcoded reviews for design, you can make a table for this later */}
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white p-6 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-1 text-yellow-400 mb-3">
                                <Star fill="currentColor" size={14} />
                                <Star fill="currentColor" size={14} />
                                <Star fill="currentColor" size={14} />
                                <Star fill="currentColor" size={14} />
                                <Star fill="currentColor" size={14} />
                            </div>
                            <h4 className="font-bold mb-2">Odličan uređaj!</h4>
                            <p className="text-gray-600 text-sm mb-4">Spasio mi je akumulator koji je stajao prazan mesecima. Funkcija repair stvarno radi posao. Preporuka za svakog vozača.</p>
                            <span className="text-gray-400 text-xs font-medium">Marko M. - Pre 2 dana</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- RELATED PRODUCTS --- */}
            <div>
                <h2 className="text-2xl font-bold text-center mb-8">Možda će vas zanimati i ovo</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {relatedProducts?.map((item) => (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            imageUrl={item.imageUrls?.[0] || 'https://placehold.co/500x500/ffffff/a1a1aa?text=No+Image'}
                            oldPrice={item.oldPrice}
                            price={item.price}
                        />
                    ))}
                </div>
            </div>

        </main>
    );
}