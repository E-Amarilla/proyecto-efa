"use client";

import useWebSocket from '../../../utils/useWebSocket';
import style from '../texto.module.css';
import cont from './datosdesmoldeo.module.css';

const DatosDesmoldeo = () => {
    const pollId = "celda-completo";
    const { data, error, isConnected } = useWebSocket(pollId);

    const desmoldeoData = data?.Desmoldeo || {};
    const {
        // estadoMaquina = 'Inactivo', // Para fines de ejemplo está siendo declarado manualmente
        NombreReceta,
        PesoProducto,
        PesoActual,
    } = desmoldeoData;

    const estadoMaquina = "pausa";

    const datosTiempoReal = [
        { id: 1, nombre: 'Nombre receta', dato: NombreReceta !== undefined && NombreReceta !== null ? NombreReceta : '-' },
        { id: 2, nombre: 'Peso por linea de torre', dato: PesoProducto !== undefined && PesoProducto !== null ? PesoProducto + " kg"  : '-'},
        { id: 3, nombre: 'Total desmoldado', dato: PesoActual !== undefined && PesoActual !== null ? PesoActual + " kg"  : '-'},
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

export default DatosDesmoldeo;