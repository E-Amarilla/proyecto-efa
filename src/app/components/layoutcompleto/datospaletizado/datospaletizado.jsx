"use client";

import useWebSocket from '../../../utils/useWebSocket';
import style from '../texto.module.css';
import cont from './datospaletizado.module.css';

const DatosPaletizado = () => {
    const pollId = "celda-completo";
    const { data, error, isConnected } = useWebSocket(pollId);

    const paletizadoData = data?.Paletizado || {};
    const {
        // estadoMaquina = 'Inactivo', // Para fines de ejemplo está siendo declarado manualmente
        PalVariableNN,
        PalVariableNN2,
        PalVariableNN3,
    } = paletizadoData;

    const estadoMaquina = "inactivo";

    const datosTiempoReal = [
        { id: 1, nombre: 'Paletizado - N°1', dato: PalVariableNN !== undefined && PalVariableNN !== null ? PalVariableNN : '-' },
        { id: 2, nombre: 'Paletizado - N°2', dato: PalVariableNN2 !== undefined && PalVariableNN2 !== null ? PalVariableNN2 : '-' },
        { id: 3, nombre: 'Paletizado - N°3', dato: PalVariableNN3 !== undefined && PalVariableNN3 !== null ? PalVariableNN : '-' },
    ];

    return (
        <>
            <div className={style.contenedorDatos}>
                <ul className={style.datosTods}>
                    {datosTiempoReal.map(({ id, nombre, dato }) => (
                        <li key={id} className={estadoMaquina === 'activo' || estadoMaquina === 'pausa' ? cont.datosIndvRed : cont.datosIndvGray}>
                            <a className={style.detallesDatos} href='/desmoldeo/equipox'>
                                {estadoMaquina === 'activo' || estadoMaquina === 'pausa' ? (
                                    <div className={style.contenedorActivo}>
                                        <h3 className={style.h3}>{nombre}</h3>
                                        <h4 className={style.h4}>{dato}</h4>
                                    </div>
                                ) : (
                                    <div className={style.contenedorInactivo}>
                                        <h3 className={style.h3inactivo}>{nombre}</h3>
                                    </div>
                                )}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};


export default DatosPaletizado;