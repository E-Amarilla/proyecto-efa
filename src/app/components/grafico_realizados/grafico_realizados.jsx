import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';
import style from './grafico_realizados.module.css';

Chart.register(...registerables, zoomPlugin);

const Grafico = ({ startDate, endDate }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [chartData, setChartData] = useState({ ciclos: [], pesoProducto: [] });

  const fetchData = async () => {
    if (!startDate || !endDate) {
      console.error("Fechas no definidas.");
      return;
    }

    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).access_token : null;

    try {
      const response = await fetch(
        `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/graficos-historico/ciclos-productos/?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const datos = await response.json();
      console.log("Datos recibidos de la API:", datos);
      setChartData(datos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0'); // Asegurar dos dígitos
    const day = String(d.getUTCDate()).padStart(2, '0'); // Asegurar dos dígitos
    return `${year}-${month}-${day}`;
};

const formattedStartDate = formatDate(startDate);
const formattedEndDate = formatDate(endDate);
  // Llamada a la API cuando cambian las fechas
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  // Inicialización (y reinicialización) del gráfico
  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    // Si existe una instancia anterior, la destruimos
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const initialData = {
      datasets: [
        {
          label: 'Ciclos',
          data: [],
          borderColor: '#F828',
          backgroundColor: '#EF8225',
          yAxisID: 'ciclos',
          fill: false,
          type: 'line'
        },
        {
          label: 'Peso Producto (Tn)',
          data: [],
          borderColor: '#3AF8',
          backgroundColor: '#3AF',
          yAxisID: 'pesoProducto',
          fill: false,
          type: 'line'
        }
      ]
    };

    const newChart = new Chart(ctx, {
      type: 'line',
      data: initialData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              color: '#D9D9D9'
            }
          },
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
          zoom: {
            pan: { enabled: true, mode: 'x' },
            zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const datasetLabel = context.dataset.label || 'Dato';
                const value = context.raw.y;
                const date = context.raw.x;
                return [`Fecha: ${date}`, `${datasetLabel}: ${value}`];
              },
              title: () => ''
            }
          }
        },
        scales: {
          ciclos: {
            type: 'linear',
            display: true,
            position: 'left',
            suggestedMin: 0,
            suggestedMax: 10,
            title: {
              display: true,
              text: 'Ciclos Completados',
              color: '#EF8225'
            },
            grid: { color: '#1F1F1F', tickColor: '#EF8225' },
            border: { color: '#EF8225' },
            ticks: { color: '#EF8225' }
          },
          pesoProducto: {
            type: 'linear',
            display: true,
            position: 'right',
            suggestedMin: 0,
            suggestedMax: 10,
            title: {
              display: true,
              text: 'Peso Producto (Tn)',
              color: '#3AF'
            },
            grid: { color: '#1F1F1F', tickColor: '#3AF' },
            border: { color: '#3AF' },
            ticks: { color: '#3AF' }
          },
          x: {
            type: 'time',
            time: {
              parser: 'yyyy-MM-dd',
              tooltipFormat: 'yyyy-MM-dd',
              displayFormats: {
                day: 'yyyy-MM-dd',
                week: 'yyyy-MM-dd',
                month: 'yyyy-MM',
                quarter: 'yyyy-MM',
                year: 'yyyy'
              }
            },
            title: {
              display: true,
              text: 'Tiempo',
              color: '#D9D9D9'
            },
            border: { color: '#D9D9D9' },
            grid: { color: '#1F1F1F', tickColor: '#fff' },
            ticks: { autoSkip: true, maxTicksLimit: 20, color: '#D9D9D9' }
          }
        }
      }
    });

    chartInstanceRef.current = newChart;

    // Limpieza: destruir el gráfico al desmontar o al reinicializar
    return () => {
      newChart.destroy();
    };
  }, [startDate, endDate]);

  // Actualización del gráfico con los datos obtenidos
  useEffect(() => {
    if (
      chartInstanceRef.current &&
      chartData &&
      chartData.ciclos.length > 0 &&
      chartData.pesoProducto.length > 0
    ) {
      const ciclosData = chartData.ciclos.map(item => ({
        x: new Date(item.fecha_fin),
        y: item.CiclosCompletados
      }));

      const pesoProductoData = chartData.pesoProducto.map(item => ({
        x: new Date(item.fecha_fin),
        y: item.PesoDiarioProducto / 1000
      }));

      console.log("Datos Ciclos procesados:", ciclosData);
      console.log("Datos Peso Producto procesados:", pesoProductoData);

      chartInstanceRef.current.data.datasets[0].data = ciclosData;
      chartInstanceRef.current.data.datasets[1].data = pesoProductoData;
      chartInstanceRef.current.update();
    } else {
      console.log("Esperando datos...");
    }
  }, [chartData]);

  return (
    <div className="bg-black p-[20px] h-full w-full rounded-[15px]" style={{ height: '500px', width: '100%' }}>
      <canvas ref={chartRef} className="block w-full h-full max-h-screen"></canvas>
    </div>
  );
};

export default Grafico;
