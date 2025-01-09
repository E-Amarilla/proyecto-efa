"use client";

import useWebSocket from '../../../../utils/useWebSocket';
import style from './datosestadopaletizado.module.css';

const DatosEstadoPaletizado = () => {
    const pollId = "celda-completo";
    const { data, error, isConnected } = useWebSocket(pollId);

    const {
        EstadoPaletizado = 'inactivo',  // Valor por defecto "inactivo" si es null
        TiempoTransPaletizado = '00:00hs',  // Valor por defecto "00:00hs" si es null
    } = data || {};  // Si data es null, evita un error de desestructuración

    return (
        <>
            <div className={style.contenedorDatos}>
                <ul className={style.datosTods}>
                    {EstadoPaletizado === 'activo' || EstadoPaletizado === 'pausa' ? (
                        <li className={style.datosIndvRed}>
                            <div className={style.contenedorActivo}>
                                <h1 className={style.area}>Paletizado</h1>
                                <h3 className={style.estadoActivo}>{EstadoPaletizado.toUpperCase()}</h3>
                                <h4 className={style.tiempo}>Hace: {TiempoTransPaletizado}</h4>
                            </div>
                        </li>
                    ) : (
                        <li className={style.datosIndvGray}>
                            <div className={style.contenedorInactivo}>
                                <h1 className={style.area}>Paletizado</h1>
                                <h3 className={style.estadoInactivo}>{EstadoPaletizado.toUpperCase()}</h3>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
};

export default DatosEstadoPaletizado;