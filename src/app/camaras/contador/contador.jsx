"use client";

import { useState, useEffect } from 'react';

export default function RestartCountdown() {
  // Siempre mostrar el contador para depuración
  const [timeRemaining, setTimeRemaining] = useState(60);

  useEffect(() => {
    const fetchRestartTime = async () => {
      try {
        const response = await fetch('/api/restart-time');
        const data = await response.json();
        if (data && typeof data.timeRemaining === 'number') {
          setTimeRemaining(data.timeRemaining);
        }
      } catch (error) {
        console.error('Error al obtener el tiempo de reinicio:', error);
      }
    };

    fetchRestartTime();
    const interval = setInterval(fetchRestartTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div style={{
      position: 'absolute',
      left: '0',
      width: '100%',
      height: '5.5vh',
      color: '#EFEFEF',
      fontSize: '16px',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '10',
      textAlign: 'center',
    }}>
      Reinicio automático de las cámaras en: {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}