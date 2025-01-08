import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import Image from "next/image";
import crem from "./IMG/creminox.png";

// Lista de colores diferenciables
const COLORS = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#33FFF6", "#FFC733", "#A1FF33", "#5733FF", "#FF3333",
    "#33FFA5", "#FF6F33", "#A6FF33", "#33A1FF", "#FF33F6",
    "#F6FF33", "#33FFF3", "#FF336F", "#57FF33", "#3333FF"
];

const Grafico1 = ({ productos }) => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef([]);
    const productColors = useRef({});
    const [tooltip, setTooltip] = useState({
        display: false,
        x: 0,
        y: 0,
        values: [],
        date: "",
    });

    useEffect(() => {
        if (!chartContainerRef.current) return;

        if (chartRef.current) {
            chartRef.current.remove();
        }

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.offsetWidth,
            height: 400,
            layout: {
                background: { type: "solid", color: "#131313" },
                textColor: "#ffffff",
            },
            grid: {
                vertLines: { color: "rgba(255, 255, 255, 0.1)" },
                horzLines: { color: "rgba(255, 255, 255, 0.1)" },
            },
            crosshair: {
                mode: 1,
            },
            timeScale: {
                borderColor: "#ffffff",
            },
        });

        chartRef.current = chart;

        seriesRef.current.forEach((series) => series.destroy());
        seriesRef.current = [];

        let lastTimestamp = null;

        productos.forEach((producto, index) => {
            const color = COLORS[index % COLORS.length];
            productColors.current[producto.nombreProducto] = color;

            const lineSeries = chart.addLineSeries({
                title: "",
                color,
                lineWidth: 2,
            });

            const seriesData = producto.data.map((point) => {
                const timestamp = Math.floor(Date.parse(point.x) / 1000);
                lastTimestamp = Math.max(lastTimestamp || 0, timestamp);
                return {
                    time: timestamp,
                    value: point.y,
                };
            });

            lineSeries.setData(seriesData);
            seriesRef.current.push({ lineSeries, producto });

            // Suscribirse al movimiento del crosshair
            chart.subscribeCrosshairMove((param) => {
                if (!param || !param.time) {
                    setTooltip({ display: false, x: 0, y: 0, values: [], date: "" });
                    return;
                }

                const time = new Date(param.time * 1000).toLocaleDateString();
                const values = seriesRef.current.map(({ lineSeries, producto }) => {
                    const data = param.seriesData.get(lineSeries);
                    return {
                        nombreProducto: producto.nombreProducto,
                        color: productColors.current[producto.nombreProducto],
                        value: data ? data.value : 0,
                    };
                });

                setTooltip({
                    display: true,
                    x: param.point.x,
                    y: param.point.y,
                    values,
                    date: time,
                });
            });
        });

        // Ajustar el rango visible al último dato
        if (lastTimestamp) {
            chart.timeScale().setVisibleRange({
                from: lastTimestamp - 30 * 24 * 60 * 60, // Últimos 30 días
                to: lastTimestamp,
            });
        }

        const handleResize = () => {
            chart.resize(chartContainerRef.current.offsetWidth, 400);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, [productos]);

    return (
        <div className="chart-container" style={{ position: "relative", width: "100%", height: "450px" }}>
            {/* Encabezado con los productos */}
            <div className="products-header" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10px",
                flexWrap: "wrap",
                gap: "15px",
            }}>
                {productos.map((producto) => (
                    <div
                        key={producto.nombreProducto}
                        style={{
                            color: productColors.current[producto.nombreProducto] || "#ffffff",
                            fontWeight: "normal",
                        }}
                    >
                        {producto.nombreProducto}
                    </div>
                ))}
            </div>

            {/* Marca de agua */}
            <div className="watermark-container" style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "50%",
                height: "50%",
                zIndex: 2,
                opacity: 0.2,
                pointerEvents: "none",
            }}>
                <Image
                    src={crem}
                    alt="Creminox"
                    layout="fill"
                    objectFit="contain"
                />
            </div>

            {/* Tooltip */}
            {tooltip.display && (
                <div
                    style={{
                        position: "absolute",
                        top: tooltip.y,
                        left: tooltip.x,
                        background: "#000",
                        color: "#fff",
                        padding: "8px",
                        borderRadius: "4px",
                        zIndex: 1000,
                        pointerEvents: "none",
                        border: "1px solid #fff",
                    }}
                >
                    <div>{tooltip.date}</div>
                    {tooltip.values.map(({ nombreProducto, color, value }) => (
                        <div key={nombreProducto} style={{ color }}>
                            {nombreProducto}: {value}
                        </div>
                    ))}
                </div>
            )}

            {/* Gráfico */}
            <div ref={chartContainerRef} className="chart-content" style={{ position: "relative", zIndex: 1 }} />
        </div>
    );
};

export default Grafico1;
