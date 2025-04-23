// layout.jsx
"use client";
import '@/app/globals.css';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from "./components/header/page";
import Sonner from "./components/notificaciones/page";
import { AuthProvider } from './context/AuthContext';
import metadata from './metadata';

const DefaultFooter = dynamic(() => import('./components/footer/footer'), { ssr: false });
const CustomFooter = dynamic(() => import('./components/footer/footer_desmoldeo'), { ssr: false });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const esDesmoldeo = pathname === '/desmoldeo';
  const esLogin = pathname === '/login';

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
            {!esLogin && <Header />}
            {children}
            {!esLogin && <Sonner />}
            {!esLogin && (esDesmoldeo ? <CustomFooter /> : <DefaultFooter />)}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}