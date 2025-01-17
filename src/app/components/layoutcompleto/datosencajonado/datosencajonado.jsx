"use client";

import useWebSocket from '../../../utils/useWebSocket';
import style from '../texto.module.css';
import cont from './datosencajonado.module.css';

const DatosEncajonado = () => {
    const pollId = "celda-completo";
    const { data, error, isConnected } = useWebSocket(pollId);

    const encajonadoData = data?.Encajonado || {};
    const {
        // estadoMaquina = 'Inactivo', // Para fines de ejemplo está siendo declarado manualmente
        EncVariableNN,
        EncVariableNN2,
        EncVariableNN3,
    } = encajonadoData || {};

    const estadoMaquina = "inactivo";

    const datosTiempoReal = [
        { id: 1, nombre: 'Encajonado - N°1', dato: EncVariableNN !== undefined && EncVariableNN !== null ? EncVariableNN : '-' },
        { id: 2, nombre: 'Encajonado - N°2', dato: EncVariableNN2 !== undefined && EncVariableNN2 !== null ? EncVariableNN2 : '-' },
        { id: 3, nombre: 'Encajonado - N°3', dato: EncVariableNN3 !== undefined && EncVariableNN3 !== null ? EncVariableNN : '-' },
    ];

    return (
        <>
            <div className={style.contenedorDatos}>
                <ul className={style.datosTods}>
                    {datosTiempoReal.map(({ id, nombre, dato }) => (
                        <li key={id} className={estadoMaquina === 'activo' || estadoMaquina === 'pausa' ? cont.datosIndvRed : style.datosIndvGray}>
                            <a className={estadoMaquina === 'activo' || estadoMaquina === 'pausa' ? style.detallesDatos : style.detallesDatosDesac} href='/encajonado/equipox'>
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

export default DatosEncajonado;