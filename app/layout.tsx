import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoDash — Dashboard de Criptomonedas",
  description: "Precios en tiempo real de las principales criptomonedas con gráficas interactivas",
  keywords: ["crypto", "bitcoin", "ethereum", "precios", "dashboard"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-900 min-h-screen`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
