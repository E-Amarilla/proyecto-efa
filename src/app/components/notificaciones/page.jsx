'use client';

import { Toaster, toast } from "sonner";
import { useEffect, useState, useRef } from "react";
import useWebSocket from '../../utils/useWebSocket';
import style from "./notificaciones.module.css";

// Imagenes
import Image from "next/image";
import MyIcon from "@/assets/img/cancelICON.png";

const validIds = process.env.NEXT_PUBLIC_VALID_IDS
    ? process.env.NEXT_PUBLIC_VALID_IDS.split(',').map(Number)
    : [];

export default function Notificaciones() {
    const [activeToasts, setActiveToasts] = useState([]); // Almacena las alarmas mostradas
    const prevDataRef = useRef([]); // Referencia mutable para el estado anterior
    const pollId = "alarmas-datos";
    const { data, error, isConnected } = useWebSocket(pollId);

    useEffect(() => {
        if (data) {
            // Filtra las alarmas con ID válido
            const alarmasFiltradas = data.filter(
                alarma => validIds.includes(alarma.id_alarma)
            );

            // Compara con el estado anterior guardado en la referencia
            alarmasFiltradas.forEach(alarma => {
                const prevAlarma = prevDataRef.current.find(prev => prev.id_alarma === alarma.id_alarma);

                // Detecta únicamente cambios de Inactivo/null a Activo
                if ((!prevAlarma || prevAlarma.estadoAlarma !== "Activo") && alarma.estadoAlarma === "Activo") {
                    console.log(`Alarma integrada: Cambio de estado de inactivo/null a activo. ID: ${alarma.id_alarma}`);

                    const id = toast(
                        <div className={style.notification}>
                            
                            <div className={style.texto}>
                                <h2>{alarma.tipoAlarma}</h2>
                                <p>{alarma.descripcion}</p>
                            </div>
                            
                            <button
                                onClick={() => {
                                    toast.dismiss(id);
                                }}
                                style={{background: 'transparent', border: 'none', cursor: 'pointer'}}
                            >
                                <Image src={MyIcon} alt="Cancel Icon" width={20} height={20} />
                            </button>
                        </div>,
                        {
                            duration: 5000,
                        }
                    );

                    // Actualiza el estado de las alarmas activas
                    setActiveToasts(prev => [...prev, alarma.id_alarma]);
                } else {
                    console.log(`Alarma descartada: Estado sin cambios, ya activa o cambio a inactivo. ID: ${alarma.id_alarma}`);
                }
            });

            // Actualiza la referencia mutable con los datos actuales
            prevDataRef.current = data;
        }
    }, [data]);

    return (
        <Toaster />
    );
}
