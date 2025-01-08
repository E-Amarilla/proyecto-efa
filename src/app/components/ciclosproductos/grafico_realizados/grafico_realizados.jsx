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

        const seriesPeso = chart.addLineSeries({
            color: "blue",
            lineWidth: 2,
        });

        const seriesCiclos = chart.addLineSeries({
            color: "orange",
            lineWidth: 2,
        });

        const dataPeso = [
            { time: 1640995200, value: 70 },
            { time: 1641081600, value: 72 },
            { time: 1641168000, value: 74 },
        ];

        const dataCiclos = [
            { time: 1640995200, value: 5 },
            { time: 1641081600, value: 6 },
            { time: 1641168000, value: 5.5 },
        ];

        seriesPeso.setData(dataPeso);
        seriesCiclos.setData(dataCiclos);

        // Configurar el zoom inicial centrado en los datos más recientes
        const latestTime = Math.max(
            dataPeso[dataPeso.length - 1]?.time,
            dataCiclos[dataCiclos.length - 1]?.time
        );

        chart.timeScale().setVisibleRange({
            from: latestTime - 3600 * 24 * 3, // 3 días antes
            to: latestTime + 3600 * 24 * 1, // 1 día después
        });

        // Obtener valores actuales y actualizar encabezados
        setCurrentValues({
            peso: dataPeso[dataPeso.length - 1]?.value || 0,
            ciclos: dataCiclos[dataCiclos.length - 1]?.value || 0,
        });

        // Actualizar el tooltip con el movimiento del crosshair
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

            const shiftedCoordinateX = Math.max(
                0,
                Math.min(chartContainerRef.current.clientWidth - 100, param.point?.x - 50 || 0)
            );

            setTooltip({
                display: true,
                x: shiftedCoordinateX,
                y: param.point?.y || 0,
                pesoValue,
                ciclosValue,
                date: dateStr,
            });
        });

        return () => {
            chart.remove();
        };
    }, []);

    return (
        <div style={{ position: "relative" }}>
            {/* Títulos dinámicos con los valores actuales */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    marginBottom: "10px",
                    color: "#ffffff",
                    fontWeight: "bold",
                }}
            >
                <div style={{ color: "blue", fontSize: "25px"  }}>Peso</div>
                <div style={{ color: "orange", fontSize: "25px" }}>Ciclos</div>
            </div>

            {/* Imagen como marca de agua */}
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

            {/* Tooltip */}
            {tooltip.display && (
                <div
                    style={{
                        position: "absolute",
                        top: tooltip.y,
                        left: tooltip.x,
                        width: "auto",
                        height: "auto",
                        padding: "8px",
                        boxSizing: "border-box",
                        fontSize: "16px",
                        textAlign: "left",
                        zIndex: 1000,
                        backgroundColor: "black",
                        color: "white",
                        border: "1px solid #2962FF",
                        borderRadius: "2px",
                        pointerEvents: "none",
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
