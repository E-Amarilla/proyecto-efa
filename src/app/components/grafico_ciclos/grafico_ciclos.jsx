"use client";

import { useEffect, useState, useRef } from "react";
import { createChart, TickMarkType } from "lightweight-charts";
import crem from "@/assets/img/creminox.png";
import style from "./grafico_ciclos.module.css";

const COLORS = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#33FFF6", "#FFC733", "#A1FF33", "#5733FF", "#FF3333",
    "#33FFA5", "#FF6F33", "#A6FF33", "#33A1FF", "#FF33F6",
    "#F6FF33", "#33FFF3", "#FF336F", "#57FF33", "#3333FF"
];

const totalLineColor = '#2962FF';

const Grafico = ({ startDate, endDate }) => {
    const [data, setData] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const containerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef({});
    const productColors = useRef({});
    const [totalLineSeries, setTotalLineSeries] = useState(null); // Define la serie de suma total

    // Precalcular colores para los productos
    const assignColors = (productos) => {
        return productos.reduce((acc, producto, index) => {
            acc[producto.nombre] = COLORS[index % COLORS.length];
            return acc;
        }, {});
    };

    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).access_token : null;

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await fetch(
                    `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/graficos-historico/ciclos-productos/?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
                    {
                        method: "GET",
                        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
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
            rightPriceScale: {
                visible: true,
                borderColor: "white",
                autoScale: true,
                scaleMargins: { top: 0.1, bottom: 0 }, // Asegura que el mínimo sea 0
            },            
            timeScale: {
                visible: true,
                borderColor: "white" ,
                timeVisible: true,
                secondVisible: true,
                tickMarkFormatter: (time, tickMarkType, locale) => {
                    const date = new Date(time * 1000);
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    return `${hours}:${minutes}`;
                }
            },
            handleScroll: Array.isArray(data) && data.length > 0,
            handleScale: {
                mouseWheel: true, // Permitir zoom con scroll
                pinch: true, // Permitir zoom en dispositivos táctiles
                axisPressedMouseMove: false, // Deshabilitar ajuste de escala con click
            },

        };

        const chart = createChart(containerRef.current, chartOptions);
        chartRef.current = chart;

        const container = containerRef.current;
        container.style.position = "relative";
        
        // Crear y agregar el fondo
        const background = document.createElement("div");
        background.style.zIndex = "0";
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
        
        // Crear y agregar el tooltip
        const toolTip = document.createElement('div');
        toolTip.style.position = "absolute";
        toolTip.style.display = "none";
        toolTip.style.padding = "8px 12px";
        toolTip.style.boxSizing = "border-box";
        toolTip.style.fontSize = "12px";
        toolTip.style.textAlign = "left";
        toolTip.style.zIndex = "1000";
        toolTip.style.pointerEvents = "none";
        toolTip.style.border = "1px solid grey";
        toolTip.style.borderRadius = "8px";
        toolTip.style.background = "rgba(0, 0, 0, 0.8)";
        toolTip.style.color = "white";
        container.appendChild(toolTip);

        // Tooltip en crosshair move
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
                return;
            }

            // Convertir timestamp a fecha legible
            const dateStr = new Date(param.time * 1000).toLocaleString(); // Cambiado a toLocaleString()

            // Obtener los datos de cada serie
            const priceData = Object.entries(seriesRef.current).map(([nombre, series]) => {
                const data = param.seriesData.get(series);
                return {
                    value: data ? (data.value !== undefined ? data.value : data.close) : null,
                    series,
                    nombre,
                };
            }).filter(pd => pd.value !== null); // Filtramos datos nulos

            if (priceData.length === 0) {
                toolTip.style.display = 'none';
                return;
            }

            // Generar contenido del tooltip
            toolTip.innerHTML = priceData.map(pd => `
                <div style="margin-bottom: 4px;">
                    <b>${pd.nombre}</b><br />
                    <span style="color: ${pd.series.options().color}">${Math.round(100 * pd.value) / 100} kg</span><br />
                    <span>${dateStr}</span>
                </div>
            `).join('');

            // Posicionar el tooltip ARRIBA del punto señalado
            const firstSeries = priceData[0].series;
            const coordinateY = firstSeries.priceToCoordinate(priceData[0].value);

            if (coordinateY === null) {
                toolTip.style.display = 'none';
                return;
            }

            toolTip.style.display = "block";

            // Ajustamos la posición para que el tooltip esté bien alineado sin tapar el punto
            const tooltipHeight = toolTip.clientHeight; // Altura dinámica del tooltip
            const tooltipWidth = toolTip.clientWidth;
            const marginAbovePoint = 15; // Margen extra sobre el punto
            const adjustedY = coordinateY - tooltipHeight - marginAbovePoint;

            let adjustedX = param.point.x - tooltipWidth / 2;
            adjustedX = Math.max(5, Math.min(container.clientWidth - tooltipWidth - 5, adjustedX));

            toolTip.style.left = `${adjustedX}px`;
            toolTip.style.top = `${adjustedY}px`;
        });

        if (data.length > 0) {
            const totalsByDay = {};
    
            // Procesar los datos de productos
            data.forEach((producto) => {
                const lineSeries = chart.addHistogramSeries({
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
            const totalLine = chart.addAreaSeries({
                topColor: '#2962FF',
                bottomColor: 'rgba(41, 98, 255, 0.28)',
                lineColor: '#2962FF',
                lineWidth: 2,
                crossHairMarkerVisible: false,
            });

            totalLine.setData(totalSeriesData);

            // Set the total line series state
            setTotalLineSeries(totalLine);
        } else {
            // Crear una serie ficticia si no hay datos
            const dummySeries = chart.addHistogramSeries({
                color: COLORS[0],
                lineWidth: 2,
                priceScaleId: "right",
                priceLineVisible: true,
            });
            dummySeries.setData([]);
        }

        chart.timeScale().fitContent();

        return () => {
            chart.remove();
        };
    }, [data]);

    useEffect(() => {
        if (!chartRef.current || !totalLineSeries) return;

        Object.entries(seriesRef.current).forEach(([nombreProducto, lineSeries]) => {
            lineSeries.applyOptions({
                visible: visibleProducts.includes(nombreProducto),
            });
        });

        // Agregar visibilidad para la serie de suma total
        totalLineSeries.applyOptions({
            visible: visibleProducts.includes('total'),
        });
    }, [visibleProducts, totalLineSeries]);

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
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                    gap: "15px",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                    }}
                >
                    <input
                        type="checkbox"
                        checked={visibleProducts.includes('total')}
                        onChange={() => toggleProductVisibility('total')}
                    />
                    <span style={{ color: totalLineColor }}>
                        Total
                    </span>
                </div>
                {data.map((producto) => (
                    <div
                        key={producto.nombre}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "5px",
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={visibleProducts.includes(producto.nombre)}
                            onChange={() => toggleProductVisibility(producto.nombre)}
                        />
                        <span style={{ color: productColors.current[producto.nombre] || "#ffffff", display: "flex" }}>
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
