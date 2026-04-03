import Hero from "@/app/components/Hero";
import ProductCard from "@/app/components/ProductCard";
import {createClient} from "@/app/utils/supabase/server";


export default async function Home() {
    const supabase = await createClient();

    const { data: allProducts, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error('Error fetching products:', error);
        return <div>Došlo je do greške prilikom učitavanja proizvoda.</div>;
    }

  return (
      <main className="min-h-screen bg-white font-sans text-gray-900">
        <Hero />

        {/*<section className="max-w-6xl mx-auto py-10 px-4">*/}
        {/*  <h2 className="text-2xl font-bold text-center mb-8">Biraj po kategorijama</h2>*/}
        {/*  <CategoryGrid />*/}
        {/*</section>*/}

          <div className="relative flex overflow-x-hidden bg-black py-3 text-white font-bold uppercase tracking-wider text-sm shadow-sm">
              <div className="animate-marquee flex shrink-0 items-center gap-24 pr-24">
                  <span>Vikend Akcija do 70% popusta</span>
                  <span>Širok asortiman proizvoda</span>
                  <span>Brza dostava za 1-2 radna dana</span>
                  <span>Vikend Akcija do 70% popusta</span>
                  <span>Širok asortiman proizvoda</span>
                  <span>Brza dostava za 1-2 radna dana</span>
              </div>

              <div aria-hidden="true" className="animate-marquee flex shrink-0 items-center gap-24 pr-24">
                  <span>Vikend Akcija do 70% popusta</span>
                  <span>Širok asortiman proizvoda</span>
                  <span>Brza dostava za 1-2 radna dana</span>
                  <span>Vikend Akcija do 70% popusta</span>
                  <span>Širok asortiman proizvoda</span>
                  <span>Brza dostava za 1-2 radna dana</span>
              </div>
          </div>

        <section className="max-w-6xl mx-auto py-12 px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Konačna akcija! Do 70% popusta</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allProducts?.map((product) => (
                  <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      imageUrl={product.imageUrls?.[0] || 'https://placehold.co/500x500/ffffff/a1a1aa?text=No+Image'}
                      oldPrice={product.oldPrice}
                      price={product.price}
                  />
              ))}
          </div>
          <div className="text-center mt-10">
            <button className="bg-[#FF181A] hover:bg-[#D91416] text-white font-bold py-2.5 px-10 rounded-md transition-colors shadow-md">
              Vidi sve
            </button>
          </div>
        </section>

        {/*<ToolHighlight />*/}

        {/*<section className="max-w-6xl mx-auto py-12 px-4">*/}
        {/*  <h2 className="text-2xl font-bold text-center mb-8">Svi proizvodi na sajtu</h2>*/}
        {/*  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">*/}
        {/*    {allProducts.map((product, index) => (*/}
        {/*        <ProductCard*/}
        {/*            key={index}*/}
        {/*            imageUrl={product.imageUrls?.[0] || 'https://placehold.co/500x500/ffffff/a1a1aa?text=No+Image'}*/}
        {/*            name={product.name}*/}
        {/*            oldPrice={product.oldPrice}*/}
        {/*            price={product.price}*/}
        {/*            discountPercentage={product.discountPercentage}*/}
        {/*        />*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*  <div className="text-center mt-10">*/}
        {/*    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-10 rounded-md transition-colors shadow-md">*/}
        {/*      Vidi sve*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/*<section className="max-w-5xl mx-auto py-12 px-4 mb-8">*/}
        {/*  <h2 className="text-2xl font-bold text-center mb-8">Naš blog i utisci</h2>*/}
        {/*  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">*/}
        {/*    {articles.map((article, index) => (*/}
        {/*        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">*/}
        {/*          <div className="aspect-video bg-gray-100 relative">*/}
        {/*            <Image src={article.image} alt={article.title} width={"50"} height={"50"} className="w-full h-full object-cover" />*/}
        {/*          </div>*/}
        {/*          <div className="p-5 flex flex-col grow items-center text-center">*/}
        {/*            <h3 className="font-semibold text-gray-800 mb-4">{article.title}</h3>*/}
        {/*            <button className="mt-auto bg-[#FF181A] hover:bg-[#D91416] text-white font-semibold py-2 px-6 rounded-md text-sm transition-colors">*/}
        {/*              Pročitaj više*/}
        {/*            </button>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</section>*/}
      </main>
  );
}