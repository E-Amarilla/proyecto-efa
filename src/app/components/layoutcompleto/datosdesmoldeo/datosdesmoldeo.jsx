"use client";

import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import style from '../texto.module.css';
import cont from './datosdesmoldeo.module.css';
import Link from "next/link";

const DatosDesmoldeo = () => {
    const { data } = useContext(AuthContext); // Obtiene datos del contexto

    const desmoldeoData = data?.celda?.Desmoldeo || {};

    const {
        estadoMaquina = 'Inactivo',
        PesoProducto,
        PesoActualDesmoldado,
    } = desmoldeoData;
    
    const NombreActual = data?.celda?.Desmoldeo ? data?.celda?.Desmoldeo["Nombre actual"] : '-';

    // console.log("Datos recibidos desde el WebSocket:", data);

    const datosTiempoReal = [
        { id: 1, nombre: 'Nombre receta', dato: NombreActual !== undefined && NombreActual !== null ? NombreActual : '-' },
        { id: 2, nombre: 'Peso por fila', dato: PesoProducto !== undefined && PesoProducto !== null ? PesoProducto + " kg"  : '-'},
        { id: 3, nombre: 'Total desmoldado', dato: PesoActualDesmoldado !== undefined && PesoActualDesmoldado !== null ? PesoActualDesmoldado + " kg"  : '-'},
    ];

    return (
        <>
            <ul className={style.datosTods}>
                {datosTiempoReal.map(({ id, nombre, dato }) => (
                    <li key={id} className={estadoMaquina === 'Activo' || estadoMaquina === 'Pausado' ? cont.datosIndvRed : style.datosIndvGray}>
                        <Link className={estadoMaquina === 'Activo' || estadoMaquina === 'Pausado' ? style.detallesDatos : style.detallesDatosDesac} href='/desmoldeo/equipox'>
                            {estadoMaquina === 'Activo' || estadoMaquina === 'Pausado' ? (
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