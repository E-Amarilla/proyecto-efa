import { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

const Grafico = () => {
  const chartContainerRef = useRef(null);
  const [tooltip, setTooltip] = useState({ display: false, x: 0, y: 0, pesoValue: 0, ciclosValue: 0, date: '' });

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.offsetWidth,
      height: 400,
      layout: {
        background: { type: 'solid', color: '#131313' },
        textColor: '#ffffff',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      crosshair: {
        mode: 1,
      },
      timeScale: {
        borderColor: '#ffffff',
      },
    });

    const seriesPeso = chart.addLineSeries({
      color: 'blue',
      lineWidth: 2,
    });

    const seriesCiclos = chart.addLineSeries({
      color: 'orange',
      lineWidth: 2,
    });

    // Datos para las dos series
    const dataPeso = [
      { time: 1640995200, value: 70 },
      { time: 1641081600, value: 72 },
      { time: 1641168000, value: 74 },
      // Agrega más datos
    ];

    const dataCiclos = [
      { time: 1640995200, value: 5 },
      { time: 1641081600, value: 6 },
      { time: 1641168000, value: 5.5 },
      // Agrega más datos
    ];

    seriesPeso.setData(dataPeso);
    seriesCiclos.setData(dataCiclos);

    // Actualizar el tooltip con el movimiento del crosshair
    chart.subscribeCrosshairMove((param) => {
      if (!param || !param.time) {
        setTooltip((prev) => ({ ...prev, display: false }));
        return;
      }

      const time = param.time;

      // Obtener datos de ambas series
      const dataPesoPoint = param.seriesData.get(seriesPeso);
      const dataCiclosPoint = param.seriesData.get(seriesCiclos);

      const dateStr = new Date(time * 1000).toLocaleDateString();

      // Obtener valores de ambas series
      const pesoValue = dataPesoPoint ? dataPesoPoint.value : 0;
      const ciclosValue = dataCiclosPoint ? dataCiclosPoint.value : 0;

      // Calcular las coordenadas para ambas series
      const coordinatePeso = seriesPeso.priceToCoordinate(pesoValue);
      const coordinateCiclos = seriesCiclos.priceToCoordinate(ciclosValue);

      const shiftedCoordinateX = Math.max(
        0,
        Math.min(chartContainerRef.current.clientWidth - 100, param.point.x - 50)
      );

      const coordinateYPeso = coordinatePeso
        ? Math.max(0, Math.min(chartContainerRef.current.clientHeight - 80, coordinatePeso - 80))
        : 0;

      const coordinateYCiclos = coordinateCiclos
        ? Math.max(0, Math.min(chartContainerRef.current.clientHeight - 80, coordinateCiclos - 80))
        : 0;

      // Mostrar el tooltip con los datos de ambas series
      setTooltip({
        display: true,
        x: shiftedCoordinateX,
        y: coordinateYPeso, // Usar la coordenada de la serie "Peso" para la posición
        pesoValue: pesoValue,
        ciclosValue: ciclosValue,
        date: dateStr,
      });
    });

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={chartContainerRef}>
      {/* Tooltip */}
      {tooltip.display && (
        <div
        style={{
          position: 'absolute',
          top: tooltip.y,
          left: tooltip.x,
          width: 'auto',
          height: 'auto',
          padding: '8px',
          boxSizing: 'border-box',
          fontSize: '16px', // Aumenté el tamaño de la fuente
          textAlign: 'left',
          zIndex: 1000,
          backgroundColor: 'black',
          color: 'white',
          border: '1px solid #2962FF',
          borderRadius: '2px',
          pointerEvents: 'none',
        }}
      >
        <div style={{ color: '#2962FF' }}>
          Peso: {Math.round(100 * tooltip.pesoValue) / 100} kg
        </div>
        <div style={{ color: '#FFA500' }}>
          Ciclos: {Math.round(100 * tooltip.ciclosValue) / 100}
        </div>
        <div style={{ color: 'white' }}>{tooltip.date}</div>
      </div>
      
      )}
    </div>
  );
};

export default Grafico;
