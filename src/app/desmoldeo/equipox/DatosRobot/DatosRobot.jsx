"use client";

//styles
import style from './DatosRobot.module.css';
import textstyle from '../texto.module.css';
import useWebSocket from '@/app/utils/useWebSocket';
import React, { useState, useEffect } from 'react';

const DatosRobotComponent = () => {

    const initialDatosRobot = [
        { id: 1, texto: 'POSICION X', dato: null, texto2: ' mm'},
        { id: 2, texto: 'POSICION Y', dato: null, texto2: ' mm'},
        { id: 3, texto: 'POSICION Z', dato: null, texto2: ' mm'},
    ];

    const [datosRobot, setDatosRobot] = useState(initialDatosRobot);

    const pollId = "lista-tiempo-real";
    const { data, error, isConnected } = useWebSocket(pollId);

    useEffect(() => {
        if (data && data.datosRobot) {
            const updatedDatosRobot = initialDatosRobot.map((item, index) => ({
                ...item,
                dato: data.datosRobot[index] !== undefined ? data.datosRobot[index] : null
            }));
            setDatosRobot(updatedDatosRobot);
        }
    }, [data]);

    return (
        <>
            <div className={style.datosGen}>
                <h1 className={textstyle.titulo}>DATOS ROBOT</h1>
                <div className={style.contenedorDatos}>
                    {datosRobot.map(({ id, texto, dato, texto2 }) => (
                        <div key={id} className={style.datoList}>
                            <div className={style.detallesDatos}>
                                <div className={style.texto}>
                                    <h3 className={textstyle.subtitulo}>{texto}</h3>
                                    <h4 className={textstyle.h4}>{dato === null ? 'null' : dato.toString()} {texto2}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DatosRobotComponent;
