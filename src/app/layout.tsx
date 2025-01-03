<<<<<<< HEAD
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
=======
import "./globals.css";
import TablaAlertas from "./tablaalertas/page";
import Paletizado from "./paletizado/page";
import Encajonado from "./encajonado/page"
import Login from "./login/page"
import RecuperarContra from "./login/recuperarcontraseña/page"
import Configuraciones from "./configuraciones/page"

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <Configuraciones />
>>>>>>> d8767c4568177b7d1dfde9ac9fbafa0d80e0bba6
      </body>
    </html>
  );
}