"use client";

import { DateRangePicker } from "@nextui-org/react";
import Botones from "../botones/botonesdescarga/botonesdescarga.jsx";
import BotonFiltro from "../botones/aplicarfiltro/botonfiltro.jsx"
import style from "./FiltroPeriodo.module.css";

const FiltroPeriodo = () => {
  return (
    <div className={style.contenedor}>
      <h2 className={style.titulo}>FILTRO POR PERIODO</h2>
      <div className="h-full flex flex-col items-center gap-5 rounded-lg">
        <div className="flex flex-col items-center w-full">
            <DateRangePicker
            label="Selecciona el periodo"
            classNames={{
                base: style.customDateRangePicker,
                trigger: style.datePickerTrigger,
                popover: style.datePickerPopover,
                input: style.input,
            }}
            />
          <div className="min-w-[6rem] w-[13vw] max-w-full pt-2">
            <BotonFiltro />
          </div>
        </div>
        </div>
    
        <div className="h-full flex flex-col items-center gap-5 rounded-lg">
            <div className="min-w-[6rem] w-[13vw] max-w-full">
                <Botones />
            </div>
        </div>
    </div>
  );
};

export default FiltroPeriodo;
