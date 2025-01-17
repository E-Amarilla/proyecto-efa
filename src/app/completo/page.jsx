"use client";

// Importar imágenes
import Image from "next/image";
import luzR from '@/assets/img/puntoRojo.png';
import luzV from '@/assets/img/puntoVerde.png'; 
import LayoutCompleto from '../components/layoutcompleto/LayoutCompleto.jsx';

// Importar estilos
import style from './Completo.module.css';
import { useEffect, useState } from "react";

const Completo = () => {
    // Estado para almacenar las alertas recibidas del WebSocket
    const [alertas, setAlertas] = useState([]);
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        // Conexión al WebSocket (URL actualizada)
        const socket = new WebSocket("ws://192.168.0.72:8000/ws/alarmas-datos");

        // Evento cuando se recibe un mensaje del WebSocket
        socket.onmessage = (event) => {
            try {
                // Si el mensaje es un JSON válido, parsearlo
                const data = JSON.parse(event.data);

                // Verifica si los datos contienen un array de alertas
                if (data && Array.isArray(data)) {
                    setAlertas(data);
                } else {
                    throw new Error("Formato de datos no válido");
                }
            } catch (error) {
                console.error("Error al procesar los datos del WebSocket:", error);
                setError("Error al recibir o procesar los datos");
            }
        };

        // Evento cuando el WebSocket se cierra
        socket.onclose = () => {
            console.log("Conexión WebSocket cerrada");
        };

        // Evento cuando ocurre un error en la conexión WebSocket
        socket.onerror = (error) => {
            console.error("Error en el WebSocket:", error);
            setError("Error en la conexión WebSocket");
        };

        // Limpiar la conexión WebSocket cuando el componente se desmonta
        return () => {
            socket.close();
        };
    }, []);

    // Función para convertir el formato de fecha
    const convertirFecha = (fechaStr) => {
        // Cambiar el formato '2025-01-17-12-00' a '2025-01-17 12:00'
        const fechaFormateada = fechaStr.replace(/-/g, ":").replace(/(\d{4}):(\d{2}):(\d{2}):(\d{2}):(\d{2})/, "$1-$2-$3 $4:$5");
        return new Date(fechaFormateada);
    };

    // Filtrar alertas por tipo y ordenarlas por la hora (de más reciente a más antigua)
    const alertasFiltradas = alertas
        .filter(alerta => alerta.tipoAlarma === 'Error' || alerta.tipoAlarma === 'Advertencia')
        .sort((a, b) => convertirFecha(b.fechaRegistro) - convertirFecha(a.fechaRegistro))
        .slice(0, 8); // Limitar a las últimas 8 alertas

    return (
        <div className={style.body}>
            <div className={style.contenedor}>
                <div className={style.contenedorImagen}>
                    <LayoutCompleto />
                </div>
            </div>

            {/* Título */}
            <h2 className={style.titulo}>ÚLTIMAS ALERTAS</h2>

            {/* Mostrar error si lo hay */}
            {error && <div className={style.error}>{error}</div>}

            {/* Lista de alertas */}
            <div className={style.contenedorAlertas}>
                <ul className={style.alertasTods}>
                    {alertasFiltradas.map(({ id_alarma, descripcion, tipoAlarma, estadoAlarma, fechaRegistro }) => (
                        <li key={id_alarma} className={style.alertaIndv}>
                            <a className={style.detallesAlerta} href='alertas'>
                                {/* Selección de la imagen basada en el tipo de alerta */}
                                <Image 
                                    src={tipoAlarma === 'Error' ? luzR : luzV} 
                                    alt={`Estado: ${tipoAlarma}`} 
                                    className={style.icon} 
                                />
                                {descripcion} - {tipoAlarma} - {estadoAlarma} - {convertirFecha(fechaRegistro).toLocaleString()}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Completo;
