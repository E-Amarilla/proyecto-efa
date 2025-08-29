"use client";

import { useContext } from "react";
import { useTranslation } from "react-i18next";
import AuthContext from "../../../context/AuthContext";
import style from '../texto.module.css';
import cont from './datosdesmoldeo.module.css';
import Link from "next/link";

const DatosDesmoldeo = () => {
    const { t } = useTranslation(); // o el namespace que corresponda: 'trad'
    const { data } = useContext(AuthContext); // Obtiene datos del contexto

    const {
        estadoMaquina = 'CICLO INACTIVO',
        CodigoProducto,
        PesoProducto,
        PesoActualDesmoldado,
    } = data?.[0] || {};

    const datosTiempoReal = [
        { id: 1, nombre: t('min.nombreReceta'), dato: CodigoProducto !== undefined && CodigoProducto !== null ? CodigoProducto : '-' },
        { id: 2, nombre: t('min.pesoFila'), dato: PesoProducto !== undefined && PesoProducto !== null ? PesoProducto + " kg"  : '-'},
        { id: 3, nombre: t('min.totalDesmoldado'), dato: PesoActualDesmoldado !== undefined && PesoActualDesmoldado !== null ? PesoActualDesmoldado + " kg"  : '-'},
    ];

    return (
        <>
            <ul className={style.datosTods}>
                {datosTiempoReal.map(({ id, nombre, dato }) => (
                    <li key={id} className={estadoMaquina === 'CICLO ACTIVO' || estadoMaquina === 'CICLO PAUSADO' ? cont.datosIndvRed : style.datosIndvGray}>
                        <Link className={estadoMaquina === 'CICLO ACTIVO' || estadoMaquina === 'CICLO PAUSADO' ? style.detallesDatos : style.detallesDatosDesac} href='/desmoldeo/equipox'>
                            {estadoMaquina === 'CICLO ACTIVO' || estadoMaquina === 'CICLO PAUSADO' ? (
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