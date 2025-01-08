"use client";
import gripper from './IMG/GRIPPER.png';

//styles
import style from './DatosGripper.module.css';
import textstyle from '../texto.module.css';
import useWebSocket from '@/app/utils/useWebSocket';
import React, { useState, useEffect } from 'react';

const DatosGripperComponent = () => {

    const initialdatosGripper = [
        { id: 1, texto: 'COD. GRIPPER ACTUAL', dato: null},
        { id: 2, texto: 'COD. GRIPPER PROXIMO', dato: null},
        { id: 3, texto: 'GRIPPERS DISPONIBLES', dato: null},
    ];

    const [datosGripper, setdatosGripper] = useState(initialdatosGripper);

    const pollId = "lista-tiempo-real";
    const { data, error, isConnected } = useWebSocket(pollId);

    useEffect(() => {
        if (data && data.datosGripper) {
            const updateddatosGripper = initialdatosGripper.map((item, index) => ({
                ...item,
                dato: data.datosGripper[index] !== undefined ? data.datosGripper[index] : null
            }));
            setdatosGripper(updateddatosGripper);
        }
    }, [data]);

    return (
        <>
            <div className={style.datosGen}>
                <h1 className={textstyle.titulo}>DATOS GRIPPER</h1>
                <div className={style.contenedorDatos}>
                    {datosGripper.map(({ id, texto, dato }) => (
                        <div key={id} className={style.datoList}>
                            <div className={style.detallesDatos}>
                                <div className={style.texto}>
                                    <h3 className={textstyle.subtitulo}>{texto}</h3>
                                    <h4 className={textstyle.h4}>{dato === null ? 'null' : dato.toString()}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DatosGripperComponent;