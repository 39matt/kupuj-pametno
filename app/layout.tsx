import './globals.css';
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import React from "react";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="sr" className="light" style={{ colorScheme: 'light' }}>
        <body className="bg-slate-200 text-[#171717] antialiased">
        <Header />
        {children}
        <Footer />
        </body>
        </html>
    )
}