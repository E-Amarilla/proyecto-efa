"use client";

import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import Image from "next/image";
import crem from "./IMG/creminox.png";

const Grafico = () => {
    const chartContainerRef = useRef(null);
    const [tooltip, setTooltip] = useState({
        display: false,
        x: 0,
        y: 0,
        pesoValue: 0,
        ciclosValue: 0,
        date: "",
    });
    const [currentValues, setCurrentValues] = useState({ peso: 0, ciclos: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("data/cycles.json");
                const data = await response.json();

                const dataPeso = [];
                const dataCiclos = [];

                // Leer los datos del archivo JSON
                data.forEach((recetario) => {
                    recetario.ciclos.forEach((ciclo) => {
                        const time = Math.floor(
                            new Date(ciclo.fecha_fin).getTime() / 1000
                        );
                        dataPeso.push({ time, value: ciclo.pesoTotal });
                        dataCiclos.push({ time, value: ciclo.id_ciclo });
                    });
                });

                // Ordenar los datos por la propiedad 'time'
                dataPeso.sort((a, b) => a.time - b.time);
                dataCiclos.sort((a, b) => a.time - b.time);

                initializeChart(dataPeso, dataCiclos);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        const initializeChart = (dataPeso, dataCiclos) => {
            const chart = createChart(chartContainerRef.current, {
                leftPriceScale: {
                    visible: true,
                    borderColor: 'rgba(255, 165, 0, 0.5)',
                },
                rightPriceScale: {
                    visible: true,
                    borderColor: 'rgba(197, 203, 206, 1)',
                },
                width: chartContainerRef.current.offsetWidth,
                height: 400,
                layout: {
                    background: { type: "solid", color: "#131313" },
                    textColor: "#d9d9d9",
                },
                grid: {
                    vertLines: { color: "rgba(255, 255, 255, 0.1)" },
                    horzLines: { color: "rgba(255, 255, 255, 0.1)" },
                },
                crosshair: { mode: 1 },
                timeScale: { borderColor: "#ffffff" },
                
            });

            const seriesPeso = chart.addLineSeries({ color: "blue", lineWidth: 2, priceScaleId: 'right' });
            const seriesCiclos = chart.addLineSeries({ color: "orange", lineWidth: 2, priceScaleId: 'left' });

            seriesPeso.setData(dataPeso);
            seriesCiclos.setData(dataCiclos);

            const latestTime = Math.max(
                dataPeso[dataPeso.length - 1]?.time,
                dataCiclos[dataCiclos.length - 1]?.time
            );

            chart.timeScale().setVisibleRange({
                from: latestTime - 3600 * 24 * 3,
                to: latestTime + 3600 * 24 * 1,
            });

            setCurrentValues({
                peso: dataPeso[dataPeso.length - 1]?.value || 0,
                ciclos: dataCiclos[dataCiclos.length - 1]?.value || 0,
            });

            chart.subscribeCrosshairMove((param) => {
                if (!param || !param.time) {
                    setTooltip((prev) => ({ ...prev, display: false }));
                    return;
                }

                const time = param.time;
                const dataPesoPoint = param.seriesData.get(seriesPeso);
                const dataCiclosPoint = param.seriesData.get(seriesCiclos);
                const dateStr = new Date(time * 1000).toLocaleDateString();

                const pesoValue = dataPesoPoint ? dataPesoPoint.value : 0;
                const ciclosValue = dataCiclosPoint ? dataCiclosPoint.value : 0;

                const xCoordinate = chart.timeScale().timeToCoordinate(time);
                const pesoCoordinate = seriesPeso.priceToCoordinate(pesoValue);
                const ciclosCoordinate = seriesCiclos.priceToCoordinate(ciclosValue);

                if (xCoordinate === null || pesoCoordinate === null || ciclosCoordinate === null) {
                    setTooltip((prev) => ({ ...prev, display: false }));
                    return;
                }

                setTooltip({
                    display: true,
                    x: xCoordinate - 50,
                    y: Math.min(pesoCoordinate, ciclosCoordinate) - 50,
                    pesoValue,
                    ciclosValue,
                    date: dateStr,
                });
            });

            return () => chart.remove();
        };

        fetchData();
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    marginBottom: "10px",
                    color: "#ffffff",
                }}
            >
                <div style={{ color: "blue", fontSize: "20px" }}>Peso</div>
                <div style={{ color: "orange", fontSize: "20px" }}>Ciclos</div>
            </div>

            <Image
                src={crem}
                alt="Creminox"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2,
                    opacity: 0.2,
                    pointerEvents: "none",
                }}
            />

            {tooltip.display && (
                <div
                    style={{
                        position: "absolute",
                        top: tooltip.y,
                        left: tooltip.x,
                        padding: "8px",
                        fontSize: "16px",
                        backgroundColor: "black",
                        color: "white",
                        border: "1px solid #2962FF",
                        borderRadius: "2px",
                        pointerEvents: "none",
                        zIndex: 999,
                    }}
                >
                    <div style={{ color: "#2962FF" }}>
                        Peso: {Math.round(tooltip.pesoValue * 100) / 100} kg
                    </div>
                    <div style={{ color: "#FFA500" }}>
                        Ciclos: {Math.round(tooltip.ciclosValue * 100) / 100}
                    </div>
                    <div style={{ color: "white" }}>{tooltip.date}</div>
                </div>
            )}

            <div ref={chartContainerRef} />
        </div>
    );
};

export default Grafico;
