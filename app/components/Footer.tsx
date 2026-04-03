import React from 'react';
import Link from 'next/link';


const Footer = () => {
    return (
        <footer className="bg-slate-50 pt-16 pb-8 border-t border-gray-100 font-sans">
            <div className="max-w-6xl mx-auto px-4">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-wide">Imate pitanja?</h3>
                        <p className="text-gray-700 text-sm">Radnim danima od 08 do 16h</p>
                        {/*<p className="text-gray-700 text-sm">Telefon: 011/443-1170</p>*/}
                        <p className="text-gray-700 text-sm">info@kupujpametno.rs</p>

                        <div className="flex items-center space-x-5 pt-2 text-gray-900">
                            <Link href="#" className="hover:text-gray-600 transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                </svg>                            </Link>
                            <Link href="#" className="hover:text-gray-600 transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                                </svg>
                            </Link>
                            <Link href="#" className="hover:text-gray-600 transition-colors">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                                    <path d="m10 15 5-3-5-3z"/>
                                </svg>
                            </Link>
                            <Link href="#" className="hover:text-gray-600 transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-wide">Istražite</h3>
                        <Link href="/o-nama" className="text-gray-700 text-sm hover:underline underline-offset-4">
                            O nama
                        </Link>
                        <Link href="/korisni-trikovi" className="text-gray-700 text-sm hover:underline underline-offset-4">
                            Korisni trikovi
                        </Link>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-wide">Korisni linkovi</h3>
                        <Link href="/politika-privatnosti" className="text-gray-700 text-sm hover:underline underline-offset-4">
                            Politika privatnosti i kolačići
                        </Link>
                        <Link href="/uslovi-poslovanja" className="text-gray-700 text-sm hover:underline underline-offset-4">
                            Opšti uslovi poslovanja
                        </Link>
                        <Link href="/odustanak" className="text-gray-700 text-sm hover:underline underline-offset-4">
                            Odustanak i povrati
                        </Link>
                        <Link href="/reklamacije" className="text-gray-700 text-sm hover:underline underline-offset-4">
                            Reklamacije
                        </Link>
                    </div>
                </div>

                <div className="text-center text-[11px] text-gray-500 tracking-wide">
                    <p>
                        © 2026, KupujPametno - KupujPametno d.o.o - Niš - Srbija  •  Politika privatnosti i kolačići  •  Privacy policy  •  Uslovi korišćenja  •  Contact information
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;