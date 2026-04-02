import React from 'react';

const Hero = () => {
    return (
        <section className="bg-white text-center py-12 border-b-8 border-black">
            <div className="max-w-4xl mx-auto px-4">
                <h3 className="text-[#FF181A] font-bold uppercase tracking-widest text-lg">— SPECIJALNA PONUDA —</h3>
                <h1 className="text-6xl font-black text-black my-4 leading-tight">
                    FINALNO <br /> PROLEĆNO SNIŽENJE
                </h1>
                <div className="inline-block bg-[#FF181A] text-white font-bold py-3 px-8 rounded-full text-3xl shadow-lg">
                    POPUSTI DO 70%
                </div>
            </div>
        </section>
    );
};

export default Hero;