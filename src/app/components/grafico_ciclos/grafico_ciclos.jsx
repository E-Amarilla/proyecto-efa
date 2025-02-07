import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import style from './grafico_ciclos.module.css';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables, zoomPlugin);

const GraficoC = ({ startDate, endDate }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });

  const colores = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#33FFF6", "#FFC733", "#A1FF33", "#5733FF", "#FF3333",
    "#33FFA5", "#FF6F33", "A6FF33", "#33A1FF", "#FF33F6",
    "#F6FF33", "#33FFF3", "#FF336F", "#57FF33", "#3333FF"
  ];

  // Función para agrupar los ciclos por hora y sumar el peso desmontado
  const groupByHour = (cycles) => {
    const groups = {};
    cycles.forEach(ciclo => {
      const date = new Date(ciclo.fecha_fin * 1000);
      // Redondea la fecha al inicio de la hora
      const hour = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()).getTime();
      if (!groups[hour]) {
        groups[hour] = 0;
      }
      groups[hour] += ciclo.pesoDesmontado;
    });
    // Convierte el objeto en un arreglo de { x: timestamp, y: valor } y lo ordena cronológicamente
    return Object.entries(groups)
      .map(([hour, value]) => ({ x: parseInt(hour), y: value }))
      .sort((a, b) => a.x - b.x);
  };

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
        data: groupByHour(producto.ListaDeCiclos)
      }));

      setChartData({ datasets });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    // Destruir instancia previa, si existe
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const initialData = {
      datasets: []
    };

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: initialData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
        },
        plugins: {
          title: {
            display: true,
            text: 'PRODUCTOS REALIZADOS',
            color: '#D9D9D9',
            font: {
              size: 18,
              family: 'system',
            }
          },
          subtitle: {
            display: true,
            text: `${formattedStartDate} - ${formattedEndDate}`,
            color: '#ffa500',
            font: {
              size: 16,
              family: 'system',
              weight: 'normal',
            }
          },
          legend: {
            position: 'top',
            labels: { usePointStyle: true, color: '#D9D9D9' }
          },
          zoom: {
            pan: { enabled: true, mode: 'x' },
            zoom: {
              wheel: { enabled: true },
              pinch: { enabled: true },
              mode: 'x'
            },
            limits: {
              // Limitar el zoom para que no se muestre un rango menor a 1 hora (3600000 ms)
              x: { minRange: 3600000 }
            }
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
            stacked: true,
            title: { display: true, text: 'Peso desmontado (kg)', color: '#D9D9D9' },
            beginAtZero: true,
            border: { color: '#D9D9D9' },
            grid: { color: '#1F1F1F', tickColor: '#fff' },
            ticks: { color: '#D9D9D9' }
          },
          x: {
            stacked: true,
            type: 'time',
            time: {
              unit: 'hour',
              tooltipFormat: 'yyyy-MM-dd HH:mm:ss',
              displayFormats: {
                hour: 'HH:mm',
                day: 'dd MMM',
                week: 'dd MMM',
                month: 'MMM yyyy',
                quarter: 'MMM yyyy',
                year: 'yyyy'
              }
            },
            title: { display: true, text: 'Tiempo', color: '#D9D9D9' },
            border: { color: '#D9D9D9' },
            grid: { color: '#1F1F1F', tickColor: '#fff' },
            ticks: { autoSkip: true, maxTicksLimit: 20, color: '#D9D9D9' }
          }
        }
      }
    });

    chartInstanceRef.current = newChart;

    return () => {
      newChart.destroy();
    };
  }, [startDate, endDate, formattedStartDate, formattedEndDate]);

  useEffect(() => {
    if (chartInstanceRef.current && chartData && chartData.datasets.length > 0) {
      chartInstanceRef.current.data = chartData;
      chartInstanceRef.current.update();
    } else {
      console.log("Esperando datos...");
    }
  }, [chartData]);

  return (
    <div className="bg-black p-[20px] h-full w-full rounded-[15px] mt[10px]" style={{ height: '500px', width: '100%' }}>
      <canvas ref={chartRef} className="block w-full h-full max-h-screen"></canvas>
    </div>
  );
};

export default GraficoC;
