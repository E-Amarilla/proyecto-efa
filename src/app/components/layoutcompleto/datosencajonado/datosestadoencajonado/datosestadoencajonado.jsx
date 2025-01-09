"use client";

import useWebSocket from '../../../../utils/useWebSocket';
import style from './datosestadoencajonado.module.css';

const DatosEstadoEncajonado = () => {
    const pollId = "celda-completo";
    const { data, error, isConnected } = useWebSocket(pollId);

    const {
        EstadoEncajonado = 'activo',  // Valor por defecto "inactivo" si es null
        TiempoTransEncajonado = '00:00hs',  // Valor por defecto "00:00hs" si es null
    } = data || {};  // Si data es null, evita un error de desestructuración

    return (
        <>
            <div className={style.contenedorDatos}>
                <ul className={style.datosTods}>
                    {EstadoEncajonado === 'activo' || EstadoEncajonado === 'pausa' ? (
                        <li className={style.datosIndvRed}>
                            <div className={style.contenedorActivo}>
                                <h1 className={style.area}>Encajonado</h1>
                                <h3 className={style.estadoActivo}>{EstadoEncajonado.toUpperCase()}</h3>
                                <h4 className={style.tiempo}>Hace: {TiempoTransEncajonado}</h4>
                            </div>
                        </li>
                    ) : (
                        <li className={style.datosIndvGray}>
                            <div className={style.contenedorInactivo}>
                                <h1 className={style.area}>Encajonado</h1>
                                <h3 className={style.estadoInactivo}>{EstadoEncajonado.toUpperCase()}</h3>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
};

export default DatosEstadoEncajonado;