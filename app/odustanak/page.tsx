import React from 'react';
import { RefreshCw, AlertTriangle, FileText, Phone, Mail } from 'lucide-react';

export default function ReturnsAndRefunds() {
    return (
        <main className="max-w-4xl mx-auto py-16 px-6 font-sans text-gray-900 leading-relaxed">
            {/* NASLOV */}
            <div className="mb-12 border-b border-gray-100 pb-8 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                    Odustanak i Povrati
                </h1>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                    Informacije o reklamacijama i refundaciji
                </p>
            </div>

            <div className="space-y-12 text-sm md:text-base text-gray-700">

                {/* PRAVO NA ODUSTANAK */}
                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        <RefreshCw className="text-[#F5A623]" size={24} />
                        Pravo na odustanak (14 dana)
                    </h2>
                    <p className="font-medium mb-6">
                        U skladu sa Zakonom o zaštiti potrošača, imate pravo da odustanete od kupovine u roku od 14 dana od dana prijema robe, bez navođenja razloga. Da bi povraćaj bio moguć, proizvod mora biti:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {['Nekorišćen', 'Neoštećen', 'U originalnom pakovanju'].map((item) => (
                            <div key={item} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center font-black uppercase text-[10px] tracking-widest text-gray-500">
                                {item}
                            </div>
                        ))}
                    </div>
                    <p className="font-medium text-gray-500 italic">
                        Napomena: Troškovi poštarine prilikom vraćanja robe padaju na teret kupca, osim u slučajevima kada je proizvod stigao oštećen.
                    </p>
                </section>

                {/* DOKUMENTACIJA */}
                <section className="bg-orange-50/50 p-8 rounded-[2.5rem] border border-orange-100/50">
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        <FileText className="text-[#F5A623]" size={24} />
                        Obrasci za preuzimanje
                    </h2>
                    <p className="font-medium mb-6">
                        Da biste pokrenuli proces povrata, potrebno je da popunite odgovarajući obrazac:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="/obrasci/obrazac-za-odustanak.pdf" className="flex-1 bg-white p-4 rounded-2xl border border-orange-200 text-center font-bold text-xs uppercase tracking-tight hover:bg-[#F5A623] hover:text-white transition-all">
                            Obrazac za odustanak od ugovora
                        </a>
                        <a href="/obrasci/uputstvo.pdf" className="flex-1 bg-white p-4 rounded-2xl border border-orange-200 text-center font-bold text-xs uppercase tracking-tight hover:bg-[#F5A623] hover:text-white transition-all">
                            Uputstvo za reklamaciju
                        </a>
                    </div>
                </section>

                {/* REKLAMACIJE */}
                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        <AlertTriangle className="text-red-500" size={24} />
                        Reklamacije zbog oštećenja
                    </h2>
                    <p className="font-medium mb-4">
                        Ukoliko primetite da je proizvod oštećen ili ne funkcioniše pravilno odmah po otvaranju paketa, molimo vas da nas kontaktirate u roku od 24h. Organizovaćemo preuzimanje proizvoda putem kurira o našem trošku.
                    </p>
                    <div className="bg-gray-900 text-white p-6 rounded-3xl">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Potrebno je da:</p>
                        <ul className="space-y-2 text-sm font-medium">
                            <li className="flex items-start gap-2">
                                <span className="text-[#F5A623] font-black">•</span> Sačuvate fiskalni račun / potvrdu o kupovini.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#F5A623] font-black">•</span> Adekvatno upakujete proizvod za transport.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* KONTAKT PODRŠKA */}
                <section className="pt-8 border-t border-gray-100">
                    <h2 className="text-xl font-black uppercase tracking-tight mb-6">Potrebna vam je pomoć?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-4xl border border-gray-100">
                            <div className="bg-white p-3 rounded-xl shadow-sm text-[#F5A623]"><Phone size={20}/></div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400">Telefon</p>
                                <p className="text-sm font-black">+381 11 1111 111</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-4xl border border-gray-100">
                            <div className="bg-white p-3 rounded-xl shadow-sm text-[#F5A623]"><Mail size={20}/></div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400">Email</p>
                                <p className="text-sm font-black italic">adnectmarketing@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-16 pt-8 text-center">
                    <p className="text-[10px] font-black uppercase text-gray-300 tracking-[0.3em]">
                        KUPUJ PAMETNO &copy; 2026. Sva prava zadržana.
                    </p>
                </div>
            </div>
        </main>
    );
}