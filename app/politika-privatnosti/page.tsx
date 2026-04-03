import React from 'react';

export default function PrivacyPolicy() {
    return (
        <main className="max-w-4xl mx-auto py-16 px-6 font-sans text-gray-900 leading-relaxed">
            {/* NASLOV */}
            <div className="mb-12 border-b border-gray-100 pb-8 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                    Politika Privatnosti i Kolačići
                </h1>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                    Poslednje ažuriranje: April 2026.
                </p>
            </div>

            {/* SADRŽAJ */}
            <div className="space-y-10 text-sm md:text-base">

                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-[#F5A623] rounded-full"></span>
                        1. Opšte informacije
                    </h2>
                    <p className="text-gray-600 font-medium">
                        Dobrodošli na našu stranicu. Vaša privatnost nam je od izuzetne važnosti. Ova polisa objašnjava kako prikupljamo, koristimo i štitimo vaše lične podatke kada koristite našu platformu za kupovinu. Korišćenjem našeg sajta, pristajete na prakse opisane u ovom dokumentu.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-[#F5A623] rounded-full"></span>
                        2. Podaci koje prikupljamo
                    </h2>
                    <p className="text-gray-600 font-medium mb-4">
                        Prilikom naručivanja proizvoda, od vas tražimo sledeće podatke neophodne za realizaciju dostave:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {['Ime i prezime', 'Adresa dostave', 'Broj telefona', 'Email adresa'].map((item) => (
                            <li key={item} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 font-bold text-xs uppercase tracking-wide">
                                • {item}
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-[#F5A623] rounded-full"></span>
                        3. Upotreba podataka
                    </h2>
                    <p className="text-gray-600 font-medium">
                        Vaše podatke koristimo isključivo u svrhe:
                    </p>
                    <ul className="list-disc list-inside mt-4 space-y-2 text-gray-500 font-medium ml-4">
                        <li>Obrade i slanja vaših narudžbina.</li>
                        <li>Komunikacije sa vama u vezi sa statusom isporuke.</li>
                        <li>Slanja promotivnih ponuda (samo uz vaš prethodni pristanak).</li>
                        <li>Poboljšanja korisničkog iskustva na našem sajtu.</li>
                    </ul>
                </section>

                <section className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4">
                        4. Kolačići (Cookies)
                    </h2>
                    <p className="text-gray-600 font-medium italic">
                        Naš sajt koristi "kolačiće" kako bi vam omogućio personalizovano iskustvo. Kolačići su male tekstualne datoteke koje se čuvaju na vašem uređaju. Oni nam pomažu da zapamtimo vaše artikle u korpi i prepoznamo vas kada se vratite. Možete onemogućiti kolačiće u podešavanjima vašeg pretraživača, ali to može uticati na funkcionalnost prodavnice.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-[#F5A623] rounded-full"></span>
                        5. Bezbednost podataka
                    </h2>
                    <p className="text-gray-600 font-medium">
                        Sprovodimo sve neophodne tehničke i organizacione mere kako bismo osigurali da su vaši podaci zaštićeni od neovlašćenog pristupa, gubitka ili zloupotrebe. Vaši podaci se čuvaju u sigurnim bazama podataka (Supabase) i nisu dostupni trećim licima, osim kurirskim službama radi vršenja dostave.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-[#F5A623] rounded-full"></span>
                        6. Vaša prava
                    </h2>
                    <p className="text-gray-600 font-medium">
                        U svakom trenutku imate pravo da zatražite uvid u svoje podatke koje čuvamo, kao i da zahtevate njihovu ispravku ili potpuno brisanje iz našeg sistema. Za ovakve zahteve možete nas kontaktirati putem emaila navedenog na stranici za kontakt.
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