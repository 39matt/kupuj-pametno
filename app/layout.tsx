import './globals.css';
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import React from "react";
import {Inter, Montserrat} from "next/font/google"

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat', // Ovo ti omogućava da ga koristiš u Tailwind-u
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="sr" className="light"  style={{ colorScheme: 'light' }}>
        <body className={`${montserrat.className} bg-slate-200 text-[#171717] antialiased`}>
        <Header />
        {children}
        <Footer />
        </body>
        </html>
    )
}