import React, { useEffect, useRef } from "react";
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

const Grafico2 = ({ products }) => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef([]);
    const productColors = useRef({}); // Almacenar colores por producto

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

        products.forEach((product) => {
            const color = getRandomColor();
            productColors.current[product.nombreProducto] = color;

            const lineSeries = chart.addLineSeries({
                title: "",
                color,
                lineWidth: 2,
            });

            const seriesData = product.data.map((point) => ({
                time: point.x,
                value: point.y,
            }));

            lineSeries.setData(seriesData);
            seriesRef.current.push(lineSeries);
        });

        // Configurar un rango de tiempo inicial
        const timeScale = chart.timeScale();
        const firstPoint = products[0]?.data[0]?.x; // Primer punto
        const lastPoint = products[0]?.data[products[0]?.data.length - 1]?.x; // Último punto
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

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, [products]);

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
                {products.map((product) => (
                    <div
                        key={product.nombreProducto}
                        style={{
                            color: productColors.current[product.nombreProducto] || "#ffffff",
                            fontWeight: "normal",
                        }}
                    >
                        {product.nombreProducto}
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

            {/* Gráfico */}
            <div ref={chartContainerRef} className="chart-content" style={{ position: "relative", zIndex: 1 }} />
        </div>
    );
};

export default Grafico2;