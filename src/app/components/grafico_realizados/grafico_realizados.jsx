"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';
import { Spinner } from '@heroui/spinner';
import { Button } from "@nextui-org/react";

Chart.register(...registerables, zoomPlugin);

const GraficoC = ({ startDate, endDate }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });
  const [loading, setLoading] = useState(true);
  const totalsRef = useRef(new Map());

  const colores = [
    '#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A6',
    '#33FFF5', '#FF9A33', '#33FFBD', '#FF3333', '#A633FF',
    '#FFD933', '#33FFD4', '#A6FF33', '#337BFF', '#33FF76',
    '#FF3357', '#33FF8D', '#FF8633', '#FF33C5', '#33FFC5'
  ];  

  // Optimizado: Usar Map para agrupación más rápida
  const groupByHour = (cycles) => {
    const groups = new Map();
    cycles.forEach(ciclo => {
      const date = new Date(ciclo.fecha_fin * 1000);
      const hour = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours()
      ).getTime();
      groups.set(hour, (groups.get(hour) || 0) + ciclo.pesoDesmontado);
    });
    return Array.from(groups.entries())
      .map(([x, y]) => ({ x, y }))
      .sort((a, b) => a.x - b.x);
  };

  const fetchData = async () => {
    if (!startDate || !endDate) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const storedUser = sessionStorage.getItem('user_data');
    const token = storedUser ? JSON.parse(storedUser).access_token : null;

    try {
      const response = await fetch(
        `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/graficos-historico/productos-realizados/?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          },
        }
      );

      if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);

      const productos = await response.json();
      const datasets = productos.map((producto, index) => ({
        label: producto.NombreProducto,
        backgroundColor: colores[(producto.id_recetario - 1) % colores.length],
        borderColor: `${colores[(producto.id_recetario - 1) % colores.length]}80`,
        fill: false,
        data: groupByHour(producto.ListaDeCiclos),
        borderWidth: 0 // Simplifica el renderizado de barras
      }));

      setChartData({ datasets });
    } finally {
      setLoading(false);
    }
  };

  // Precálculo de totales para tooltips
  useEffect(() => {
    const totals = new Map();
    chartData.datasets.forEach(dataset => {
      dataset.data.forEach(point => {
        totals.set(point.x, (totals.get(point.x) || 0) + point.y);
      });
    });
    totalsRef.current = totals;
  }, [chartData]);

  // Memoizar fechas formateadas
  const formatDate = useMemo(() => (date) => {
    const d = new Date(date);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
  }, []);

  const formattedStartDate = useMemo(() => formatDate(startDate), [startDate, formatDate]);
  const formattedEndDate = useMemo(() => formatDate(endDate), [endDate, formatDate]);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: { datasets: [] },
      options: {
        animations: false, // Deshabilita animaciones
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'nearest',
          intersect: false
        },
        plugins: {
          title: {
            align: 'start',
            display: true,
            text: 'PRODUCTOS REALIZADOS',
            color: '#D9D9D9',
            font: {
              size: 20,
              family: 'system-ui'
            }
          },
          subtitle: {
            align: 'start',
            display: true,
            text: `${formattedStartDate} - ${formattedEndDate}`,
            color: '#ffa500',
            font: {
              size: 16,
              weight: 'normal',
              family: 'system-ui'
            },
            padding: {
              top: -10  // Ajusta el subtítulo hacia arriba
            }
          },
          legend: {
            position: 'top',
            labels: { usePointStyle: true, color: '#D9D9D9' },
            onHover: (event) => {
              event.native.target.style.cursor = 'pointer';
            }
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
                const date = formatDate(context.raw.x);
                const totalStacked = totalsRef.current.get(context.raw.x) || 0; // Acceso rápido
                return [
                  `${datasetLabel}: ${peso} kg`,
                  `FECHA: ${date}`,
                  `PRODUCCION POR HORA: ${totalStacked} kg`
                ];
              },
              title: () => ''
            }
          }
        },
        transitions: {
          zoom: {
            animation: {
              duration: 0
            }
          }
        },
        scales: {
          y: {
            stacked: true,
            title: { display: true, text: 'Peso producto (kg)', color: '#D9D9D9' },
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
            grid: { color: '#8C8C8C', tickColor: '#fff' },
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
    }
  }, [chartData]);

  const resetZoom = () => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.resetZoom();
    }
  };

  return (
    <div className="relative bg-black p-[20px] h-full w-full rounded-[15px] mt[10px]" style={{ height: '500px' }}>
      <canvas ref={chartRef} />
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 rounded-xl">
          <Spinner label="Cargando..." />
        </div>
      )}
      <Button 
        onClick={() => chartInstanceRef.current?.resetZoom()}
        className="absolute top-[20px] right-[20px] text-white bg-grey hover:text-black hover:bg-lightGrey px-3 rounded-md"
      >
        Reiniciar Zoom
      </Button>
    </div>
  );
};

export default React.memo(GraficoC); // Evita rerenders innecesarios