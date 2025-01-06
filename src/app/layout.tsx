import '@/app/globals.css';
import Header from "./components/header/page";
import Footer from "./components/footer/footer";
import Sonner from "./components/notificaciones/page";
import {Toaster} from "sonner";
import Dropdown from "./components/dropdownalarmas/dropdown"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}