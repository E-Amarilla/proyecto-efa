// layout.jsx
"use client";
import '@/app/globals.css';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from "./components/header/page";
import Sonner from "./components/notificaciones/page";
import ProvidersComposite from './providers/ProvidersComposite';
import metadata from './metadata';
import { useEffect, useState } from 'react';
import './i18n/i18n'; // Importar configuración de i18n

const DefaultFooter = dynamic(() => import('./components/footer/footer'), { ssr: false });
const CustomFooter = dynamic(() => import('./components/footer/footer_desmoldeo'), { ssr: false });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const esDesmoldeo = pathname === '/desmoldeo';
  const esLogin = ['/signup', '/login', '/login/recuperacion'].includes(pathname);
  const [initialLanguage, setInitialLanguage] = useState('es');
  
  useEffect(() => {
    // Obtener idioma del localStorage o cookie al cargar
    const storedLang = localStorage.getItem('selectedLanguage');
    const cookieLang = document.cookie.split(';').find(c => c.trim().startsWith('selectedLanguage='))?.split('=')[1];
    if (storedLang || cookieLang) {
      setInitialLanguage(storedLang || cookieLang);
    }
  }, []);

  return (
    <ProvidersComposite initialLanguage={initialLanguage}>
      <html lang={initialLanguage}>
        <head>
          <title>{metadata.title.default}</title>
          <meta name="description" content={metadata.description} charset="UTF-8"/>
          <link rel="icon" href={metadata.icons.icon} sizes="any" />
        </head>
        <body>
          <div className='scrollablecontent'>
            {!esLogin && <Header />}
            {children}
            {!esLogin && <Sonner />}
            {!esLogin && (esDesmoldeo ? <CustomFooter /> : <DefaultFooter />)}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
          </div>
        </body>
      </html>
    </ProvidersComposite>
  );
}