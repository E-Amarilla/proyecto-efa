"use client";

import { useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import style from './datosestadodesmoldeo.module.css';

const DatosEstadoDesmoldeo = () => {
    const { data } = useContext(AuthContext); // Obtiene datos del contexto

    const desmoldeoData = data?.[1]?.Desmoldeo || {};

    const {
        estadoMaquina = 'CICLO INACTIVO',
        TiempoTranscurrido = '00:00 hs',
    } = desmoldeoData;

    return (
        <>
            <div className={style.contenedorDatos}>
                <ul className={style.datosTods}>
                    {estadoMaquina === 'CICLO ACTIVO' ? (
                        <li className={style.datosIndvRed}>
                            <div className={style.contenedorActivo}>
                                <h1 className={style.area}>Desmoldeo</h1>
                                <h3 className={style.estadoActivo}>{String(estadoMaquina).toUpperCase()}</h3>
                                <h4 className={style.tiempo}>{TiempoTranscurrido}</h4>
                            </div>
                        </li>
                    ) : estadoMaquina === 'CICLO PAUSADO' ? (
                        <li className={style.datosIndvYellow}>
                            <div className={style.contenedorPausa}>
                                <h1 className={style.area}>Desmoldeo</h1>
                                <h3 className={style.estadoPausa}>{String(estadoMaquina).toUpperCase()}</h3>
                                <h4 className={style.tiempo}>{TiempoTranscurrido}</h4>
                            </div>
                        </li>
                    ) : (
                        <li className={style.datosIndvGray}>
                            <div className={style.contenedorInactivo}>
                                <h1 className={style.area}>Desmoldeo</h1>
                                <h3 className={style.estadoInactivo}>{String(estadoMaquina).toUpperCase()}</h3>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
};

export default DatosEstadoDesmoldeo;