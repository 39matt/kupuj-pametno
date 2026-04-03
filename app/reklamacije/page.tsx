import React from 'react';
import { ShieldCheck, ClipboardList, Send, Mail, Phone } from 'lucide-react';

export default function ComplaintsPage() {
    return (
        <main className="max-w-4xl mx-auto py-16 px-6 font-sans text-gray-900 leading-relaxed">
            {/* HEADER */}
            <div className="mb-12 border-b border-gray-100 pb-8 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                    Reklamacije
                </h1>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                    Pravilnik o postupku i rešavanju reklamacija
                </p>
            </div>

            <div className="space-y-12">

                {/* 1. POSTUPAK */}
                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
                        <ShieldCheck className="text-[#F5A623]" size={24} />
                        1. Zakonska garancija i kvalitet
                    </h2>
                    <p className="text-gray-600 font-medium mb-4">
                        Svi proizvodi u našoj internet prodavnici su pokriveni zakonski definisanim obavezama o kvalitetu. Ukoliko smatrate da artikal ima nedostatak ili nesaobraznost, imate puno pravo da pokrenete postupak reklamacije.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-4xl border border-gray-100 italic text-sm font-medium text-gray-500">
                        Napomena: Preduzeće KupujPametno d.o.o. ne preuzima odgovornost za greške nastale usled neadekvatnog rukovanja proizvodom od strane kupca.
                    </div>
                </section>

                {/* 2. KAKO POKRENUTI */}
                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
                        <ClipboardList className="text-[#F5A623]" size={24} />
                        2. Kako pokrenuti postupak?
                    </h2>
                    <p className="text-gray-600 font-medium mb-6">
                        Postupak se pokreće na zahtev kupca, popunjavanjem Zahteva za reklamaciju. Da biste započeli proces, potrebno je da nam se obratite na jedan od sledećih načina:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm flex items-center gap-4 group hover:border-[#F5A623] transition-all">
                            <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-orange-50 text-[#F5A623] transition-colors">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Pozovite nas</p>
                                <p className="text-sm font-black">+381 11 1111 111</p>
                            </div>
                        </div>
                        <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm flex items-center gap-4 group hover:border-[#F5A623] transition-all">
                            <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-orange-50 text-[#F5A623] transition-colors">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Pišite nam</p>
                                <p className="text-sm font-black italic">adnectmarketing@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. TROŠKOVI */}
                <section className="bg-black text-white p-8 md:p-12 rounded-[3rem] shadow-2xl">
                    <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
                        <Send className="text-[#F5A623]" size={28} />
                        3. Troškovi i rokovi
                    </h2>
                    <div className="space-y-6 text-gray-300 text-sm md:text-base">
                        <p>
                            <strong className="text-white uppercase tracking-widest text-xs">Vraćanje robe:</strong><br />
                            Troškove vraćanja robe i novca snosi kupac, osim u slučajevima kada kupac dobije neispravan ili pogrešan artikal.
                        </p>
                        <p>
                            <strong className="text-white uppercase tracking-widest text-xs">Rok za odgovor:</strong><br />
                            Nakon što primimo vašu reklamaciju, obaveza nam je da vam odgovorimo pisanim ili elektronskim putem u roku od 8 dana od dana prijema.
                        </p>
                        <p>
                            <strong className="text-white uppercase tracking-widest text-xs">Rešavanje:</strong><br />
                            Ukoliko je reklamacija prihvaćena, rok za rešavanje iste je 15 dana od momenta podnošenja reklamacije.
                        </p>
                    </div>
                </section>

                {/* 4. PRAVA POTROŠAČA */}
                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-[#F5A623] rounded-full"></span>
                        4. Pravo na povraćaj novca
                    </h2>
                    <p className="text-gray-600 font-medium leading-relaxed">
                        U slučaju odustanka od ugovora, potrošač ima pravo na povraćaj novca ili na zamenu za drugi proizvod. Iznos se kupcu vraća nakon što se utvrdi da je proizvod vraćen neoštećen i ispravan u originalnoj ambalaži. Kupac odgovara za umanjenu vrednost robe koja nastane kao posledica neadekvatnog rukovanja.
                    </p>
                </section>

                <div className="mt-16 pt-8 border-t border-gray-100 text-center">
                    <p className="text-[10px] font-black uppercase text-gray-300 tracking-[0.3em]">
                        KUPUJ PAMETNO &copy; 2026. Sva prava zadržana.
                    </p>
                </div>
            </div>
        </main>
    );
}