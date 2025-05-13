"use client";

import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

export default function RestartCountdown() {
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isRestarting, setIsRestarting] = useState(false);
  const { streamRestartSequence } = useContext(AuthContext);

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

  // Efecto para reiniciar el estado del botón cuando cambia la secuencia de reinicio
  useEffect(() => {
    if (isRestarting) {
      setIsRestarting(false);
    }
  }, [streamRestartSequence]);

  // Calcular horas, minutos y segundos
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  // Formato de tiempo: mostrar HH:MM:SS si hay horas, MM:SS si solo hay minutos
  const timeDisplay = hours > 0
    ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    : `${minutes}:${seconds.toString().padStart(2, '0')}`;

    const handleForceRestart = async () => {
      if (isRestarting) return;
      
      try {
        setIsRestarting(true);
        
        // Verificar el estado actual antes de forzar el reinicio
        const statusCheck = await fetch('/api/stream-status');
        const statusData = await statusCheck.json();
        
        console.log("[Cliente] Estado actual antes del reinicio:", statusData);
        
        const response = await fetch('/api/force-restart', {
          method: 'POST',
        });
        
        if (!response.ok) {
          throw new Error('Error al forzar el reinicio');
        }
        
        const data = await response.json();
        console.log("[Cliente] Reinicio completado:", data);
        
        // Esperar un tiempo y luego resetear el botón si no cambió el estado
        setTimeout(() => {
          if (isRestarting) {
            console.log("[Cliente] Reseteando estado del botón manualmente después del timeout");
            setIsRestarting(false);
          }
        }, 30000); // 30 segundos máximo de espera
      } catch (error) {
        console.error('Error al forzar el reinicio:', error);
        setIsRestarting(false);
      }
  };

  return (
    <div style={{
      position: 'absolute',
      flexDirection: 'column',
      left: '0',
      top: '123px',
      width: '100%',
      color: '#EFEFEF',
      fontSize: '16px',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: '10',
      gap: '5px',
    }}>
      <div>Reinicio automático de las cámaras en: {timeDisplay}</div>
      <button 
        onClick={handleForceRestart}
        disabled={isRestarting}
        style={{
          padding: '5px 12px',
          backgroundColor: isRestarting ? '#555555' : '#1e88e5',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isRestarting ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {isRestarting ? (
          <>
            <span className="loading-spinner" style={{
              display: 'inline-block',
              width: '16px',
              height: '16px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '50%',
              borderTopColor: 'white',
              animation: 'spin 1s linear infinite',
              marginRight: '8px',
            }}></span>
            Reiniciando...
          </>
        ) : (
          'Forzar reinicio'
        )}
      </button>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}