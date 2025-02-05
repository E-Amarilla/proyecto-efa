// layout.jsx (Archivo principal del layout)
"use client";
import '@/app/globals.css';
import { usePathname } from 'next/navigation';
import { Toaster } from 'sonner';
import dynamic from 'next/dynamic';
import Header from "./components/header/page";
import Sonner from "./components/notificaciones/page";
import { AuthProvider } from './context/AuthContext';
import metadata from './metadata'; // Importa el objeto metadata con export default

const DefaultFooter = dynamic(() => import('./components/footer/footer'), { ssr: false });
const CustomFooter = dynamic(() => import('./components/footer/footer_desmoldeo'), { ssr: false });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const esDesmoldeo = pathname === '/desmoldeo';
  const esLogin = ['/signup', '/login', '/login/recuperacion'].includes(pathname);

  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <title>{metadata.title.default}</title>
          <meta name="description" content={metadata.description} />
          <link rel="icon" href={metadata.icons.icon} sizes="any" />
        </head>
        <body>
          <div className='scrollablecontent'>
            {!esLogin && <Header />} {/* CONDICIONAL HEADER, NO BORRAR */}
            {children}
            {!esLogin && <Sonner />} {/* CONDICIONAL SONNER, NO BORRAR */}
            {!esLogin && (esDesmoldeo ? <CustomFooter /> : <DefaultFooter />)} {/* CONDICIONAL FOOTER, NO BORRAR */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
