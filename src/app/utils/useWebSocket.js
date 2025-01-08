"use client"
import { useEffect, useState } from "react";

export default function useWebSocket(pollId) {
  const [data, setData] = useState(null); // Estado para los datos recibidos
  const [error, setError] = useState(null); // Estado para errores
  const [isConnected, setIsConnected] = useState(false); // Estado de conexión

  useEffect(() => {
    const socket = new WebSocket(`ws://192.168.0.82:8000/ws/${pollId}`);

    console.log(socket)

    // Evento: Conexión abierta
    socket.onopen = () => {
      console.log("Conexión WebSocket establecida");
      setIsConnected(true);
    };

    // Evento: Mensaje recibido
    socket.onmessage = (event) => {
        
      try {
        const message =  JSON.parse(event.data);
        console.log("mesnaje",message);
        
        console.log("Mensaje recibido:", message);
        setData(message); // Actualiza el estado con los datos recibidos
      } catch (err) {
        console.error("Error al procesar el mensaje:", err);
      }
    };

    // Evento: Error
    socket.onerror = (err) => {
      console.error("Error en WebSocket:", err);
      setError(err);
    };

    // Evento: Conexión cerrada
    socket.onclose = () => {
      console.log("Conexión WebSocket cerrada");
      setIsConnected(false);
    };

    // Limpieza al desmontar el componente
    return () => {
      socket.close();
    };
  }, [pollId]); // Se actualiza si cambia el pollId

  return { data, error, isConnected };
}
