"use client";

import { useState, useEffect } from "react";
import style from "./Productividad.module.css";
import FiltroPeriodo from "../filtroperiodo/FiltroPeriodo.jsx";
import { useTranslation } from "react-i18next";
import { Spinner } from "@heroui/spinner";

const colors = [
  '#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A6',
  '#33FFF5', '#FF9A33', '#33FFBD', '#FF3333', '#A633FF',
  '#FFD933', '#33FFD4', '#A6FF33', '#337BFF', '#33FF76',
  '#FF3357', '#33FF8D', '#FF8633', '#FF33C5', '#33FFC5'
];

const getColorById = (id) => {
  return colors[(id - 1) % colors.length];
};

const Productividad = () => {
    const { t } = useTranslation();
    const today = new Date().toISOString().split("T")[0];

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dateRange, setDateRange] = useState({
        start: today,
        end: today,
    });

    const handleDataUpdate = (newData, startDate, endDate) => {
        setIsLoading(false);
        setData(newData);
        setDateRange({ start: startDate, end: endDate });
    };

    // Función para iniciar una nueva consulta
    const handleStartLoading = () => {
        setIsLoading(true);
    };

    const Cant_Dias = Math.ceil(
        (new Date(dateRange.end).getTime() - new Date(dateRange.start).getTime()) / (1000 * 3600 * 24) + 1
    );

    // Utiliza isLoading para determinar si mostrar "cargando" o el valor real
    const cantidadCiclosF = isLoading 
        ? t('min.cargando')
        : Array.isArray(data?.ProductosRealizados)
            ? data.ProductosRealizados.reduce((total, producto) => total + producto.cantidadCiclos, 0)
            : 0;
            
    const PesoTotalCiclos = isLoading 
        ? t('min.cargando') 
        : data?.PesoTotalCiclos !== undefined && data?.PesoTotalCiclos !== null
            ? data.PesoTotalCiclos.toFixed(2)
            : "0.00";
        
    const Horas_Uso = isLoading
        ? t('min.cargando')
        : Array.isArray(data?.ProductosRealizados)
            ? data.ProductosRealizados.reduce((acc, prod) => acc + prod.tiempoTotal, 0)
            : 0;

    const Promedio_Horas = (Horas_Uso, Cant_Dias) =>
        isLoading 
            ? t('min.cargando') 
            : Horas_Uso !== t('min.cargando') 
                ? ((Horas_Uso/60) / (Cant_Dias)).toFixed(2) 
                : "0.00";

    const datos = [
        { id: 1, titulo: t('min.ciclosRealizados'), dato: cantidadCiclosF },
        { id: 2, titulo: t('min.produccionTotal'), dato: (
            <span>
              {PesoTotalCiclos} <span className="text-lg">Tn</span>
            </span>
          ) },
        { id: 3, titulo: t('min.promedioUsoDiario'), dato: (
            <span>
              {Promedio_Horas(Horas_Uso, Cant_Dias)} <span className="text-lg">Hs</span>
            </span>
          ) },
    ];

    const productos = data?.ProductosRealizados?.map((producto) => {
        const porcentaje = ((producto.pesoTotal * 100) / PesoTotalCiclos / 1000);
        const pesoEnToneladas = (producto.pesoTotal / 1000).toFixed(1) + " Tn";
        return {
            nombre: producto.NombreProducto,
            peso: pesoEnToneladas, 
            cantidadCiclos: producto.cantidadCiclos,
            porcentaje: porcentaje.toFixed(2),
            color: getColorById(producto.id_recetario),
        };
    }) ?? [];
    

    return (
        <div id="ProductividadSection" className={style.all}>
            <div className={style.productividad}>
                {isLoading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 rounded-[15px] z-10">
                        <Spinner label={t('min.cargando')} />
                    </div>
                )}
                <h2 className={style.titulo}>{t('mayus.productividad')}</h2>
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
                    <h3 className={style.textoBarra}>% {t('min.productoRealizado')}</h3>
                    <div className={style.barra}>
                        {productos.map((producto, index) => (
                            <div
                                key={index}
                                className={`${style.segmento} segmento-tooltip`}
                                style={{
                                    width: `${producto.porcentaje}%`,
                                    backgroundColor: producto.color,
                                }}
                                data-tooltip={`Ciclos: ${producto.cantidadCiclos}`}
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
                                <p className={style.prods}>
                                    {`${producto.nombre} - ${producto.porcentaje}%`} ({isLoading ? "NaN Tn" : producto.peso})
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`${style.filtro} ocultar-en-pdf`}>
                <FiltroPeriodo 
                    onDataUpdate={handleDataUpdate} 
                    onStartLoading={handleStartLoading} 
                />
            </div>
        </div>
    );
};

export default Productividad;
