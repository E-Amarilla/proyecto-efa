"use client";

import useWebSocket from '../../../utils/useWebSocket';
import style from '../texto.module.css';
import cont from './datosdesmoldeo.module.css';

const DatosDesmoldeo = () => {
    const pollId = "celda-completo";
    const { data, error, isConnected } = useWebSocket(pollId);

    const {
        NombreReceta,
        PesoTotalProducto,
        PesoNivelTorreProd,
        // EstadoDesmoldeo, //
    } = data || {};  // Si data es null, evita un error de desestructuración

    const EstadoDesmoldeo = "activo";

    const datosTiempoReal = [
        { id: 1, nombre: 'Nombre receta', dato: NombreReceta !== undefined && NombreReceta !== null ? NombreReceta : '0' },
        { id: 2, nombre: 'Peso total producto', dato: PesoTotalProducto !== undefined && PesoTotalProducto !== null ? PesoTotalProducto : '0' },
        { id: 3, nombre: 'Torre nivel actual', dato: PesoNivelTorreProd !== undefined && PesoNivelTorreProd !== null ? PesoNivelTorreProd : '0' },
    ];

    return (
        <>
            <div className={style.contenedorDatos}>
                <ul className={style.datosTods}>
                    {datosTiempoReal.map(({ id, nombre, dato }) => (
                        <li key={id} className={EstadoDesmoldeo === 'activo' || EstadoDesmoldeo === 'pausa' ? cont.datosIndvRed : cont.datosIndvGray}>
                            <a className={style.detallesDatos} href='/desmoldeo/equipox'>
                                {EstadoDesmoldeo === 'activo' || EstadoDesmoldeo === 'pausa' ? (
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

export default DatosDesmoldeo;