"use client";
import '@/app/globals.css';

// components/Layout.js
import { usePathname } from 'next/navigation';
import Header from "./components/header/page";
import DefaultFooter from "./components/footer/footer";
import CustomFooter from "./components/footer/footer_desmoldeo";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const esDesmoldeo = pathname === '/desmoldeo'; // Ajusta la ruta según tu página

  return (
    <html lang="en">
      <Header />
      <body>
        {children}
      </body>
      { esDesmoldeo ? <CustomFooter /> : <DefaultFooter />}
    </html>
  );
}