import Hero from "@/app/components/Hero";
import CategoryGrid from "@/app/components/CategoryGrid";
import ProductCard from "@/app/components/ProductCard";
import ToolHighlight from "@/app/components/ToolHighlight";
import Footer from "@/app/components/Footer";


export default function Home() {
    const featuredProducts = [
        { title: "Baštenska ležaljka", imageUrl: "https://placehold.co/500x500/ffffff/a1a1aa?text=Lezaljka", oldPrice: "14.990 RSD", newPrice: "7.490 RSD", discountPercentage: "-50%" },
        { title: "Set za dvorište", imageUrl: "https://placehold.co/500x500/ffffff/a1a1aa?text=Set", oldPrice: "29.990 RSD", newPrice: "14.990 RSD", discountPercentage: "-50%" },
        { title: "Ljuljaška gnezdo", imageUrl: "https://placehold.co/500x500/ffffff/a1a1aa?text=Ljuljaska", oldPrice: "18.990 RSD", newPrice: "9.490 RSD", discountPercentage: "-50%" },
        { title: "Tenda za baštu", imageUrl: "https://placehold.co/500x500/ffffff/a1a1aa?text=Tenda", oldPrice: "12.990 RSD", newPrice: "6.490 RSD", discountPercentage: "-50%" },
        { title: "Solarni reflektor", imageUrl: "https://placehold.co/500x500/ffffff/a1a1aa?text=Reflektor", oldPrice: "3.990 RSD", newPrice: "1.990 RSD", discountPercentage: "-50%" },
        { title: "Aparat za kafu", imageUrl: "https://placehold.co/500x500/ffffff/a1a1aa?text=Aparat", oldPrice: "8.990 RSD", newPrice: "4.490 RSD", discountPercentage: "-50%" },
    ];

    const allProducts = [
        { title: "Pegla na paru", imageUrl: "https://placehold.co/500x500/ffffff/a1a1aa?text=Pegla", oldPrice: "6.990 RSD", newPrice: "3.490 RSD", discountPercentage: "-50%" },
        { title: "Aparat za vafle", imageUrl: "https://placehold.co/500x500/ffffff/a1a1aa?text=Vafli", oldPrice: "4.990 RSD", newPrice: "2.490 RSD", discountPercentage: "-50%" },
        { title: "Set posuđa", imageUrl: "https://placehold.co/500x500/ffffff/a1a1aa?text=Posudje", oldPrice: "15.990 RSD", newPrice: "7.990 RSD", discountPercentage: "-50%" },
        { title: "Alat set 108 kom", imageUrl: "https://placehold.co/500x500/ffffff/a1a1aa?text=Alat", oldPrice: "11.990 RSD", newPrice: "5.990 RSD", discountPercentage: "-50%" },
        { title: "Trimer za travu", imageUrl: "https://placehold.co/500x500/ffffff/a1a1aa?text=Trimer", oldPrice: "9.990 RSD", newPrice: "4.990 RSD", discountPercentage: "-50%" },
        { title: "Crevo za vodu", imageUrl: "https://placehold.co/500x500/ffffff/a1a1aa?text=Crevo", oldPrice: "3.990 RSD", newPrice: "1.990 RSD", discountPercentage: "-50%" },
    ];

    const articles = [
        { title: "Kako urediti baštu za proleće", image: "https://placehold.co/800x450/f3f4f6/a1a1aa?text=Blog+1" },
        { title: "Najbolji alati za održavanje dvorišta", image: "https://placehold.co/800x450/f3f4f6/a1a1aa?text=Blog+2" },
        { title: "Ušteda energije uz solarne lampe", image: "https://placehold.co/800x450/f3f4f6/a1a1aa?text=Blog+3" }
    ];

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
            {featuredProducts.map((product, index) => (
                <ProductCard
                    key={index}
                    title={product.title}
                    imageUrl={product.imageUrl}
                    oldPrice={product.oldPrice}
                    newPrice={product.newPrice}
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

        <ToolHighlight />

        <section className="max-w-6xl mx-auto py-12 px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Svi proizvodi na sajtu</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {allProducts.map((product, index) => (
                <ProductCard
                    key={index}
                    title={product.title}
                    imageUrl={product.imageUrl}
                    oldPrice={product.oldPrice}
                    newPrice={product.newPrice}
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
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 flex flex-col flex-grow items-center text-center">
                    <h3 className="font-semibold text-gray-800 mb-4">{article.title}</h3>
                    <button className="mt-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md text-sm transition-colors">
                      Pročitaj više
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
  );
}