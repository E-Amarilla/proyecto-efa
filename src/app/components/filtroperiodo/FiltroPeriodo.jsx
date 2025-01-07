"use client";

import { DateRangePicker } from "@nextui-org/react";
import Botones from "../botones/botonesdescarga/botonesdescarga.jsx";
import style from "./FiltroPeriodo.module.css";

const FiltroPeriodo = () => {
    return (
    <div className={style.contenedor}>
        <h2 className={style.titulo}>FILTRO POR PERIODO</h2>
        <DateRangePicker
        label="Selecciona el periodo"
        classNames={{
            base: style.customDateRangePicker,
            trigger: style.datePickerTrigger,
            popover: style.datePickerPopover,
        }}
        />
        <div className="h-2/4 grid content-center w-full">
            <Botones />
        </div>
    </div>
    );
};

export default FiltroPeriodo;
