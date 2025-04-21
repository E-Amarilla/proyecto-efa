"use client";

//Imagenes
import Image from "next/image";
import receta1 from '@/assets/img/RECETA.png';
import receta2 from '@/assets/img/RECETA2.png';
import peso from '@/assets/img/PESO.png';
import estado from '@/assets/img/ESTADO.png';
import tiempo from '@/assets/img/TIEMPO.png';
import molde from '@/assets/img/MOLDE.png';

import { useContext } from "react";
import AuthContext from "../../../context/AuthContext"
import React, { useState, useEffect } from 'react';

import style from './DatosGenerales.module.css';
import textstyle from '../texto.module.css';


const DatosGenerales = () => {
    const { data } = useContext(AuthContext); // Obtiene datos del contexto

    const {
        idRecetaActual,
        idRecetaProxima,
        CodigoProducto,
        TotalNiveles,
        TipoMolde,
        estadoMaquina,
        desmoldeoBanda,
        PesoProducto,
        TiempoTranscurrido,
        sdda_nivel_actual,
        NGripperActual,
        PesoActualDesmoldado,
        TorreActual
    } = data?.[0] || {};

    const datosGenerales = [
        { id: 1, texto: 'Receta actual', dato: CodigoProducto !== undefined && CodigoProducto !== null ? CodigoProducto : 'null', icono:receta1 },
        { id: 2, texto: 'N° Molde:', dato: TipoMolde !== null ? TipoMolde : 'null', icono: molde },
        { id: 3, texto: 'Estado maquina', dato: estadoMaquina !== undefined && estadoMaquina !== null ? estadoMaquina : 'null', icono:estado },
        { id: 4, texto: 'Peso desmoldado', dato: PesoActualDesmoldado !== undefined && PesoActualDesmoldado !== null ? PesoActualDesmoldado : 'null', icono:peso  },
        { id: 5, texto: 'Tiempo transcurido', dato: TiempoTranscurrido !== undefined && TiempoTranscurrido !== null ? TiempoTranscurrido : '00:00 mm:ss', icono: tiempo },
        { id: 6, texto: 'Receta próximo', dato: idRecetaProxima !== undefined && idRecetaProxima !== null ? idRecetaProxima : 'null', icono:receta2 },
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
                                    <h4 className={textstyle.h4}>
                                        {texto === 'Peso desmoldado' ? `${dato} kg` : dato}
                                    </h4>
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