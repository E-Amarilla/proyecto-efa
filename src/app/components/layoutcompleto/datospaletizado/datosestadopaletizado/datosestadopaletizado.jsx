"use client";

import useWebSocket from '../../../../utils/useWebSocket';
import style from './datosestadopaletizado.module.css';

const DatosEstadoPaletizado = () => {
    const pollId = "celda-completo";
    const { data, error, isConnected } = useWebSocket(pollId);

    const paletizadoData = data?.Paletizado || {};
    const {
        // estadoMaquina = 'Inactivo', // Para fines de ejemplo está siendo declarado manualmente
        TiempoTranscurrido = '00:00 hs',
    } = paletizadoData;

    const estadoMaquina = 'inactivo'; // Ejemplo de valor

    return (
        <>
            <div className={style.contenedorDatos}>
                <ul className={style.datosTods}>
                    {estadoMaquina === 'Activo' || estadoMaquina === 'ACTIVO' || estadoMaquina === 'activo' ? (
                        <li className={style.datosIndvRed}>
                            <div className={style.contenedorActivo}>
                                <h1 className={style.area}>Paletized</h1>
                                <h3 className={style.estadoActivo}>ACTIVE</h3>
                                <h4 className={style.tiempo}>Since: {TiempoTranscurrido}</h4>
                            </div>
                        </li>
                    ) : estadoMaquina === 'Pausa' || estadoMaquina === 'PAUSA' || estadoMaquina === 'pausa' ? (
                        <li className={style.datosIndvYellow}>
                            <div className={style.contenedorPausa}>
                                <h1 className={style.area}>Paletized</h1>
                                <h3 className={style.estadoPausa}>PAUSED</h3>
                                <h4 className={style.tiempo}>Hace: {TiempoTranscurrido}</h4>
                            </div>
                        </li>
                    ) : (
                        <li className={style.datosIndvGray}>
                            <div className={style.contenedorInactivo}>
                                <h1 className={style.area}>Paletized</h1>
                                <h3 className={style.estadoInactivo}>INACTIVE</h3>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
};

export default DatosEstadoPaletizado;