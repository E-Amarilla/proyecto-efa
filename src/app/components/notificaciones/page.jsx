'use client';

import { Toaster, toast } from "sonner";
import MyIcon from "./IMG/cancelICON.png";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import style from "./notificaciones.module.css";

export default function Notificaciones() {
    const [activeToasts, setActiveToasts] = useState([]);

    const notify = () => {
        const id = toast(
            <div>
                <h2>Notificación</h2>
                <p>Baliza de buzzer cerrada</p>
                <button
                    onClick={() => {
                        toast.dismiss(id);
                        setActiveToasts(activeToasts.filter(toastId => toastId !== id));
                    }}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                    <Image src={MyIcon} alt="Cancel Icon" width={20} height={20} />
                </button>
            </div>,
            {
                duration: 10000,
            }
        );
        setActiveToasts([...activeToasts, id]);
    };

    return (
        <div>
            <Toaster />
            <Button 
                onClick={notify}
            >
                <span> Button </span>
            </Button>
        </div>
    );
}