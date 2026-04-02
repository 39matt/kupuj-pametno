import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-6 mt-16 font-sans">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-sm">

                <div className="flex flex-col space-y-3">
                    <h4 className="font-bold text-gray-800 uppercase mb-2">Informacije</h4>
                    <Link href="/o-nama" className="text-gray-600 hover:text-lime-600 transition-colors">
                        O nama
                    </Link>
                    <Link href="/uslovi" className="text-gray-600 hover:text-lime-600 transition-colors">
                        Uslovi korišćenja
                    </Link>
                    <Link href="/politika-privatnosti" className="text-gray-600 hover:text-lime-600 transition-colors">
                        Politika privatnosti
                    </Link>
                </div>

                <div className="flex flex-col space-y-3">
                    <h4 className="font-bold text-gray-800 uppercase mb-2">Korisnički servis</h4>
                    <Link href="/kontakt" className="text-gray-600 hover:text-lime-600 transition-colors">
                        Kontakt
                    </Link>
                    <Link href="/reklamacije" className="text-gray-600 hover:text-lime-600 transition-colors">
                        Reklamacije i povraćaj
                    </Link>
                    <Link href="/dostava" className="text-gray-600 hover:text-lime-600 transition-colors">
                        Način dostave
                    </Link>
                </div>

                <div className="flex flex-col space-y-3">
                    <h4 className="font-bold text-gray-800 uppercase mb-2">Kontaktirajte nas</h4>
                    <p className="text-gray-600">Email: info@kupujpametno.rs</p>
                    <p className="text-gray-600">Telefon: +381 11 123 4567</p>
                    <p className="text-gray-600">Radno vreme: Pon - Pet 08:00 - 16:00</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500">
                    © {new Date().getFullYear()} KupujPametno. Sva prava zadržana.
                </p>
            </div>
        </footer>
    );
};

export default Footer;