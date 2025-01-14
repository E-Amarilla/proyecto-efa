import Completo from './completo/page.jsx';
import LayoutCompleto from './components/layoutcompleto/LayoutCompleto.jsx';
import {Button} from "@nextui-org/react";
import Dropdown from "./components/dropdownalarmas/dropdown"
import ExcelPDF from "./components/filtroperiodo/FiltroPeriodo.jsx";
import Sonner from "./components/notificaciones/page.jsx"
import NavDatos from "./components/navdatos/NavDatos.jsx"
import EquipoX from "./desmoldeo/equipox/page.jsx"

import BotonNoti from "./components/grafico_realizados/grafico_realizados.jsx"
import Login from "./components/grafico_ciclos/grafico_ciclos.jsx";

export default function Page() {
  return (
    <>
      <Login />
      <BotonNoti />
    </>
  );
}