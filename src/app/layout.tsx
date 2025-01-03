import "./globals.css";
import TablaAlertas from "./tablaalertas/page";
import Paletizado from "./paletizado/page";
import Encajonado from "./encajonado/page"
import Login from "./login/page"
import RecuperarContra from "./login/recuperarcontraseña/page"
import Configuraciones from "./configuraciones/page"
import CiclosProductos from "./components/ciclosproductos/CiclosProductos"
import CiclosRealizados from "./components/ciclosrealizados/CiclosRealizados"
import ProductosRealizados from "./components/productosrealizados/ProductosRealizados"
import Header from "./components/header/page"
import Footer from "./components/footer/footer"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        { children }
        <Footer />
      </body>
    </html>
  );
}