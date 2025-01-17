"use client";
import { useEffect, useState, useRef } from "react";
import { createChart } from "lightweight-charts";
import crem from "@/assets/img/creminox.png";

const COLORS = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#33FFF6", "#FFC733", "#A1FF33", "#5733FF", "#FF3333",
    "#33FFA5", "#FF6F33", "#A6FF33", "#33A1FF", "#FF33F6",
    "#F6FF33", "#33FFF3", "#FF336F", "#57FF33", "#3333FF"
];

const Grafico = ({startDate, endDate}) => {
    console.log("Datos recibidos en GraficoCiclos:", { startDate, endDate });

    const [data, setData] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const containerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef({});
    const productColors = useRef({});

    useEffect(() => {
        const fetchInitialData = async (startDate, endDate) => {
            try {
                const response = await fetch(
                    `http://192.168.0.72:8000/graficos-hsitorico/ciclos-productos/?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
                    {
                        method: "GET",
                        headers: { Accept: "application/json" },
                    }
                );

                if (!response.ok) {
                    throw new Error(`El array que estas recibiendo está vacio: ${response.statusText}`);
                }

                const productos = await response.json();
                setData(productos);
                setVisibleProducts(productos.map(p => p.nombre)); // Mostrar todas las líneas inicialmente

            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };

        fetchInitialData(startDate, endDate);
    }, [startDate, endDate]);

    useEffect(() => {
        const chartOptions = {
            layout: {
                textColor: 'white',
                background: { type: 'solid', color: 'transparent' },
            },
            crosshair: {
                mode: data.length > 0 ? 1 : 0, // 1 = crosshair activo, 0 = desactivado
                horzLine: { visible: false },
                vertLine: { labelVisible: false },
            },
            grid: {
                vertLines: { color: "rgba(255, 255, 255, 0.1)" },
                horzLines: { color: "rgba(255, 255, 255, 0.1)" },
            },
            handleScroll: data.length > 0, // Activar/desactivar scrolling
            handleScale: data.length > 0, // Activar/desactivar zoom
        };

        const chart = createChart(containerRef.current, chartOptions);
        chartRef.current = chart;

        const container = containerRef.current;
        container.style.position = 'relative';
        const background = document.createElement('div');
        background.style.zIndex = 1;
        background.style.position = 'absolute';
        background.style.top = '50%';
        background.style.left = '50%';
        background.style.transform = 'translate(-50%, -65%) scale(0.8)';
        background.style.width = '100%';
        background.style.height = '100%';
        background.style.backgroundImage = `url(${crem.src})`;
        background.style.backgroundRepeat = 'no-repeat';
        background.style.backgroundPosition = 'center';
        background.style.opacity = '0.05';
        container.appendChild(background);

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
        container.appendChild(toolTip);

        if (data.length > 0) {
            data.forEach((producto, index) => {
                const lineSeries = chart.addLineSeries({
                    color: COLORS[index % COLORS.length],
                    lineWidth: 2,
                    priceLineVisible: false,
                });
                const formattedData = producto.ciclo.map(ciclo => ({
                    time: ciclo.fecha_fin,
                    value: ciclo.pesoTotal,
                }));
                formattedData.sort((a, b) => a.time - b.time);
                lineSeries.setData(formattedData);

                seriesRef.current[producto.nombre] = lineSeries;
                productColors.current[producto.nombre] = COLORS[index % COLORS.length];
            });
        }

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
                            <span style="color: ${pd.series.options().color}">${Math.round(100 * pd.value) / 100} Tn</span><br />
                            <span>${dateStr}</span>
                        </div>
                    `)
                    .join('');

                toolTip.innerHTML = `<div style="font-size: 12px; line-height: 20px;">${tooltipContent}</div>`;

                const coordinateY = filteredData[0].series.priceToCoordinate(filteredData[0].value);
                const shiftedCoordinateX = param.point.x - 50;
                toolTip.style.left = `${Math.max(0, Math.min(container.clientWidth - 150, shiftedCoordinateX))}px`;
                toolTip.style.top = `${coordinateY - 50}px`;
            }
        });

        chart.timeScale().fitContent();

        return () => {
            chart.remove();
        };
    }, [data]);

    const toggleProductVisibility = (nombreProducto) => {
        setVisibleProducts((prev) =>
            prev.includes(nombreProducto)
                ? prev.filter((p) => p !== nombreProducto)
                : [...prev, nombreProducto]
        );
    };

    useEffect(() => {
        if (!chartRef.current) return;
        Object.entries(seriesRef.current).forEach(([nombreProducto, lineSeries]) => {
            lineSeries.applyOptions({
                visible: visibleProducts.includes(nombreProducto),
            });
        });
    }, [visibleProducts]);

    return (
        <div
            id="container-wrapper"   
            style={{ width: "100%", minHeight: "500px", maxHeight: "auto", backgroundColor: "#131313", borderRadius: "15px", padding: "20px"}}
        >
            <div style={{ display: "flex", justifyContent: "left", textAlign: "left", flexDirection: "column" }}>
                <h1 style={{ margin: "0px", color:"#d9d9d9", fontWeight: "bold" }}>PRODUCTOS REALIZADOS</h1>
                <h1 style={{ margin: "0px", color:"orange" }}>POR PERIODO</h1>
            </div>
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
                {data.map((producto) => (
                    <div
                        key={producto.nombre}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={visibleProducts.includes(producto.nombre)}
                            onChange={() => toggleProductVisibility(producto.nombre)}
                        />
                        <span style={{ color: productColors.current[producto.nombre] || "#ffffff" }}>
                            {producto.nombre}
                        </span>
                    </div>
                ))}
            </div>

            <div id="container" style={{ width: "100%", height: "calc(100% - 100px)" }} ref={containerRef}></div>
        </div>
    );
};

export default Grafico;
