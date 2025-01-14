"use client";

import { useState, useEffect } from "react";
import { DateRangePicker } from "@nextui-org/react";
import Botones from "../botones/botonesdescarga/botonesdescarga.jsx";
import BotonFiltro from "../botones/aplicarfiltro/botonfiltro.jsx";
import style from "./FiltroPeriodo.module.css";

const FiltroPeriodo = ({ onDataUpdate }) => {
    // Obtener la fecha actual
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0]; // Formato YYYY-MM-DD

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
        const startDate = formattedToday;
        const endDate = formattedToday;

        setLoading(true);
        try {
            const response = await fetch(
                `http://192.168.0.169:8000/productividadresumen?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
                {
                    method: "GET",
                    headers: { Accept: "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            onDataUpdate(data);
        } catch (error) {
            console.error("Error fetching initial data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (range) => {
        setDateRange(range);
    };

    const handleButtonClick = async () => {
        const startDate = formatDate(dateRange.start) || formattedToday;
        const endDate = formatDate(dateRange.end) || formattedToday;

        setLoading(true);
        try {
            const response = await fetch(
                `http://192.168.0.169:8000/productividadresumen?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
                {
                    method: "GET",
                    headers: { Accept: "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            onDataUpdate(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []); // Ejecuta solo al montar el componente

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
    );
};

export default FiltroPeriodo;
