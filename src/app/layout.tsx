"use client";
import '@/app/globals.css';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from "./components/header/page";

const DefaultFooter = dynamic(() => import('./components/footer/footer'), { ssr: false });
const CustomFooter = dynamic(() => import('./components/footer/footer_desmoldeo'), { ssr: false });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const esDesmoldeo = pathname === '/desmoldeo';
  const esLogin = ['/', '/signup', '/login', '/login/recuperacion'].includes(pathname);

  return (
    <html lang="en">
      <head>
        
      </head>
      <body>
      <div className="scrollablecontent">
        {!esLogin && <Header />} {/*CONDICIONAL HEADER, NO BORRAR*/}
        <div>
          {children}
        </div>
        {!esLogin && (esDesmoldeo ? <CustomFooter /> : <DefaultFooter />)} {/*CONDICIONAL FOOTER, NO BORRAR*/}
      </div>
      </body>
    </html>
  );
}
