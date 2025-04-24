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
import React from 'react';

import style from './DatosGenerales.module.css';
import textstyle from '../texto.module.css';
import { useTranslation } from "react-i18next";


const DatosGenerales = () => {
    const { t } = useTranslation('trad');
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
        { id: 1, texto: t('min.recetaActual'), dato: CodigoProducto !== undefined && CodigoProducto !== null ? CodigoProducto : 'null', icono:receta1 },
        { id: 2, texto: t('min.nroMolde'), dato: TipoMolde !== null ? TipoMolde : 'null', icono: molde },
        { id: 3, texto: t('min.estadoMaquina'), dato: estadoMaquina !== undefined && estadoMaquina !== null ? estadoMaquina : 'null', icono:estado },
        { id: 4, texto: t('min.pesoDesmoldado'), dato: PesoActualDesmoldado !== undefined && PesoActualDesmoldado !== null ? PesoActualDesmoldado : 'null', icono:peso  },
        { id: 5, texto: t('min.tiempoTranscurrido'), dato: TiempoTranscurrido !== undefined && TiempoTranscurrido !== null ? TiempoTranscurrido : '00:00 mm:ss', icono: tiempo },
        { id: 6, texto: t('min.recetaProxima'), dato: idRecetaProxima !== undefined && idRecetaProxima !== null ? idRecetaProxima : 'null', icono:receta2 },
    ];       

    return (
        <>
            <div className={style.datosGen}>
                <h1 className={textstyle.titulo}>{t('mayus.datosGenerales')}</h1>
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