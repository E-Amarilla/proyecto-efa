import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import Image from "next/image";
import crem from "./IMG/creminox.png";

// Generar colores aleatorios en formato hexadecimal #RRGGBB
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Grafico1 = ({ productos }) => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef([]);
    const productColors = useRef({}); // Almacenar colores por producto
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
            const color = getRandomColor();
            productColors.current[producto.nombreProducto] = color;

            const lineSeries = chart.addLineSeries({
                title: "",
                color,
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

        // Configurar un rango de tiempo inicial
        const timeScale = chart.timeScale();
        const firstPoint = productos[0]?.data[0]?.x; // Primer punto
        const lastPoint = productos[0]?.data[productos[0]?.data.length - 1]?.x; // Último punto
        if (firstPoint && lastPoint) {
            const range = (new Date(lastPoint) - new Date(firstPoint)) / 2; // Zoom a la mitad del rango
            timeScale.setVisibleRange({
                from: new Date(firstPoint).getTime() / 1000, // Timestamp en segundos
                to: new Date(firstPoint).getTime() / 1000 + range,
            });
        }

        const handleResize = () => {
            chart.resize(chartContainerRef.current.offsetWidth, 400);
        };

        // Actualizar tooltip al mover el crosshair
        chart.subscribeCrosshairMove((param) => {
            if (!param || !param.time) {
                setTooltip((prev) => ({ ...prev, display: false }));
                return;
            }

            const time = param.time;

            const newTooltipData = productos.map((producto) => {
                const series = seriesRef.current.find((s) => s.options.color === productColors.current[producto.nombreProducto]);
                const dataPoint = param.seriesData.get(series); // Aquí obtenemos el punto de la serie correctamente
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
                transform: "translate(-50%, -50%)", // Centrar vertical y horizontalmente
                width: "50%",
                height: "50%",
                zIndex: 2, // Aumentar el z-index
                opacity: 0.2, // Aumentar la opacidad
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
                        padding: "8px",
                        backgroundColor: "black",
                        color: "white",
                        borderRadius: "5px",
                        border: "1px solid #2962FF",
                        zIndex: 1000,
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

            {/* Gráfico */}
            <div ref={chartContainerRef} className="chart-content" style={{ position: "relative", zIndex: 1 }} />
        </div>
    );
};

export default Grafico1;
