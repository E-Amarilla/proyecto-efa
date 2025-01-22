"use client";

import useWebSocket from '../../../utils/useWebSocket';
import style from '../texto.module.css';
import cont from './datosdesmoldeo.module.css';
import Link from "next/link";

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

    const estadoMaquina = "activo";

    const datosTiempoReal = [
        { id: 1, nombre: 'Nombre receta', dato: NombreReceta !== undefined && NombreReceta !== null ? NombreReceta : '-' },
        { id: 2, nombre: 'Peso por linea', dato: PesoProducto !== undefined && PesoProducto !== null ? PesoProducto + " kg"  : '-'},
        { id: 3, nombre: 'Total desmoldado', dato: PesoActual !== undefined && PesoActual !== null ? PesoActual + " kg"  : '-'},
    ];

    return (
        <>
            <ul className={style.datosTods}>
                {datosTiempoReal.map(({ id, nombre, dato }) => (
                    <li key={id} className={estadoMaquina === 'activo' || estadoMaquina === 'pausa' ? cont.datosIndvRed : cont.datosIndvGray}>
                        <Link className={estadoMaquina === 'activo' || estadoMaquina === 'pausa' ? style.detallesDatos : style.detallesDatosDesac} href='/desmoldeo/equipox'>
                            {estadoMaquina === 'activo' || estadoMaquina === 'pausa' ? (
                                <div className={style.contenedorActivo}>
                                    <h3 className={style.h3}>{nombre}</h3>
                                    <h4 className={style.h4}>{dato}</h4>
                                </div>
                            ) : (
                                <h3 className={style.h3inactivo}>{nombre}</h3>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default DatosDesmoldeo;