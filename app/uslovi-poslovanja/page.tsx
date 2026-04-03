import React from 'react';

export default function TermsOfService() {
    return (
        <main className="max-w-4xl mx-auto py-16 px-6 font-sans text-gray-900 leading-relaxed">
            {/* NASLOV */}
            <div className="mb-12 border-b border-gray-100 pb-8 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                    Uslovi Korišćenja
                </h1>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                    Poslednje ažuriranje: April 2026.
                </p>
            </div>

            {/* OPŠTA NAPOMENA */}
            <div className="mb-12 p-6 bg-gray-50 rounded-3xl border border-gray-100 italic font-medium text-gray-600">
                <p className="text-sm">
                    Molimo vas da pažljivo pročitate ove Uslove korišćenja pre nego što pristupite našem sajtu ili izvršite kupovinu. Korišćenjem bilo kog dela našeg sajta, pristajete na sve navedene uslove. Ako se ne slažete sa bilo kojim delom ovih uslova, molimo vas da ne koristite naš sajt.
                </p>
            </div>

            {/* SADRŽAJ SA SEKCIJAMA */}
            <div className="space-y-10 text-sm md:text-base text-gray-700">

                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-[#F5A623] rounded-full shrink-0"></span>
                        1. Predmet i definicije
                    </h2>
                    <p className="font-medium">
                        Ovi uslovi definišu pravila po kojima naša prodavnica pruža usluge kupcima putem veb sajta. Sajt je u našem vlasništvu, a pojmovi "mi", "nas", "naš" i "prodavnica" se odnose na naš brend. Pojam "kupac" ili "korisnik" se odnosi na svako lice koje pristupa sajtu ili vrši porudžbinu.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-[#F5A623] rounded-full shrink-0"></span>
                        2. Cene i proizvodi
                    </h2>
                    <p className="font-medium mb-4">
                        Sve cene na sajtu su izražene u RSD (dinarima) i uključuju PDV (ako je primenljivo). Zadržavamo pravo da u bilo kom trenutku promenimo cene bez prethodne najave. Iako se trudimo da svi podaci o proizvodima (slike, opisi) budu tačni, zadržavamo pravo na greške. U slučaju velike greške u ceni, obavestićemo vas i dati mogućnost potvrde ili otkazivanja narudžbine po tačnoj ceni.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-[#F5A623] rounded-full shrink-0"></span>
                        3. Proces naručivanja i plaćanje
                    </h2>
                    <p className="font-medium">
                        Narudžbina se smatra potvrđenom tek nakon što dobijete email potvrdu ili vas naš operater kontaktira. Plaćanje se vrši isključivo pouzećem (gotovinom kuriru prilikom preuzimanja pošiljke). Narudžbinom pristajete na obavezu plaćanja punog iznosa navedenog u korpi (cena proizvoda + troškovi dostave).
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-[#F5A623] rounded-full shrink-0"></span>
                        4. Dostava robe
                    </h2>
                    <p className="font-medium mb-4">
                        Dostavu vršimo na teritoriji Republike Srbije u saradnji sa kurirskim službama. Rok dostave je obično 24-48 sati od momenta potvrde narudžbine (radnim danima). Troškovi dostave su fiksni i iznose 460 RSD po narudžbini. Zadržavamo pravo na produženje roka dostave u slučaju nepredviđenih okolnosti (vremenske nepogode, štrajkovi kurira).
                    </p>
                </section>

                <section className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4">
                        5. Reklamacije i povrat
                    </h2>
                    <p className="font-medium mb-4">
                        U skladu sa Zakonom o zaštiti potrošača, imate pravo da odustanete od kupovine u roku od 14 dana od dana prijema robe, bez navođenja razloga (osim za proizvode za koje je povrat zakonom isključen, npr. higijenski artikli). Proizvod mora biti vraćen u originalnom pakovanju, neoštećen i nekorišćen. Troškove vraćanja robe snosi kupac. Ako ste primili oštećen proizvod, molimo vas da nas kontaktirate u roku od 24h radi zamene.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-[#F5A623] rounded-full shrink-0"></span>
                        6. Odricanje od odgovornosti
                    </h2>
                    <p className="font-medium">
                        U najvećoj meri dozvoljenoj zakonom, ne snosimo odgovornost za bilo kakvu direktnu, indirektnu, slučajnu ili posledičnu štetu (uključujući, ali ne ograničavajući se na, gubitak profita ili podataka) koja nastane korišćenjem našeg sajta ili nemogućnošću korišćenja istog. Ne garantujemo da će sajt uvek biti bez grešaka ili prekida u radu.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-[#F5A623] rounded-full shrink-0"></span>
                        7. Zakonski sporovi
                    </h2>
                    <p className="font-medium">
                        Na ove Uslove korišćenja primenjuju se zakoni Republike Srbije. U slučaju bilo kakvog spora koji se ne može rešiti mirnim putem, nadležan je sud u Beogradu.
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