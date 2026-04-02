import React from 'react';

const Hero = () => {
    return (
        <section className="bg-white text-center py-12 border-b-8 border-green-600">
            <div className="max-w-4xl mx-auto px-4">
                <h3 className="text-lime-600 font-bold uppercase tracking-widest text-lg">— SPECIJALNA PONUDA —</h3>
                <h1 className="text-6xl font-black text-yellow-500 my-4 leading-tight">
                    FINALNO <br /> PROLEĆNO SNIŽENJE
                </h1>
                <div className="inline-block bg-lime-600 text-white font-bold py-3 px-8 rounded-full text-3xl shadow-lg">
                    POPUSTI DO 70%
                </div>
            </div>
        </section>
    );
};

export default Hero;