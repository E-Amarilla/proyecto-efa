"use client";

import useWebSocket from '../../../../utils/useWebSocket';
import style from './datosestadopaletizado.module.css';
import { useTranslation } from "react-i18next";

const DatosEstadoPaletizado = () => {
    const { t } = useTranslation('trad');
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
                                <h1 className={style.area}>{t('min.paletizado')}</h1>
                                <h3 className={style.estadoActivo}>{t('mayus.cicloActivo')}</h3>
                                <h4 className={style.tiempo}>Hace: {TiempoTranscurrido}</h4>
                            </div>
                        </li>
                    ) : estadoMaquina === 'Pausa' || estadoMaquina === 'PAUSA' || estadoMaquina === 'pausa' ? (
                        <li className={style.datosIndvYellow}>
                            <div className={style.contenedorPausa}>
                                <h1 className={style.area}>{t('min.paletizado')}</h1>
                                <h3 className={style.estadoPausa}>{t('mayus.cicloPausado')}</h3>
                                <h4 className={style.tiempo}>Hace: {TiempoTranscurrido}</h4>
                            </div>
                        </li>
                    ) : (
                        <li className={style.datosIndvGray}>
                            <div className={style.contenedorInactivo}>
                                <h1 className={style.area}>{t('min.paletizado')}</h1>
                                <h3 className={style.estadoInactivo}>{t('mayus.cicloInactivo')}</h3>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
};

export default DatosEstadoPaletizado;