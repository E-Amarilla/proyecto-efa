"use client";

import useWebSocket from '../../../utils/useWebSocket';
import style from '../texto.module.css';
import cont from './datosencajonado.module.css';

const DatosEncajonado = () => {
    const pollId = "celda-completo";
    const { data, error, isConnected } = useWebSocket(pollId);

    const {
        EncVariableNN,
        EncVariableNN2,
        EncVariableNN3,
        //EstadoEncajonado, //
    } = data || {};  // Si data es null, evita un error de desestructuración

    const EstadoEncajonado = "activo";

    const datosTiempoReal = [
        { id: 1, nombre: 'Encajonado - Dato N°1', dato: EncVariableNN !== undefined && EncVariableNN !== null ? EncVariableNN : '0' },
        { id: 2, nombre: 'Encajonado - Dato N°2', dato: EncVariableNN2 !== undefined && EncVariableNN2 !== null ? EncVariableNN2 : '0' },
        { id: 3, nombre: 'Encajonado - Dato N°3', dato: EncVariableNN3 !== undefined && EncVariableNN3 !== null ? EncVariableNN : '0' },
    ];

    return (
        <>
            <div className={style.contenedorDatos}>
                <ul className={style.datosTods}>
                    {datosTiempoReal.map(({ id, nombre, dato }) => (
                        <li key={id} className={EstadoEncajonado === 'activo' || EstadoEncajonado === 'pausa' ? cont.datosIndvRed : cont.datosIndvGray}>
                            <a className={style.detallesDatos} href=''> {/* acá se va a incluir /encajonado/equipox. */}
                                {EstadoEncajonado === 'activo' || EstadoEncajonado === 'pausa' ? (
                                    <div className={style.contenedorActivo}>
                                        <h3 className={style.h3}>{nombre}</h3>
                                        <h4 className={style.h4}>{dato}</h4>
                                    </div>
                                ) : (
                                    <div className={style.contenedorInactivo}>
                                        <h3 className={style.h3inactivo}>{nombre}</h3> {/* acá se va a incluir {nombre} cuando se definan las variables */}
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