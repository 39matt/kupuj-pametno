import React from 'react';

const Hero = () => {
    return (
        <section className="relative w-full py-24 border-b-8 border-black overflow-hidden flex items-center justify-center min-h-125">
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 bg-[url('/hero-image.jpg')] bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
                aria-hidden="true"
            />

            {/* Dark Overlay (Da bi tekst bio čitljiv) */}
            <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

            {/* Content Section */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                <h3 className="text-[#FF181A] font-bold uppercase tracking-[0.3em] text-lg mb-2 drop-shadow-md">
                    — SPECIJALNA PONUDA —
                </h3>

                <h1 className="text-5xl md:text-7xl font-black text-white my-6 leading-tight drop-shadow-lg">
                    FINALNO <br />
                    <span className="text-[#FF181A]">PROLEĆNO</span> SNIŽENJE
                </h1>

                <div className="inline-block bg-[#FF181A] text-white font-black py-4 px-10 rounded-full text-2xl md:text-4xl shadow-[0_10px_25px_rgba(255,24,26,0.4)] transform hover:scale-105 transition-transform cursor-default">
                    POPUSTI DO 70%
                </div>
            </div>
        </section>
    );
};

export default Hero;