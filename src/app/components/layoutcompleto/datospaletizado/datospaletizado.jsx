"use client";

import useWebSocket from '../../../utils/useWebSocket';
import style from '../texto.module.css';
import cont from './datospaletizado.module.css';

const DatosPaletizado = () => {
    const pollId = "celda-completo";
    const { data, error, isConnected } = useWebSocket(pollId);

    const {
        PalVariableNN,
        PalVariableNN2,
        PalVariableNN3,
        // EstadoPaletizado, //
    } = data || {};  // Si data es null, evita un error de desestructuración

    const EstadoPaletizado = "activo";

    const datosTiempoReal = [
        { id: 1, nombre: 'Paletizado - Dato N°1', dato: PalVariableNN !== undefined && PalVariableNN !== null ? PalVariableNN : '0' },
        { id: 2, nombre: 'Paletizado - Dato N°2', dato: PalVariableNN2 !== undefined && PalVariableNN2 !== null ? PalVariableNN2 : '0' },
        { id: 3, nombre: 'Paletizado - Dato N°3', dato: PalVariableNN3 !== undefined && PalVariableNN3 !== null ? PalVariableNN : '0' },
    ];

    return (
        <>
            <div className={style.contenedorDatos}>
                <ul className={style.datosTods}>
                    {datosTiempoReal.map(({ id, nombre, dato }) => (
                        <li key={id} className={EstadoPaletizado === 'activo' || EstadoPaletizado === 'pausa' ? cont.datosIndvRed : cont.datosIndvGray}>
                            <a className={style.detallesDatos} href=''> {/* acá se va a incluir /encajonado/equipox. */}
                                {EstadoPaletizado === 'activo' || EstadoPaletizado === 'pausa' ? (
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


export default DatosPaletizado;