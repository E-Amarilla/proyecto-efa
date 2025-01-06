import '@/app/globals.css';
<<<<<<< HEAD
import Header from "./components/header/page";
import Footer from "./components/footer/footer";
import Sonner from "./components/notificaciones/page";
import {Toaster} from "sonner";
import Dropdown from "./components/dropdownalarmas/dropdown"
=======
import Header from "./components/header/page"
import Footer from "./components/footer/footer"
>>>>>>> 185f1bf717f4ee36c3f20faed4d8a5db77e1507f

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