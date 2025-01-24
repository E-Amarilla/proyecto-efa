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
                    `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/graficos-historico/ciclos-productos/?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
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
            handleScroll: Array.isArray(data) && data.length > 0,
            handleScale: Array.isArray(data) && data.length > 0,

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

        // Crear tooltip
        const toolTip = document.createElement('div');
        toolTip.style = `
            width: auto;
            height: auto;
            position: absolute;
            display: none;
            padding: 10px;
            box-sizing: border-box;
            font-size: 12px;
            text-align: left;
            z-index: 1000;
            pointer-events: none;
            border: 1px solid;
            border-radius: 15px;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background: black;
            color: white;
            border-color: red;
        `;
        container.appendChild(toolTip);

        // Tooltip
        chart.subscribeCrosshairMove(param => {
            if (
                param.point === undefined ||
                !param.time ||
                param.point.x < 0 ||
                param.point.x > container.clientWidth ||
                param.point.y < 0 ||
                param.point.y > container.clientHeight
            ) {
                toolTip.style.display = 'none';
            } else {
                const dateStr = new Date(param.time * 1000).toLocaleDateString();
                toolTip.style.display = 'block';

                const priceData = Object.entries(seriesRef.current).map(([nombre, series]) => {
                    const data = param.seriesData.get(series);
                    return {
                        value: data ? (data.value !== undefined ? data.value : data.close) : 0,
                        series,
                        nombre,
                    };
                });

                const filteredData = priceData.filter(pd => pd.value !== 0);
                const tooltipContent = filteredData
                    .map(pd => `
                        <div style="margin-bottom: 4px;">
                            <b>${pd.nombre}</b><br />
                            <span style="color: ${pd.series.options().color}">${Math.round(100 * pd.value) / 100} Tn</span><br />
                            <span>${dateStr}</span>
                        </div>
                    `)
                    .join('');

                toolTip.innerHTML = `<div style="font-size: 12px; line-height: 20px;">${tooltipContent}</div>`;

                const coordinateY = filteredData[0].series.priceToCoordinate(filteredData[0].value);
                const shiftedCoordinateX = param.point.x - 50;
                toolTip.style.left = `${Math.max(0, Math.min(container.clientWidth - 150, shiftedCoordinateX))}px`;
                toolTip.style.top = `${coordinateY - 50}px`;
            }
        });

        if (data.length > 0) {
            const totalsByDay = {};
    
            // Procesar los datos de productos
            data.forEach((producto) => {
                const lineSeries = chart.addLineSeries({
                    color: productColors.current[producto.nombre],
                    lineWidth: 2,
                    priceScaleId: "right",
                    priceLineVisible: false,
                });
    
                const formattedData = producto.ciclo.map((ciclo) => {
                    // Sumar la producción diaria
                    const time = ciclo.fecha_fin;
                    totalsByDay[time] = (totalsByDay[time] || 0) + ciclo.pesoTotal;
    
                    return { time, value: ciclo.pesoTotal };
                });
    
                lineSeries.setData(formattedData);
    
                seriesRef.current[producto.nombre] = lineSeries;
            });
    
            // Formatear los datos de suma diaria para la serie total
            const totalSeriesData = Object.entries(totalsByDay)
                .map(([time, value]) => ({ time: Number(time), value }))
                .sort((a, b) => a.time - b.time);
    
            // Agregar la serie de totales al gráfico
            const totalLineSeries = chart.addLineSeries({
                color: "#FFD700", // Color dorado para la línea de suma
                lineWidth: 2,
                priceScaleId: "right",
                priceLineVisible: false,
            });
            totalLineSeries.setData(totalSeriesData);
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
