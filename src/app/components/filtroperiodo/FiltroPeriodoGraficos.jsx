"use client";

import { useState, useEffect } from "react";
import { DateRangePicker } from "@nextui-org/react";
import BotonesDescarga from "../botones/botonesdescarga/botonesdescargagraficos.jsx";
import BotonFiltro from "../botones/aplicarfiltro/botonfiltro.jsx";
import style from "./FiltroPeriodoGraficos.module.css";
import Grafico2 from "../grafico_ciclos/grafico_ciclos.jsx";
import Grafico1 from "../grafico_realizados/grafico_realizados.jsx";

const FiltroPeriodo = () => {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];

    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    const formattedLastMonth = lastMonth.toISOString().split("T")[0];
    const [dateRange, setDateRange] = useState({ start: formattedLastMonth, end: formattedToday });
    
    const [fechaInicio, setFechaInicio] = useState(formattedLastMonth);
    const [fechaFin, setFechaFin] = useState(formattedToday);

    const handleDateChange = (range) => {
        setDateRange(range);
    };

    const handleButtonClick = () => {
        setFechaInicio(dateRange.start);
        setFechaFin(dateRange.end);
    };

    useEffect(() => {

    }, [fechaInicio, fechaFin]);

    return (
        <div id="GraficosSection" className={style.seccion}>
            <div className={style.graph2}>
                <div className={`${style.grafiproductos} ${style.fullWidth}`}>
                    <Grafico2 startDate={fechaInicio} endDate={fechaFin} />
                </div>
                <div className={`${style.contenedor} FiltroPeriodoGraficos`}>
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
                                onChange={handleDateChange}
                            />
                            <div className="min-w-[6rem] w-[13vw] max-w-full pt-2">
                                <BotonFiltro onClick={handleButtonClick} />
                            </div>
                        </div>
                    </div>
                    <div className="h-full flex flex-col items-center gap-5 rounded-lg">
                        <div className="min-w-[6rem] w-[13vw] max-w-full">
                            <BotonesDescarga startDate={dateRange.start} endDate={dateRange.end} />
                        </div>
                    </div>
                </div>
            </div>
            <Grafico1 startDate={fechaInicio} endDate={fechaFin} />
        </div>
    );
};

export default FiltroPeriodo;
