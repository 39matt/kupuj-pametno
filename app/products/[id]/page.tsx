import { createClient } from "@/app/utils/supabase/server";
import ProductCard from "@/app/components/ProductCard";
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star, Check, Truck, ShieldCheck, Info } from 'lucide-react';
import ProductGallery from "@/app/products/[id]/components/ProductGallery";
import ProductBundle from "@/app/products/[id]/components/ProductBundle";
import TrustUrgency from "@/app/products/[id]/components/TrustUrgency";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !product) notFound();

    const { data: relatedProducts } = await supabase
        .from('products')
        .select('*')
        .neq('id', id)
        .limit(4);

    const images = product.imageUrls || [];

    return (
        <main className="bg-white min-h-screen">
            <div className="max-w-6xl mx-auto py-10 px-4 font-sans text-gray-900">

                {/* HERO SEKCIJA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    {/* LEVA KOLONA: Slike + TrustUrgency */}
                    <div className="flex flex-col gap-6">
                        {/* Galerija slika */}
                        <ProductGallery images={images} name={product.name} />
                    </div>

                    {/* DESNO: Informacije o kupovini */}
                    <div className="flex flex-col justify-start">
                        <div className="flex items-center gap-1 text-yellow-400 mb-4">
                            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={18} />)}
                            <span className="text-gray-500 text-sm ml-2 font-medium">(24 ocene)</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black mb-6 leading-tight uppercase tracking-tight text-black">
                            {product.name}
                        </h1>

                        <div className="flex flex-col gap-3 mb-8">
                            <div className="flex items-center text-green-600 font-bold bg-green-50 w-max px-4 py-1.5 rounded-lg text-sm border border-green-100">
                                <Check size={18} className="mr-2" strokeWidth={3} />
                                Na stanju - Spremno za slanje odmah
                            </div>
                            <div className="flex items-center text-gray-600 text-sm pl-1">
                                <Truck size={20} className="mr-3 text-gray-400" />
                                Cena dostave za sve porudžbine je 460 dinara.
                            </div>
                        </div>

                         <TrustUrgency />

                        <ProductBundle
                            productInfo={product}
                        />

                        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-gray-500 text-xs font-bold uppercase tracking-tight">
                                <ShieldCheck size={24} className="text-green-600 shrink-0" />
                                Sigurna <br /> Kupovina
                            </div>
                            <div className="flex items-center gap-3 text-gray-500 text-xs font-bold uppercase tracking-tight">
                                <Check size={24} className="text-green-600 shrink-0 border-2 border-green-600 rounded-full p-0.5" />
                                Garancija <br /> Kvaliteta
                            </div>
                        </div>
                    </div>
                </div>

                {/* OPIS: FULL WIDTH (Vaš zahtev) */}
                <div className="border-t border-gray-100 pt-20 mb-24">
                    <div className="flex items-center justify-center gap-3 mb-12">
                        <Info className="text-[#FF181A]" size={28} />
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-center">
                            Detaljan opis i karakteristike
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl overflow-hidden">
                            {/* Tekst preko cele širine */}
                            <p className="text-gray-700 text-xl whitespace-pre-wrap leading-relaxed mb-16 text-center md:text-left px-4">
                                {product.description}
                            </p>

                            {/* Velika slika detalja preko cele širine */}
                            <div className="relative w-full aspect-21/9 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                                <Image
                                    src={images[1] || images[0] || 'https://placehold.co/1200x500'}
                                    alt="Detalji proizvoda"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RECENZIJE */}
                <div className="bg-black rounded-[2.5rem] p-10 md:p-16 mb-24 text-white">
                    <h2 className="text-3xl font-black text-center mb-12 uppercase tracking-tight">
                        Iskustva naših korisnika
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                id: 1,
                                text: "Proizvod je stigao sutradan, upakovan savršeno. Kvalitet je opravdao svako ulaganje. Kupovaću ovde ponovo!",
                                name: "Marko M.",
                                initial: "M",
                                rating: 5
                            },
                            {
                                id: 2,
                                text: "Odlična komunikacija sa prodavcem. Paket je stigao brzo, a proizvod radi tačno onako kako je i opisano. Sve preporuke!",
                                name: "Jelena T.",
                                initial: "J",
                                rating: 5
                            },
                            {
                                id: 3,
                                text: "Jako sam zadovoljan kupovinom. Cena je više nego korektna za ovaj nivo kvaliteta. Mali minus za kurira koji je kasnio, ali to nije do vas.",
                                name: "Nikola S.",
                                initial: "N",
                                rating: 4
                            }
                        ].map((review) => {
                            // Funkcija za dodeljivanje boje na osnovu inicijala
                            const getAvatarColor = (initial: string) => {
                                const colors = [
                                    'bg-[#FF181A]', // Crvena (originalna)
                                    'bg-[#2ECC71]', // Zelena
                                    'bg-[#3498DB]', // Plava
                                    'bg-[#9B59B6]', // Ljubičasta
                                    'bg-[#F1C40F]', // Žuta
                                    'bg-[#E67E22]', // Narandžasta
                                ];
                                // Jednostavan "hash" na osnovu slova da uvek dobijemo istu boju za isto slovo
                                const charCode = initial.charCodeAt(0);
                                return colors[charCode % colors.length];
                            };

                            return (
                                <div key={review.id} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    fill="currentColor"
                                                    size={14}
                                                    className={i < review.rating ? "text-yellow-400" : "text-white/20"}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-gray-200 text-lg italic mb-6">
                                            {"\""}{review.text}{"\""}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/* Dodaćemo dinamičku klasu boje ovde */}
                                        <div className={`w-10 h-10 ${getAvatarColor(review.initial)} rounded-full flex items-center justify-center font-bold text-white text-xl`}>
                                            {review.initial}
                                        </div>
                                        <span className="text-sm font-bold uppercase tracking-widest text-gray-400">
                            {review.name}
                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* POVEZANI PROIZVODI */}
                <div>
                    <h2 className="text-2xl font-black text-center mb-10 uppercase tracking-tight">Možda će vas zanimati</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts?.map((item) => (
                            <ProductCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                imageUrl={(item.image_urls || item.imageUrls)?.[0]}
                                oldPrice={item.old_price || item.oldPrice}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}