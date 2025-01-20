"use client";

import { useEffect, useState, useRef } from "react";
import { createChart } from "lightweight-charts";
import crem from "@/assets/img/creminox.png";
import style from "./grafico_ciclos.module.css"

const COLORS = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#33FFF6", "#FFC733", "#A1FF33", "#5733FF", "#FF3333",
    "#33FFA5", "#FF6F33", "#A6FF33", "#33A1FF", "#FF33F6",
    "#F6FF33", "#33FFF3", "#FF336F", "#57FF33", "#3333FF"
];

const Grafico = ({ startDate, endDate }) => {
    const [data, setData] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const containerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef({});
    const productColors = useRef({});

    // Precalcular colores para los productos
    const assignColors = (productos) => {
        return productos.reduce((acc, producto, index) => {
            acc[producto.nombre] = COLORS[index % COLORS.length];
            return acc;
        }, {});
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await fetch(
                    `http://192.168.0.150:8000/graficos-historico/ciclos-productos/?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
                    {
                        method: "GET",
                        headers: { Accept: "application/json" },
                    }
                );
    
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
    
                const productos = await response.json();
    
                // Asignar colores a los productos
                productColors.current = assignColors(productos);
                setData(productos);
                setVisibleProducts(productos.map((p) => p.nombre)); // Mostrar todas las líneas inicialmente
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        if (startDate && endDate) {
            fetchInitialData();
        }
    }, [startDate, endDate]); // Asegura que se ejecute al cambiar las fechas    

    useEffect(() => {
        const chartOptions = {
            layout: {
                textColor: "white",
                background: { type: "solid", color: "transparent" },
            },
            crosshair: {
                mode: 1,
                horzLine: { visible: false },
                vertLine: { labelVisible: false },
            },
            grid: {
                visible: true,
                vertLines: { color: "rgba(255, 255, 255, 0.1)" },
                horzLines: { color: "rgba(255, 255, 255, 0.1)" },
            },
            rightPriceScale: { visible: true, borderColor: "white" },
            timeScale: { visible: true, borderColor: "white" },
            handleScroll: false, // Deshabilitar scrolling inicialmente
            handleScale: false, // Deshabilitar zoom inicialmente
        };

        const chart = createChart(containerRef.current, chartOptions);
        chartRef.current = chart;

        const container = containerRef.current;
        container.style.position = "relative";

        const background = document.createElement("div");
        background.style.zIndex = 1;
        background.style.position = "absolute";
        background.style.top = "50%";
        background.style.left = "50%";
        background.style.transform = "translate(-50%, -65%) scale(0.7)";
        background.style.width = "100%";
        background.style.height = "100%";
        background.style.backgroundImage = `url(${crem.src})`;
        background.style.backgroundRepeat = "no-repeat";
        background.style.backgroundPosition = "center";
        background.style.opacity = "0.05";
        container.appendChild(background);

        if (data.length > 0) {
            data.forEach((producto) => {
                const lineSeries = chart.addLineSeries({
                    color: productColors.current[producto.nombre],
                    lineWidth: 2,
                    priceScaleId: "right",
                    priceLineVisible: false,
                });

                const formattedData = producto.ciclo.map((ciclo) => ({
                    time: ciclo.fecha_fin,
                    value: ciclo.pesoTotal,
                }));
                lineSeries.setData(formattedData);

                seriesRef.current[producto.nombre] = lineSeries;
            });
        }
        else {
            // Crear una serie ficticia si no hay datos
            const dummySeries = chart.addLineSeries({
                color: COLORS[0],
                lineWidth: 2,
                priceScaleId: "right",
                priceLineVisible: false,
            });
            dummySeries.setData([]);
        }

        chart.timeScale().fitContent();

        return () => {
            chart.remove();
        };
    }, [data]);

    useEffect(() => {
        if (!chartRef.current) return;

        Object.entries(seriesRef.current).forEach(([nombreProducto, lineSeries]) => {
            lineSeries.applyOptions({
                visible: visibleProducts.includes(nombreProducto),
            });
        });
    }, [visibleProducts]);

    const toggleProductVisibility = (nombreProducto) => {
        setVisibleProducts((prev) =>
            prev.includes(nombreProducto)
                ? prev.filter((p) => p !== nombreProducto)
                : [...prev, nombreProducto]
        );
    };

    return (
        <div
            id="container-wrapper"
            style={{
                width: "100%",
                minHeight: "400px",
                maxHeight: "auto",
                backgroundColor: "#131313",
                borderRadius: "15px",
                padding: "20px",
            }}
        >
            <div style={{ display: "flex", justifyContent: "left", textAlign: "left", flexDirection: "column" }}>
                <h1 style={{ margin: "0px", color: "#d9d9d9", fontWeight: "bold" }}>PRODUCTOS REALIZADOS</h1>
                <div className={style.fechaContainer}>
                    <span className={style.fecha}>{new Date(startDate).toISOString().split("T")[0]}</span>
                    <span className={style.separator}> - </span>
                    <span className={style.fecha}>{new Date(endDate).toISOString().split("T")[0]}</span>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                    flexWrap: "wrap",
                    gap: "15px",
                }}
            >
                {data.map((producto) => (
                    <div
                        key={producto.nombre}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={visibleProducts.includes(producto.nombre)}
                            onChange={() => toggleProductVisibility(producto.nombre)}
                        />
                        <span style={{ color: productColors.current[producto.nombre] || "#ffffff" }}>
                            {producto.nombre}
                        </span>
                    </div>
                ))}
            </div>
            <div id="container" style={{ width: "100%", height: "100%" }} ref={containerRef}></div>
        </div>
    );
};

export default Grafico;
