"use client";

import { useContext } from 'react';
import useWebSocket from '../../../utils/useWebSocket';
import AuthContext from "../../../context/AuthContext";
import style from './estadoslayout.module.css';

//Imagenes
import Image from "next/image";
import puntoGris from '@/assets/img/puntoGris.png';
import puntoVerde from '@/assets/img/puntoVerde.png';
import puntoRojo from '@/assets/img/puntoRojo.png';


const EstadosLayout = () => {
    
    const { data } = useContext(AuthContext); // Obtiene datos del contexto

    const desmoldeoData = data?.celda?.Desmoldeo || {};

    const {
        estadoMaquina = 'Inactivo',
    } = desmoldeoData;

    return (
        <>
            <div className={style.contenedorDatos}>
                <ul className={style.datosTods}>
                    {estadoMaquina === ("Activo" || "activo")  ? (
                        <li className={style.datosIndvRed}>
                            <div className={style.contenedores}>
                                <Image
                                    src={puntoVerde} 
                                    className={style.icon}
                                    alt={'Icono'}
                                /> 
                                <h3 className={style.estadoActivo}>{estadoMaquina.toUpperCase()}</h3>
                            </div>
                        </li>
                    ) : estadoMaquina === ("Pausado" || "pausado") ? (
                        <li className={style.datosIndvRed}>
                            <div className={style.contenedores}>
                                <Image
                                    src={puntoGris} 
                                    className={style.icon}
                                    alt={'Icono'}
                                /> 
                                <h3 className={style.estadoPausa}>{estadoMaquina.toUpperCase()}</h3>
                            </div>
                        </li>
                    ) : estadoMaquina === ("Inactivo" || "inactivo")  ? (
                        <li className={style.datosIndvGray}>
                            <div className={style.contenedores}>
                                <Image
                                    src={puntoRojo} 
                                    className={style.icon}
                                    alt={'Icono'}
                                /> 
                                <h3 className={style.estadoInactivo}>{estadoMaquina.toUpperCase()}</h3>
                            </div>
                        </li>
                    ) : (
                        <li className={style.datosIndvGray}>
                            <div className={style.contenedorEspera}>
                                <h3 className={style.estadoEspera}>{'Loading...'}</h3>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
};

export default EstadosLayout;

