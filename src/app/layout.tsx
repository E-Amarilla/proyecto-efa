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
      </body>
    </html>
  );
}