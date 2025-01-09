import Completo from './completo/page.jsx';
import LayoutCompleto from './components/layoutcompleto/LayoutCompleto.jsx';
import {Button} from "@nextui-org/react";
import Dropdown from "./components/dropdownalarmas/dropdown"
import ExcelPDF from "./components/filtroperiodo/FiltroPeriodo.jsx";
import Sonner from "./components/notificaciones/page.jsx"
import NavDatos from "./components/navdatos/NavDatos.jsx"
import EquipoX from "./desmoldeo/equipox/page.jsx"
import BotonNoti from "./components/notificaciones/page.jsx"

export default function Page() {
  return (
    <>
      <Completo />
      <BotonNoti />
    </>
  );
}