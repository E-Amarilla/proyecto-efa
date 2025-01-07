import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import Image from "next/image";
import crem from "./IMG/creminox.png";

// Generar colores dinámicos más saturados
const getRandomColor = () => {
    const r = Math.floor(Math.random() * 156) + 100; // Rojo (100-255)
    const g = Math.floor(Math.random() * 100); // Verde (0-99)
    const b = Math.floor(Math.random() * 100); // Azul (0-99)
    return `rgb(${r}, ${g}, ${b})`;
};

const Graph = ({ products }) => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef([]);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Crear o reiniciar la instancia del gráfico
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

        // Limpiar series anteriores
        seriesRef.current.forEach((series) => series.destroy());
        seriesRef.current = [];

        // Agregar series dinámicamente basado en los productos
        products.forEach((product) => {
            const lineSeries = chart.addLineSeries({
                title: `${product.nombreProducto} - Lote ${product.nroLote}`,
                color: getRandomColor(), // Usar color aleatorio
                lineWidth: 2,
            });

            const seriesData = product.data.map((point) => ({
                time: point.x, // Formato ISO
                value: point.y,
            }));

            lineSeries.setData(seriesData);
            seriesRef.current.push(lineSeries);
        });

        // Ajustar el tamaño del gráfico al redimensionar el contenedor
        const handleResize = () => {
            chart.resize(chartContainerRef.current.offsetWidth, 400);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, [products]);

    return (
        <div className="chart-container" style={{ position: "relative", width: "100%", height: "400px" }}>
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
            <div ref={chartContainerRef} className="chart-content" style={{ position: "relative", zIndex: 1 }} />
        </div>
    );
};

export default Graph;