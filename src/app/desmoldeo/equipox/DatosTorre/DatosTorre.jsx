"use client";
//styles
import style from './DatosTorre.module.css';
import textstyle from '../texto.module.css';
import useWebSocket from '@/app/utils/useWebSocket';
import React, { useState, useEffect } from 'react';

const DatosTorreComponent = () => {
    
    const initialDatosTorre = [
        { id: 1, texto: 'N° TORRE ACTUAL', dato: null},
        { id: 2, texto: 'TORRE NIVEL ACTUAL', dato: null},
        { id: 3, texto: 'TAG ACTUAL', dato: null},
        { id: 4, texto: 'N° TORRE PROXIMA', dato: null},
        { id: 5, texto: 'TIPO FIN', dato: null},
        { id: 6, texto: 'DESMOLDEO BANDA', dato: null}
    ];

    const [datosTorre, setDatosTorre] = useState(initialDatosTorre);

    const pollId = "lista-tiempo-real";
    const { data, error, isConnected } = useWebSocket(pollId);

    useEffect(() => {
        if (data && data.datosTorre) {
            const updatedDatosTorre = initialDatosTorre.map((item, index) => ({
                ...item,
                dato: data.datosTorre[index] !== undefined ? data.datosTorre[index] : null
            }));
            setDatosTorre(updatedDatosTorre);
        }
    }, [data]);

    return (
        <>
            <div className={style.datosGen}>
                <h1 className={textstyle.titulo}>DATOS TORRE</h1>
                <div className={style.contenedorDatos}>
                    {datosTorre.map(({ id, texto, dato }) => (
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

export default DatosTorreComponent;