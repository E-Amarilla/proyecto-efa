"use client";

import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import crem from "./IMG/creminox.png";

const Grafico = () => {
    const containerRef = useRef(null); // Referencia al contenedor del gráfico
    const chartRef = useRef(null); // Referencia al gráfico
    const seriesRef = useRef({}); // Referencia para almacenar las series de datos
    const [data, setData] = useState(null); // Estado para almacenar los datos del archivo JSON

    useEffect(() => {
        // Cargar datos del archivo JSON
        fetch('/data/ciclosrealizados.json')
            .then(response => response.json())
            .then(jsonData => setData(jsonData))
            .catch(error => console.error("Error al cargar el archivo JSON:", error));
    }, []);

    useEffect(() => {
        if (!containerRef.current || !data) return; // Asegurarse de que el contenedor y los datos existen

        // Configuración del gráfico
        const chartOptions = {
            layout: {
                textColor: 'white',
                background: { type: 'solid', color: 'transparent' },
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
                borderColor: 'rgba(255, 165, 0, 0.5)',
            },
            rightPriceScale: {
                visible: true,
                borderColor: 'rgba(197, 203, 206, 1)',
            }
        };

        const chart = createChart(containerRef.current, chartOptions);
        chartRef.current = chart; // Guardar la referencia del gráfico

        // Agregar fondo
        const container = containerRef.current;
        container.style.position = 'relative';
        const background = document.createElement('div');
        background.style.zIndex = -1;
        background.style.position = 'absolute';
        background.style.top = '50%';
        background.style.left = '50%';
        background.style.transform = 'translate(-50%, -50%)';
        background.style.width = '100%';
        background.style.height = '100%';
        background.style.backgroundImage = `url(${crem.src})`;
        background.style.backgroundRepeat = 'no-repeat';
        background.style.backgroundPosition = 'center';
        background.style.opacity = '0.2';
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
        containerRef.current.appendChild(toolTip);

        // Crear serie de línea para ciclos
        const lineSeriesCiclos = chart.addLineSeries({
            color: "orange",
            lineWidth: 2,
            priceScaleId: 'left',
            title:'Ciclos',
            fontSize: '18px'
        });

        // Crear serie de línea para pesoProducto
        const lineSeriesPeso = chart.addLineSeries({
            color: "blue", 
            lineWidth: 2, 
            priceScaleId: 'right',
            title:'Tn',
            fontSize: '18px'
        });

        // Guardar las referencias de las series
        seriesRef.current["Ciclos"] = lineSeriesCiclos;
        seriesRef.current["Peso Producto"] = lineSeriesPeso;

        // Datos para la serie de ciclos
        const dataCiclos = data.ciclos.map(item => ({
            time: new Date(item.fecha_fin).getTime() / 1000,
            value: item.CantidadCIclos,
        }));

        // Datos para la serie de pesoProducto
        const dataPeso = data.pesoProducto.map(item => ({
            time: new Date(item.fecha_fin).getTime() / 1000,
            value: item.PesoTotal,
        }));

        // Asignar datos a las series
        lineSeriesCiclos.setData(dataCiclos);
        lineSeriesPeso.setData(dataPeso);

        // Ajustar la escala de tiempo para mostrar todos los datos
        chart.timeScale().fitContent();

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

                toolTip.innerHTML = `<div style="font-size: 12px; line-height: 20px;">${tooltipContent}</div>`;

                const coordinateY = filteredData[0]?.series.priceToCoordinate(filteredData[0]?.value);
                const shiftedCoordinateX = param.point.x - 50;
                toolTip.style.left = `${Math.max(0, Math.min(containerRef.current.clientWidth - 150, shiftedCoordinateX))}px`;
                toolTip.style.top = `${coordinateY ? coordinateY - 50 : 0}px`;
            }
        });

        // Limpieza al desmontar el componente
        return () => {
            chart.remove();
        };
    }, [data]);

    return (
        <div
            id="container"
            ref={containerRef} // Referencia al contenedor
            style={{ width: "100%", height: "700px" }}

        ></div>
    );
};

export default Grafico;
