import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';

const Grafico = ({ startDate, endDate }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [chartData, setChartData] = useState(null);

    const colores = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFF6", "#FFC733", "#A1FF33", "#5733FF", "#FF3333",
        "#33FFA5", "#FF6F33", "A6FF33", "#33A1FF", "#FF33F6",
        "#F6FF33", "#33FFF3", "#FF336F", "#57FF33", "#3333FF"
    ];

    useEffect(() => {
        Chart.register(...registerables, zoomPlugin);
    }, []);

    const fetchData = async () => {
        if (!startDate || !endDate) {
            console.error("Fechas no definidas.");
            return;
        }

        const storedUser = localStorage.getItem('user');
        const token = storedUser ? JSON.parse(storedUser).access_token : null;

        try {
            const response = await fetch(
                `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/graficos-historico/productos-realizados/?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            const productos = await response.json();

            const datasets = productos.map((producto, index) => ({
                label: producto.NombreProducto,
                backgroundColor: colores[index % colores.length],
                borderColor: `${colores[index % colores.length]}80`,
                fill: false,
                data: producto.ListaDeCiclos.map(ciclo => ({
                    x: ciclo.fecha_fin * 1000,
                    y: ciclo.pesoDesmontado
                }))
            }));

            setChartData({ datasets });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate]);

    useEffect(() => {
        if (chartData && chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstanceRef.current = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', labels: { usePointStyle: true } },
                        title: {
                            align: 'start',
                            color: '#D9D9D9',
                            display: true,
                            text: 'Peso desmontado por tiempo',
                            font: { weight: 'normal', size: 20 },
                            padding: { top: 0, bottom: 15 }
                        },
                        zoom: {
                            pan: { enabled: true, mode: 'x' },
                            zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' }
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const datasetLabel = context.dataset.label || 'Peso';
                                    const peso = context.raw.y;
                                    const date = new Date(context.raw.x);
                                    return [
                                        `Fecha: ${date.toLocaleString()}`,
                                        `${datasetLabel}: ${peso} kg`
                                    ];
                                },
                                title: () => ''
                            }
                        }
                    },
                    scales: {
                        y: {
                            title: { display: true, text: 'Peso desmontado (kg)' },
                            beginAtZero: true,
                            border: { color: '#D9D9D9' },
                            grid: { color: '#1F1F1F', tickColor: '#fff' }
                        },
                        x: {
                            type: 'time',
                            time: {
                                tooltipFormat: 'yyyy-MM-dd HH:mm:ss',
                                displayFormats: {
                                    second: 'HH:mm:ss',
                                    minute: 'HH:mm',
                                    hour: 'HH:mm',
                                    day: 'dd MMM',
                                    week: 'dd MMM',
                                    month: 'MMM yyyy',
                                    quarter: 'MMM yyyy',
                                    year: 'yyyy'
                                },
                            },
                            title: { display: true, text: 'Tiempo' },
                            border: { color: '#D9D9D9' },
                            grid: { color: '#1F1F1F', tickColor: '#fff' },
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 20
                            }
                        }
                    }
                }
            });
        }
    }, [chartData]);

    useEffect(() => {
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="bg-black p-[20px] h-full w-full rounded-md">
            <canvas ref={chartRef} className="block w-full h-full max-h-screen"></canvas>
        </div>
    );
};

export default Grafico;
