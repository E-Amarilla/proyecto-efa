"use client";

//Imagenes
import Image from "next/image";
import receta1 from '@/assets/img/RECETA.png';
import receta2 from '@/assets/img/RECETA2.png';
import peso from '@/assets/img/PESO.png';
import estado from '@/assets/img/ESTADO.png';
import tiempo from '@/assets/img/TIEMPO.png';

import useWebSocket from '../../../utils/useWebSocket';
import React, { useState, useEffect } from 'react';

import style from './DatosGenerales.module.css';
import textstyle from '../texto.module.css';


const DatosGenerales = () => {
    const pollId = "resumen-desmoldeo";
    const { data, error, isConnected } = useWebSocket(pollId);

    const {
        NombreActual,
        idRecetaActual,
        idRecetaProximo,
        PesoActualDesmoldado,
        estadoMaquina,
        tiempoTranscurrido
    } = data || {};

    const datosGenerales = [
        { id: 1, texto: 'NOMBRE RECETA', dato: NombreActual !== undefined && NombreActual !== null ? NombreActual : 'null', icono:receta1 },
        { id: 2, texto: 'ID RECETA ACTUAL', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
        { id: 3, texto: 'ID PROXIMA RECETA', dato: idRecetaProximo !== undefined && idRecetaProximo !== null ? idRecetaProximo : 'null', icono:receta2 },
        { id: 4, texto: 'PESO TOTAL DESMOLDADO', dato: PesoActualDesmoldado !== undefined && PesoActualDesmoldado !== null ? PesoActualDesmoldado : 'null', icono:peso  },
        { id: 5, texto: 'ESTADO MAQUINA', dato: estadoMaquina !== undefined && estadoMaquina !== null ? estadoMaquina : 'null', icono:estado },
        { id: 6, texto: 'TIEMPO TRANSCURRIDO', dato: tiempoTranscurrido !== undefined && tiempoTranscurrido !== null ? tiempoTranscurrido : '00:00hs', icono: tiempo },
    ];       

    return (
        <>
            <div className={style.datosGen}>
                <h1 className={textstyle.titulo}>DATOS GENERALES</h1>
                <ul className={style.lista}>
                    {datosGenerales.map(({ id, texto, dato, icono }) => (
                        <li key={id} className={style.datoList}>
                            <div className={style.detallesDatos} href='EquipoX'>
                                <div className={style.texto}>
                                    <h3 className={textstyle.subtitulo}>{texto}</h3>
                                    <h4 className={textstyle.h4}>{dato}</h4>
                                </div>
                                <Image 
                                    src={icono} 
                                    alt={`Estado: ${id}`} 
                                    className={style.icon} 
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default DatosGenerales;