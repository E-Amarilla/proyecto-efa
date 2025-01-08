"use client";

//styles
import style from './DatosKuka.module.css';
import textstyle from '../texto.module.css';
import useWebSocket from '@/app/utils/useWebSocket';
import React, { useState, useEffect } from 'react';

const DatosKukaComponent = () => {

    const initialDatosKuka = [
        { id: 1, texto: 'N° TORRE ACTUAL', dato: null},
        { id: 2, texto: 'TORRE NIVEL ACTUAL', dato: null},
        { id: 3, texto: 'TAG ACTUAL', dato: null},
    ];

    const [datosKuka, setDatosKuka] = useState(initialDatosKuka);

    const pollId = "lista-tiempo-real";
    const { data, error, isConnected } = useWebSocket(pollId);

    useEffect(() => {
        if (data && data.datosKuka) {
            const updatedDatosKuka = initialDatosKuka.map((item, index) => ({
                ...item,
                dato: data.datosKuka[index] !== undefined ? data.datosKuka[index] : null
            }));
            setDatosKuka(updatedDatosKuka);
        }
    }, [data]);

    return (
        <>
            <div className={style.datosGen}>
                <h1 className={textstyle.titulo}>DATOS KUKA</h1>
                <div className={style.contenedorDatos}>
                    {datosKuka.map(({ id, texto, dato, icono }) => (
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

export default DatosKukaComponent;
