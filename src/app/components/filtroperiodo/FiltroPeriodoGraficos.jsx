"use client";

import { useState, useEffect, startTransition } from "react";
import { DateRangePicker } from "@nextui-org/react";
import Botones from "../botones/botonesdescarga/botonesdescarga.jsx";
import BotonFiltro from "../botones/aplicarfiltro/botonfiltro.jsx";
import style from "./FiltroPeriodoGraficos.module.css";
import Grafico2 from "../grafico_ciclos/grafico_ciclos.jsx"
import Grafico1 from "../grafico_realizados/grafico_realizados.jsx"

const FiltroPeriodo = ({ onDataUpdate }) => {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const [fechaInicio, setFechaInicio] = useState({start: formattedToday})
    const [fechaFin, setFechaFin] = useState({end: formattedToday})

    const [dateRange, setDateRange] = useState({ start: formattedToday, end: formattedToday });
    const [loading, setLoading] = useState(false);

    const formatDate = (date) => {
        if (!date) return null;
        const year = date.year;
        const month = String(date.month).padStart(2, "0");
        const day = String(date.day).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const fetchInitialData = async () => {
        const startDate = dateRange.start;
        const endDate = dateRange.end;

        setLoading(true);
        try {
            const response = await fetch(
                `http://192.168.0.72:8000/productividadresumen?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
                {
                    method: "GET",
                    headers: { Accept: "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            onDataUpdate(data, startDate, endDate); // Pasar fechas a onDataUpdate
        } catch (error) {
            console.error("Error fetching initial data:", error);
            setData({productos: []}); // Configurar datos vacíos en caso de error
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (range) => {
        setDateRange(range);
    };

    const handleButtonClick = async () => {
        setFechaInicio(formatDate(dateRange.start) || formattedToday);
        setFechaFin(formatDate(dateRange.end) || formattedToday);

        setLoading(true);
        try {
            const response = await fetch(
                `http://192.168.0.72:8000/productividadresumen?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
                {
                    method: "GET",
                    headers: { Accept: "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            onDataUpdate(data, startDate, endDate); // Pasar fechas a onDataUpdate
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, [dateRange]); // Ejecuta cuando el rango de fechas cambia

    return (
        <div className={style.seccion}>
            <div className={style.graph2}>
                <div className={style.grafiproductos}>
                    <Grafico2 startDate={fechaInicio} endDate={fechaFin}/>
                </div>
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
                                onChange={handleDateChange}
                            />
                            <div className="min-w-[6rem] w-[13vw] max-w-full pt-2">
                                <BotonFiltro onClick={handleButtonClick} />
                            </div>
                        </div>
                    </div>
                    <div className="h-full flex flex-col items-center gap-5 rounded-lg">
                        <div className="min-w-[6rem] w-[13vw] max-w-full">
                            <Botones />
                        </div>
                    </div>
                </div>
            </div>
            <Grafico1 startDate={fechaInicio} endDate={fechaFin}/>
        </div>
    );
};

export default FiltroPeriodo;