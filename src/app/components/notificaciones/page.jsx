'use client';

import { Toaster, toast } from "sonner";
import { useEffect, useState, useRef, useContext } from "react";
import style from "./notificaciones.module.css";

import AuthContext from "../../context/AuthContext.js";
// Imagenes
import Image from "next/image";
import MyIcon from "@/assets/img/cancelICON.png";

const validIds = process.env.NEXT_PUBLIC_VALID_IDS
    ? process.env.NEXT_PUBLIC_VALID_IDS.split(',').map(Number)
    : [];

export default function Notificaciones() {
    const [activeToasts, setActiveToasts] = useState([]); // Almacena las alarmas mostradas
    const prevDataRef = useRef([]); // Referencia mutable para el estado anterior
    const { data } = useContext(AuthContext);

    useEffect(() => {
        if (data) {
            // Filtra las alarmas con ID válido
            const alarmasFiltradas = data.alarmas.filter(
                alarmas => validIds.includes(alarmas.id_alarma)
            );

            // Compara con el esimport AuthContext from "../context/AuthContext.js";tado anterior guardado en la referencia
            alarmasFiltradas.forEach(alarmas => {
                const prevAlarma = Array.isArray(prevDataRef.current)
                ? prevDataRef.current.find(prev => prev.id_alarma === alarmas.id_alarma)
                : null;

                // Detecta únicamente cambios de Inactivo/null a Activo
                if ((!prevAlarma || prevAlarma.estadoAlarma !== "Activo") && alarmas.estadoAlarma === "Activo") {

                    const id = toast(
                        <div className={style.notification}>
                            
                            <div className={style.texto}>
                                <h2>{alarmas.tipoAlarma}</h2>
                                <p>{alarmas.descripcion}</p>
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
                    setActiveToasts(prev => [...prev, alarmas.id_alarma]);
                }
            });

            // Actualiza la referencia mutable con los datos actuales
            prevDataRef.current = data;
        }
    }, [data]);

    return (
        <Toaster richColors={true}/>
    );
}
