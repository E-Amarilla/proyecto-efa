"use client";

import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import crem from "@/assets/img/creminox.png";
import style from "./grafico_realizados.module.css"

const Grafico = ({ startDate, endDate }) => {

    const containerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef({});
    const [data, setData] = useState(null);

    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).access_token : null;

    useEffect(() => {
        const fetchInitialData = async (startDate, endDate) => {
            try {
                const response = await fetch(
                    `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/graficos-historico/ciclos-productos/?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
                    {
                        method: "GET",
                        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
                    }
                );
        
                if (!response.ok) {
                    throw new Error(`Los datos que estás recibiendo están vacíos.: ${response.statusText}`);
                }
        
                const datos = await response.json();
                
                // Aquí agregamos el console.log para ver los datos recibidos
                console.log("Datos recibidos:", datos);
                
                setData(datos);
            } catch (error) {
                console.error("Error fetching initial data:", error);
                setData({ ciclos: [], pesoProducto: [] }); // Configurar datos vacíos en caso de error
            }
        };
        

        if (startDate && endDate) {
            fetchInitialData(startDate, endDate);
        }
    }, [startDate, endDate]); // Asegura que se ejecute al cambiar las fechas    

    useEffect(() => {
        if (!containerRef.current) return;
    
        // Configuración inicial del gráfico
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
                autoScale: true,
                borderColor: "orange",
            },
            rightPriceScale: {
                autoScale: true,
                visible: true,
                borderColor: "lightblue",
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
                mouseWheel: false, // Permitir zoom con scroll
                pinch: true, // Permitir zoom en dispositivos táctiles
                axisPressedMouseMove: false, // Deshabilitar ajuste de escala con click
            },
        };        
    
        const chart = createChart(containerRef.current, chartOptions);
        chartRef.current = chart;
    
        // Crear series
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

        // Crear tooltip
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
        containerRef.current.appendChild(toolTip);
    
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

            const tooltipContent =
            toolTip.innerHTML = priceData.map(pd => `
                <div style="margin-bottom: 4px;">
                    <b>${pd.nombre}</b><br />
                    <span style="color: ${pd.series.options().color}">
                        ${Math.round(100 * pd.value) / 100} 
                        ${pd.nombre === "Peso Producto" ? "Tn" : ""}
                    </span><br />
                </div>
            `)
            .join('');

            // Agregar el dateStr solo una vez al final del contenido
            toolTip.innerHTML = `
                <div style="font-size: 16px; line-height: 20px;">
                    ${tooltipContent}
                    <div style="margin-top: 8px;">
                        <span>${dateStr}</span>
                    </div>
                </div>
            `;

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
            adjustedX = Math.max(5, Math.min(container.clientWidth - tooltipWidth - 20, adjustedX));

            toolTip.style.left = `${adjustedX}px`;
            toolTip.style.top = `${adjustedY}px`;
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
            value: item.CiclosCompletados,
        }));
        const dataPeso = pesoProducto.map(item => ({
            time: new Date(item.fecha_fin).getTime() / 1000,
            value: item.PesoDiarioProducto/1000,
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
                <div className={style.fechaContainer}>
                    <span className={style.fecha}>{new Date(startDate).toISOString().split("T")[0]}</span>
                    <span className={style.separator}> - </span>
                    <span className={style.fecha}>{new Date(endDate).toISOString().split("T")[0]}</span>
                </div>
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
