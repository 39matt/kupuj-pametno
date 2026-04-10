'use client'

import './globals.css';
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import React from "react";
import {Montserrat} from "next/font/google"
import dynamic from "next/dynamic";

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
});
const PixelTracker = dynamic(() => import("./utils/pixel/PixelTracker"), { ssr: false });

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="sr" className="light"  style={{ colorScheme: 'light' }}>
        <body className={`${montserrat.className} bg-slate-200 text-[#171717] antialiased`}>
        <PixelTracker />
        <Header />
        {children}
        <Footer />
        </body>
        </html>
    )
}