"use client";

import useWebSocket from '../../../../utils/useWebSocket';
import style from './datosestadodesmoldeo.module.css';

const DatosEstadoDesmoldeo = () => {
    const pollId = "celda-completo";
    const { data, error, isConnected } = useWebSocket(pollId);

    const {
        EstadoDesmoldeo = 'activo',  // Valor por defecto "inactivo" si es null
        TiempoTransDesmoldeo = '00:00hs',  // Valor por defecto "00:00hs" si es null
    } = data || {};  // Si data es null, evita un error de desestructuración

    return (
        <>
            <div className={style.contenedorDatos}>
                <ul className={style.datosTods}>
                    {EstadoDesmoldeo === 'activo' || EstadoDesmoldeo === 'pausa' ? (
                        <li className={style.datosIndvRed}>
                            <div className={style.contenedorActivo}>
                                <h1 className={style.area}>Desmoldeo</h1>
                                <h3 className={style.estadoActivo}>{EstadoDesmoldeo.toUpperCase()}</h3>
                                <h4 className={style.tiempo}>Hace: {TiempoTransDesmoldeo}</h4>
                            </div>
                        </li>
                    ) : (
                        <li className={style.datosIndvGray}>
                            <div className={style.contenedorInactivo}>
                                <h1 className={style.area}>Desmoldeo</h1>
                                <h3 className={style.estadoInactivo}>{EstadoDesmoldeo.toUpperCase()}</h3>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
};

export default DatosEstadoDesmoldeo;