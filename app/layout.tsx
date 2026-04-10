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
        <head>
            <meta name="facebook-domain-verification" content="gdja0rfzcda2eibq5pwsvo0ln3uzuv" />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?                         
              n.callMethod.apply(n,arguments):n.queue.push   
              (arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!
              0;n.version='2.0';n.queue=[];t=b.createElement(e);
              t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,
              'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1222071759283044');
              fbq('track', 'PageView');
            `,
                }}
            />
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    src="https://www.facebook.com/tr?id=1222071759283044&ev=
            PageView&noscript=1"/>
            </noscript>
        </head>
        <body className={`${montserrat.className} bg-slate-200 text-[#171717] antialiased`}>
        <PixelTracker />
        <Header />
        {children}
        <Footer />
        </body>
        </html>
    )
}