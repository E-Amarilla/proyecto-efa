import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import Image from "next/image";
import crem from "./IMG/creminox.png";

const Grafico1 = ({ datos }) => {
    const chartContainerRef = useRef(null);
    const [isClient, setIsClient] = useState(false); // Track client-side rendering

    useEffect(() => {
        setIsClient(true); // Component is now rendered on the client side
    }, []);

    useEffect(() => {
        if (!isClient || !chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.offsetWidth || 600,
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
        const lineSeries1 = chart.addLineSeries({ color: "blue", lineWidth: 2 });
        lineSeries1.setData([
            { time: "2023-01-01", value: 50 },
            { time: "2023-02-01", value: 80 },
            { time: "2023-03-01", value: 75 },
            { time: "2023-04-01", value: 100 },
            { time: "2023-05-01", value: 90 },
            { time: "2023-06-01", value: 85 },
            { time: "2023-07-01", value: 95 },
            { time: "2023-08-01", value: 110 },
            { time: "2023-09-01", value: 105 },
            { time: "2023-10-01", value: 115 },
            { time: "2023-11-01", value: 120 },
            { time: "2023-12-01", value: 125 },
            { time: "2024-01-01", value: 130 },
            { time: "2024-02-01", value: 135 },
            { time: "2024-03-01", value: 140 },
            { time: "2024-04-01", value: 145 },
            { time: "2024-05-01", value: 150 },
            { time: "2024-06-01", value: 155 },
            { time: "2024-07-01", value: 160 },
            { time: "2024-08-01", value: 165 },
        ]);

        const lineSeries2 = chart.addLineSeries({ color: "orange", lineWidth: 2 });
        lineSeries2.setData([
            { time: "2023-01-01", value: 30 },
            { time: "2023-02-01", value: 60 },
            { time: "2023-03-01", value: 55 },
            { time: "2023-04-01", value: 90 },
            { time: "2023-05-01", value: 85 },
            { time: "2023-06-01", value: 80 },
            { time: "2023-07-01", value: 95 },
            { time: "2023-08-01", value: 100 },
            { time: "2023-09-01", value: 105 },
            { time: "2023-10-01", value: 110 },
            { time: "2023-11-01", value: 115 },
            { time: "2023-12-01", value: 120 },
            { time: "2024-01-01", value: 125 },
            { time: "2024-02-01", value: 130 },
            { time: "2024-03-01", value: 135 },
            { time: "2024-04-01", value: 140 },
            { time: "2024-05-01", value: 145 },
            { time: "2024-06-01", value: 150 },
            { time: "2024-07-01", value: 155 },
            { time: "2024-08-01", value: 160 },
        ]);

        // Configurar el rango inicial
        const timeScale = chart.timeScale();
        timeScale.setVisibleRange({
            from: new Date("2023-01-01").getTime() / 1000,
            to: new Date("2023-06-01").getTime() / 1000,
        });

        return () => chart.remove();
        }, [isClient]);

    if (!isClient) {
        return null; // Avoid rendering on the server
    }

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <div
                ref={chartContainerRef}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%",
                    height: "50%",
                    zIndex: 2,
                    opacity: 0.2,
                    pointerEvents: "none",
                }}
            >
                <Image
                    src={crem}
                    alt="Creminox"
                    fill
                    style={{ objectFit: "contain" }}
                />
            </div>
        </div>
    );
};

export default Grafico1;