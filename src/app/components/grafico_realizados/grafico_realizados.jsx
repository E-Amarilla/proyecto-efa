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
                    `http://192.168.0.72:8000/graficos-hsitorico/productos-realizados/?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
                    {
                        method: "GET",
                        headers: { Accept: "application/json" },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Los datos que estás recibiendo están vacios.: ${response.statusText}`);
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

        // Configuración inicial del gráfico
        const chart = createChart(containerRef.current, {
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
            handleScroll: false, // Deshabilitar scrolling inicialmente
            handleScale: false, // Deshabilitar zoom inicialmente
        });
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

        // Crear tooltip
        const toolTip = document.createElement('div');
        toolTip.style = `
        width: auto;
        height: auto;
        position: absolute;
        display: none;
        padding: 10px;
        box-sizing: border-box;
        font-size: 18px;
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
        containerRef.current.appendChild(toolTip);

        // Tooltip
        chart.subscribeCrosshairMove(param => {
            if (
                param.point === undefined ||
                !param.time ||
                param.point.x < 0 ||
                param.point.x > containerRef.current.clientWidth ||
                param.point.y < 0 ||
                param.point.y > containerRef.current.clientHeight
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
                        <span style="color: ${pd.series.options().color}">
                            ${Math.round(100 * pd.value) / 100} 
                            ${pd.nombre === "Peso Producto" ? "Tn" : ""}
                        </span><br />
                        <span>${dateStr}</span>
                    </div>
                    `)
                    .join('');

                toolTip.innerHTML = `<div style="font-size: 16px; line-height: 20px;">${tooltipContent}</div>`;

                const coordinateY = filteredData[0]?.series.priceToCoordinate(filteredData[0]?.value);
                const shiftedCoordinateX = param.point.x - 50;
                toolTip.style.left = `${Math.max(0, Math.min(containerRef.current.clientWidth - 150, shiftedCoordinateX))}px`;
                toolTip.style.top = `${coordinateY ? coordinateY - 50 : 0}px`;
            }
        });

        return () => {
            chart.remove();
        };
    }, []);

    useEffect(() => {
        if (!chartRef.current || !data) return;

        // Actualizar series con los datos recibidos
        const { ciclos, pesoProducto } = data;

        const dataCiclos = ciclos.map(item => ({
            time: new Date(item.fecha_fin).getTime() / 1000,
            value: item.CantidadCIclos,
        }));
        const dataPeso = pesoProducto.map(item => ({
            time: new Date(item.fecha_fin).getTime() / 1000,
            value: item.PesoTotal,
        }));

        seriesRef.current["Ciclos"].setData(dataCiclos);
        seriesRef.current["Peso Producto"].setData(dataPeso);

        // Habilitar scrolling y zoom si hay datos
        const chart = chartRef.current;
        if (dataCiclos.length > 0 || dataPeso.length > 0) {
            chart.applyOptions({
                handleScroll: true,
                handleScale: true,
            });
        } else {
            chart.applyOptions({
                handleScroll: false,
                handleScale: false,
            });
        }

        chart.timeScale().fitContent();
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
