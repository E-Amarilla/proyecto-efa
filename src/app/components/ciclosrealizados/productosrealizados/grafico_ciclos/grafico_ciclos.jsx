import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import Image from "next/image";
import crem from "./IMG/creminox.png";

// Generar colores aleatorios en formato hexadecimal #RRGGBB
const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Grafico1 = ({ productos }) => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef([]);
    const productColors = useRef({}); // Almacenar colores únicos para cada producto
    const [tooltip, setTooltip] = useState({ display: false, x: 0, y: 0, data: [] });

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

        productos.forEach((producto) => {
            if (!productColors.current[producto.nombreProducto]) {
                productColors.current[producto.nombreProducto] = getRandomColor();
            }

            const lineSeries = chart.addLineSeries({
                color: productColors.current[producto.nombreProducto],
                lineWidth: 2,
            });

            // Convertir las fechas a timestamp Unix
            const seriesData = producto.data.map((point) => ({
                time: Math.floor(Date.parse(point.x) / 1000), // Convertir a timestamp en segundos
                value: point.y,
            }));

            lineSeries.setData(seriesData);
            seriesRef.current.push(lineSeries);
        });

        // Actualizar tooltip al mover el crosshair
        chart.subscribeCrosshairMove((param) => {
            if (!param || !param.time) {
                setTooltip((prev) => ({ ...prev, display: false }));
                return;
            }

            const time = param.time;

            const newTooltipData = productos.map((producto, index) => {
                const series = seriesRef.current[index];
                const dataPoint = param.seriesData.get(series);
                return {
                    name: producto.nombreProducto,
                    value: dataPoint ? dataPoint.value : 0, // Si no hay valor, mostramos 0
                    color: productColors.current[producto.nombreProducto],
                };
            });

            const shiftedCoordinateX = Math.max(
                0,
                Math.min(chartContainerRef.current.clientWidth - 100, param.point.x - 50)
            );

            const coordinateY = Math.max(0, Math.min(chartContainerRef.current.clientHeight - 80, param.point.y - 80));

            setTooltip({
                display: true,
                x: shiftedCoordinateX,
                y: coordinateY,
                data: newTooltipData,
            });
        });

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
        <div style={{ position: "relative", width: "100%", height: "450px" }}>
            {/* Encabezado con los productos */}
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
                {productos.map((producto) => (
                    <div
                        key={producto.nombreProducto}
                        style={{
                            color: productColors.current[producto.nombreProducto] || "#ffffff",
                            fontWeight: "bold",
                        }}
                    >
                        {producto.nombreProducto}
                    </div>
                ))}
            </div>

            {/* Tooltip */}
            {tooltip.display && (
                <div
                    style={{
                        position: "absolute",
                        top: tooltip.y,
                        left: tooltip.x,
                        padding: "10px",
                        backgroundColor: "#000000", // Fondo opaco
                        color: "#ffffff",
                        border: "1px solid #ffffff",
                        borderRadius: "5px",
                        fontSize: "12px",
                        zIndex: 10,
                        pointerEvents: "none",
                    }}
                >
                    {tooltip.data.map((item) => (
                        <div key={item.name} style={{ color: item.color }}>
                            {item.name}: {item.value.toFixed(2)}
                        </div>
                    ))}
                </div>
            )}

            {/* Contenedor del gráfico */}
            <div ref={chartContainerRef} style={{ width: "100%", height: "400px" }} />

            {/* Marca de agua */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                    opacity: 0.2,
                    pointerEvents: "none",
                    width: "50%",
                    height: "50%",
                }}
            >
                <Image src={crem} alt="Creminox" layout="fill" objectFit="contain" />
            </div>
        </div>
    );
};

export default Grafico1;
