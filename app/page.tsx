import Hero from "@/app/components/Hero";
import CategoryGrid from "@/app/components/CategoryGrid";
import ProductCard from "@/app/components/ProductCard";
import ToolHighlight from "@/app/components/ToolHighlight";
import Image from "next/image";
import {createClient} from "@/app/utils/supabase/server";


export default async function Home() {
    const articles = [
        { title: "Kako urediti baštu za proleće", image: "https://placehold.co/800x450/f3f4f6/a1a1aa?text=Blog+1" },
        { title: "Najbolji alati za održavanje dvorišta", image: "https://placehold.co/800x450/f3f4f6/a1a1aa?text=Blog+2" },
        { title: "Ušteda energije uz solarne lampe", image: "https://placehold.co/800x450/f3f4f6/a1a1aa?text=Blog+3" }
    ];
    const supabase = await createClient();

    const { data: allProducts, error } = await supabase
        .from('products')
        .select('*');
    console.log(allProducts);
    if (error) {
        console.error('Error fetching products:', error);
        return <div>Došlo je do greške prilikom učitavanja proizvoda.</div>;
    }

  return (
      <main className="min-h-screen bg-white font-sans text-gray-900">
        <Hero />

        <section className="max-w-6xl mx-auto py-10 px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Biraj po kategorijama</h2>
          <CategoryGrid />
        </section>

        <div className="bg-yellow-400 py-3 text-center text-black font-bold uppercase tracking-wider text-sm shadow-sm">
          Besplatna dostava za porudžbine preko 5000 RSD • Isporuka 1-3 radna dana • Sigurna kupovina
        </div>

        <section className="max-w-6xl mx-auto py-12 px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Konačna akcija! Do 70% popusta</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {allProducts?.map((product) => (
                  <ProductCard
                      key={product.id}
                      name={product.name}
                      imageUrl={product.imageUrls?.[0] || 'https://placehold.co/500x500/ffffff/a1a1aa?text=No+Image'}
                      oldPrice={product.oldPrice}
                      price={product.price}
                  />
              ))}
          </div>
          <div className="text-center mt-10">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-10 rounded-md transition-colors shadow-md">
              Vidi sve
            </button>
          </div>
        </section>

        <ToolHighlight />

        <section className="max-w-6xl mx-auto py-12 px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Svi proizvodi na sajtu</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {allProducts.map((product, index) => (
                <ProductCard
                    key={index}
                    imageUrl={product.imageUrls?.[0] || 'https://placehold.co/500x500/ffffff/a1a1aa?text=No+Image'}
                    name={product.name}
                    oldPrice={product.oldPrice}
                    price={product.price}
                    discountPercentage={product.discountPercentage}
                />
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-10 rounded-md transition-colors shadow-md">
              Vidi sve
            </button>
          </div>
        </section>

        <section className="max-w-5xl mx-auto py-12 px-4 mb-8">
          <h2 className="text-2xl font-bold text-center mb-8">Naš blog i utisci</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
                  <div className="aspect-video bg-gray-100 relative">
                    <Image src={article.image} alt={article.title} width={"50"} height={"50"} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 flex flex-col grow items-center text-center">
                    <h3 className="font-semibold text-gray-800 mb-4">{article.title}</h3>
                    <button className="mt-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md text-sm transition-colors">
                      Pročitaj više
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </section>
      </main>
  );
}