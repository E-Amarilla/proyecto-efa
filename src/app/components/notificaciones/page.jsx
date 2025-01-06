'use client';

// Importar Sonner (asegurarse de previamente usar npm install Sonner)
import { toast } from "sonner";
import MyIcon from "./IMG/cancelICON.png";
import Image from "next/image";
import { useState } from "react";
import style from "./notificaciones.module.css";
import {Button} from "@nextui-org/react";

export default function Notificaciones() {
    // Estado para almacenar los ids de las notificaciones activas
    const [activeToasts, setActiveToasts] = useState([]);

    const notify = () => {
        // Crear la notificación y obtener su id
        const id = toast(
            <div>
                <div className="textos">
                    <h2 className={style.H2}>{'Notificacion'}</h2>
                    <p className={style.P}>{'Baliza de buzzer cerrada'}</p>
                </div>
                {/* Botón de cancelación con el icono */}
                <button
                    onClick={() => {
                        console.log('Cancel!');
                        // Cerrar la notificación específica usando su id
                        toast.dismiss(id);
                        // Eliminar el id de la lista de notificaciones activas
                        setActiveToasts(activeToasts.filter(toastId => toastId !== id));
                    }}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                    <Image className={style.imagenBoton} src={MyIcon} alt="Cancel Icon" width={20} height={20} />
                </button>
            </div>,
            {
                duration: 10000,
            }
        );
        // Agregar el id de la notificación a la lista
        setActiveToasts([...activeToasts, id]);
    };
    
    return (
        <div className={style.BotonNext}>
        <Button
            className="bg-white text-black shadow-lg"
            radius="full"
            onClick={notify}
        >
        Button
        </Button>
        </div>
    );
}