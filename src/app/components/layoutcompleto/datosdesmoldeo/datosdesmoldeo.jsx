"use client";

import useWebSocket from '../../../utils/useWebSocket';
import style from '../texto.module.css';
import cont from './style.module.css';

const DatosDesmoldeo = () => {
    const pollId = "resumen-desmoldeo";
    const { data, error, isConnected } = useWebSocket(pollId);

    // Desestructurar los datos recibidos
    const {
        NombreReceta,
        PesoTotalProducto,
        PesoNivelTorreProd,
    } = data || {};  // Si data es null, evita un error de desestructuración

    const datosTiempoReal = [
        { id: 1, nombre: 'Nombre receta', dato: NombreReceta !== undefined && NombreReceta !== null ? NombreReceta : 'null' },
        { id: 2, nombre: 'Peso total producto', dato: PesoTotalProducto !== undefined && PesoTotalProducto !== null ? PesoTotalProducto : 'null' },
        { id: 3, nombre: 'Torre nivel actual', dato: PesoNivelTorreProd !== undefined && PesoNivelTorreProd !== null ? PesoNivelTorreProd : 'null' },
    ];

    return (
        <>
            <div className={style.contenedorDatos}>
                <ul className={style.datosTods}>
                    {datosTiempoReal.map(({ id, nombre, dato }) => (
                        <li key={id} className={cont.datosIndv}>
                            <a className={style.detallesDatos} href='/desmoldeo/equipox'>
                                <h3 className={style.h3}>{nombre}</h3>
                                <h4 className={style.h4}>{dato}</h4>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default DatosDesmoldeo;