import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const Graph = ({ data }) => {
const chartContainerRef = useRef(null);
const chartRef = useRef(null);
const seriesRef = useRef([]);

useEffect(() => {
if (!chartContainerRef.current) return;

// Create or reset chart instance
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
    watermark: {
    visible: true,
    text: "Food Production",
    color: "rgba(255, 255, 255, 0.1)",
    fontSize: 24,
    fontStyle: "italic",
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

// Create series dynamically based on data
seriesRef.current = [];
data.forEach((seriesData, index) => {
    const lineSeries = chart.addLineSeries({
    color: seriesData.color || `hsl(${(index * 50) % 360}, 70%, 50%)`, // Unique color per series
    lineWidth: 2,
    });

    lineSeries.setData(seriesData.values);
    seriesRef.current.push(lineSeries);
});

// Resize chart on container resize
const handleResize = () => {
    chart.resize(chartContainerRef.current.offsetWidth, 400);
};

window.addEventListener("resize", handleResize);

return () => {
    window.removeEventListener("resize", handleResize);
    chart.remove();
};
}, [data]); // Re-run effect when data changes

return <div ref={chartContainerRef} className="chart-container" />;
};

export default Graph;
