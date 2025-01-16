"use client";

import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import crem from "@/assets/img/creminox.png";

const Grafico = ({ startDate, endDate }) => {
    console.log("Datos recibidos en GraficoRealizados:", { startDate, endDate });

    const containerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef({});
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchInitialData = async (startDate, endDate) => {
            try {
                const response = await fetch(
                    `http://192.168.0.83:8000/graficos-hsitorico/productos-realizados/?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
                    {
                        method: "GET",
                        headers: { Accept: "application/json" },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                const datos = await response.json();
                setData(datos);
            } catch (error) {
                console.error("Error fetching initial data:", error);
                setData({ ciclos: [], pesoProducto: [] }); // Configurar datos vacíos en caso de error
            }
        };

        fetchInitialData(startDate, endDate);
    }, [startDate, endDate]);

    useEffect(() => {
        if (!containerRef.current) return;

        // Configuración del gráfico
        const chartOptions = {
            layout: {
                textColor: "white",
                background: { type: "solid", color: "transparent" },
            },
            crosshair: {
                horzLine: { visible: false },
                vertLine: { labelVisible: false },
            },
            grid: {
                vertLines: { color: "rgba(255, 255, 255, 0.1)" },
                horzLines: { color: "rgba(255, 255, 255, 0.1)" },
            },
            leftPriceScale: {
                visible: true,
                borderColor: "orange",
            },
            rightPriceScale: {
                visible: true,
                borderColor: "lightblue",
            },
        };

        const chart = createChart(containerRef.current, chartOptions);
        chartRef.current = chart;

        // Agregar fondo
        const container = containerRef.current;
        container.style.position = "relative";
        const background = document.createElement("div");
        background.style.zIndex = 1;
        background.style.position = "absolute";
        background.style.top = "50%";
        background.style.left = "50%";
        background.style.transform = "translate(-50%, -60%)";
        background.style.width = "100%";
        background.style.height = "100%";
        background.style.backgroundImage = `url(${crem.src})`;
        background.style.backgroundRepeat = "no-repeat";
        background.style.backgroundPosition = "center";
        background.style.opacity = "0.05";
        container.appendChild(background);

        // Crear series, incluso si no hay datos
        const lineSeriesCiclos = chart.addLineSeries({
            color: "orange",
            lineWidth: 2,
            priceScaleId: "left",
            priceLineVisible: false,
            title: "Ciclos",
        });

        const lineSeriesPeso = chart.addLineSeries({
            color: "lightblue",
            lineWidth: 2,
            priceScaleId: "right",
            priceLineVisible: false,
            title: "Tn",
        });

        seriesRef.current["Ciclos"] = lineSeriesCiclos;
        seriesRef.current["Peso Producto"] = lineSeriesPeso;

        // Asignar datos a las series
        const dataCiclos = data?.ciclos?.map(item => ({
            time: new Date(item.fecha_fin).getTime() / 1000,
            value: item.CantidadCIclos,
        })) || [];
        const dataPeso = data?.pesoProducto?.map(item => ({
            time: new Date(item.fecha_fin).getTime() / 1000,
            value: item.PesoTotal,
        })) || [];

        lineSeriesCiclos.setData(dataCiclos);
        lineSeriesPeso.setData(dataPeso);

        chart.timeScale().fitContent();

        return () => {
            chart.remove();
        };
    }, [data]);

    return (
        <div
            id="container"
            style={{
                width: "100%",
                minHeight: "500px",
                maxHeight: "auto",
                backgroundColor: "#131313",
                borderRadius: "15px",
                padding: "20px",
            }}
        >
            <div style={{ display: "flex", justifyContent: "left", flexDirection: "column" }}>
                <h1 style={{ margin: "0px", color: "#d9d9d9", fontWeight: "bold" }}>CICLOS POR PRODUCTO</h1>
                <h1 style={{ margin: "0px", color: "orange" }}>POR PERIODO</h1>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        width: "100%",
                        gap: "20px",
                    }}
                >
                    <h2 style={{ marginRight: "10px", color: "lightblue" }}>Peso (Tn)</h2>
                    <h2 style={{ marginLeft: "10px", color: "orange" }}>Ciclos</h2>
                </div>
            </div>
            <div id="chart-container" style={{ width: "100%", height: "calc(100% - 75px)" }} ref={containerRef}></div>
        </div>
    );
};

export default Grafico;
