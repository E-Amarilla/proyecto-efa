"use client";

import { useState } from "react";
import style from "./Productividad.module.css";
import FiltroPeriodo from "../filtroperiodo/FiltroPeriodo.jsx";

const Productividad = () => {
    const today = new Date().toISOString().split("T")[0];

    const [data, setData] = useState(null);
    const [dateRange, setDateRange] = useState({
        start: today,
        end: today,
    });

    const handleDataUpdate = (newData, startDate, endDate) => {
        setData(newData);
        setDateRange({ start: startDate, end: endDate });
    };

    const Cant_Dias = 7;

    const CantidadCiclosFinalizados = data?.CantidadCiclosFinalizados ?? "Cargando...";
    const PesoTotal = data?.PesoTotal ?? "Cargando...";
    const Horas_Uso =
        data?.ProductosRealizados && Array.isArray(data.ProductosRealizados)
            ? data.ProductosRealizados.reduce((acc, prod) => acc + prod.tiempoTotal, 0)
            : "Cargando...";

    const Promedio_Horas = (Horas_Uso, Cant_Dias) =>
        Horas_Uso !== "Cargando..." ? (Horas_Uso / (Cant_Dias * 24)).toFixed(2) : "Cargando...";

    const datos = [
        { id: 1, titulo: "Ciclos realizados", dato: CantidadCiclosFinalizados },
        { id: 2, titulo: "Producción total", dato: PesoTotal },
        { id: 3, titulo: "Horas de uso diarias", dato: Promedio_Horas(Horas_Uso, Cant_Dias) },
    ];

    const productos = [
        { nombre: "Jamón 3Lb", porcentaje: 15, color: "#FFA500" },
        { nombre: "Paleta 4Lb", porcentaje: 35, color: "#0000FF" },
        { nombre: "Jamón Premium 4Lb", porcentaje: 20, color: "#FF0000" },
        { nombre: "Mortadela 5Lb", porcentaje: 20, color: "#00FF00" },
        { nombre: "Paleta Premium 4Lb", porcentaje: 10, color: "#54C42D" },
    ];

    return (
        <div className={style.all}>
            <div className={style.productividad}>
                <h2 className={style.titulo}>PRODUCTIVIDAD</h2>
                <div className={style.fechaContainer}>
                    <span className={style.fecha}>{dateRange.start}</span>
                    <span className={style.separator}> - </span>
                    <span className={style.fecha}>{dateRange.end}</span>
                </div>
                <div className={style.metricaContainer}>
                    {datos.map((dato, index) => (
                        <div key={index} className={style.metrica}>
                            <p className={style.valor}>{dato.dato}</p>
                            <p className={style.descripcion}>{dato.titulo}</p>
                        </div>
                    ))}
                </div>
                <hr className={style.divisor} />
                <div className={style.barraContainer}>
                    <h3>% Producto realizado</h3>
                    <div className={style.barra}>
                        {productos.map((producto, index) => (
                            <div
                                key={index}
                                className={style.segmento}
                                style={{
                                    width: `${producto.porcentaje}%`,
                                    backgroundColor: producto.color,
                                }}
                            />
                        ))}
                    </div>
                    <div className={style.leyenda}>
                        {productos.map((producto, index) => (
                            <div key={index} className={style.itemLeyenda}>
                                <span
                                    className={style.colorMuestra}
                                    style={{ backgroundColor: producto.color }}
                                ></span>
                                <p>{`${producto.nombre} - ${producto.porcentaje}%`}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={style.filtro}>
                <FiltroPeriodo onDataUpdate={handleDataUpdate} />
            </div>
        </div>
    );
};

export default Productividad;
