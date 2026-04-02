import './globals.css';
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="sr">
      <body className="bg-gray-50">
      <Header />
      {children}
      <Footer />
      </body>
      </html>
  )
}