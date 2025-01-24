"use client"
import { useEffect, useState, useRef } from "react";

export default function useWebSocket(pollId) {
  const [data, setData] = useState(null); // Estado para los datos recibidos
  const [isConnected, setIsConnected] = useState(false); // Estado de conexión
  const socketRef = useRef(null); // Referencia al WebSocket

  useEffect(() => {
    const socket = new WebSocket(`ws://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/ws/${pollId}`);
    socketRef.current = socket;

    // Evento: Conexión abierta
    socket.onopen = () => {
      setIsConnected(true);
    };

    // Evento: Mensaje recibido
    socket.onmessage = (event) => {
      if (socketRef.current !== socket || socket.readyState !== WebSocket.OPEN) {
        return;
      }
      try {
        const message = JSON.parse(event.data);
        setData(message); // Actualiza el estado con los datos recibidos
      } catch (err) {
        console.error("Error al procesar el mensaje:", err);
      }
    };

    // Evento: Conexión cerrada
    socket.onclose = () => {
      if (socketRef.current !== socket) {
        return;
      }
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

  return { data, isConnected };
}