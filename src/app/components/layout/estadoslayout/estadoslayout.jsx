"use client";

import { useContext } from 'react';
import AuthContext from "../../../context/AuthContext";
import style from './estadoslayout.module.css';

//Imagenes
import Image from "next/image";
import puntoGris from '@/assets/img/puntoGris.png';
import puntoVerde from '@/assets/img/puntoVerde.png';
import puntoRojo from '@/assets/img/puntoRojo.png';


const EstadosLayout = () => {
    
    const { data } = useContext(AuthContext);

    const desmoldeoData = data?.[1].Desmoldeo || {};

    const {
        estadoMaquina = "CICLO INACTIVO",
    } = desmoldeoData;
    return (
        <>
            <div className={style.contenedorDatos}>
                <ul className={style.datosTods}>
                    {estadoMaquina === ("CICLO ACTIVO" || "activo")  ? (
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
                    ) : estadoMaquina === ("CICLO PAUSADO" || "pausado") ? (
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
                    ) : estadoMaquina === ("CICLO INACTIVO" || "inactivo")  ? (
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

