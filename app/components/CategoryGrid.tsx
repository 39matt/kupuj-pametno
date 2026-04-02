const categories = [
    { name: 'Bašta i dvorište', discount: '-55%', img: 'https://placehold.co/400x400/f3f4f6/a1a1aa?text=Basta' },
    { name: 'Alati i mašine', discount: '-65%', img: 'https://placehold.co/400x400/f3f4f6/a1a1aa?text=Alati' },
    { name: 'Automoto oprema', discount: '-70%', img: 'https://placehold.co/400x400/f3f4f6/a1a1aa?text=Auto' },
    { name: 'Kuhinjski aparati', discount: '-65%', img: 'https://placehold.co/400x400/f3f4f6/a1a1aa?text=Kuhinja' },
    { name: 'Kućni ljubimci', discount: '-65%', img: 'https://placehold.co/400x400/f3f4f6/a1a1aa?text=Ljubimci' },
    { name: 'Lepota i zdravlje', discount: '-45%', img: 'https://placehold.co/400x400/f3f4f6/a1a1aa?text=Lepota' },
    { name: 'Igračke', discount: '-35%', img: 'https://placehold.co/400x400/f3f4f6/a1a1aa?text=Igracke' },
    { name: 'PC Oprema', discount: '-45%', img: 'https://placehold.co/400x400/f3f4f6/a1a1aa?text=PC+Oprema' },
    { name: 'Oprema za putovanje', discount: '-50%', img: 'https://placehold.co/400x400/f3f4f6/a1a1aa?text=Putovanje' },
    { name: 'Bebi oprema', discount: '-40%', img: 'https://placehold.co/400x400/f3f4f6/a1a1aa?text=Bebe' },
    { name: 'Sve za proslave', discount: '-60%', img: 'https://placehold.co/400x400/f3f4f6/a1a1aa?text=Proslave' },
    { name: 'Oprema za dom', discount: '-30%', img: 'https://placehold.co/400x400/f3f4f6/a1a1aa?text=Dom' },
];
const CategoryGrid = () => {
    return (
        <div className="grid grid-cols-4 gap-4 p-8 bg-gray-50">
            {categories.map((cat, i) => (
                <div key={i} className="relative group cursor-pointer">
                    <div className="absolute top-2 left-2 bg-yellow-400 text-black font-bold rounded-full w-12 h-12 flex items-center justify-center z-10 text-sm border-2 border-white">
                        {cat.discount}
                    </div>
                    <div className="aspect-square bg-white overflow-hidden rounded-lg shadow-sm">
                        <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    </div>
                    <p className="text-center mt-2 font-semibold text-gray-700">{cat.name}</p>
                </div>
            ))}
        </div>
    );
};
export default CategoryGrid;