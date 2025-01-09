"use client"
import { useEffect, useState, useRef } from "react";

export default function useWebSocket(pollId) {
  const [data, setData] = useState(null); // Estado para los datos recibidos
  const [error, setError] = useState(null); // Estado para errores
  const [isConnected, setIsConnected] = useState(false); // Estado de conexión
  const socketRef = useRef(null); // Referencia al WebSocket

  useEffect(() => {
    const socket = new WebSocket(`ws://192.168.0.165:8000/ws/${pollId}`);
    socketRef.current = socket;

    // Evento: Conexión abierta
    socket.onopen = () => {
      console.log("Conexión WebSocket establecida");
      setIsConnected(true);
    };

    // Evento: Mensaje recibido
    socket.onmessage = (event) => {
      if (socketRef.current !== socket || socket.readyState !== WebSocket.OPEN) {
        return;
      }
      try {
        const message = JSON.parse(event.data);
        console.log("Mensaje recibido:", message);
        setData(message); // Actualiza el estado con los datos recibidos
      } catch (err) {
        console.error("Error al procesar el mensaje:", err);
      }
    };

    // Evento: Error
    socket.onerror = (err) => {
      if (socketRef.current !== socket || socket.readyState !== WebSocket.OPEN) {
        return;
      }
      console.error("Error en WebSocket:", err);
      setError(err);
    };

    // Evento: Conexión cerrada
    socket.onclose = () => {
      if (socketRef.current !== socket) {
        return;
      }
      console.log("Conexión WebSocket cerrada");
      setIsConnected(false);
    };

    // Limpieza al desmontar el componente
    return () => {
      if (socketRef.current === socket) {
        socketRef.current = null;
        socket.close();
      }
    };
  }, [pollId]); // Se actualiza si cambia el pollId

  return { data, error, isConnected };
}