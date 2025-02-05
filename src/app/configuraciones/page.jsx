"use client";

import style from './configuraciones.module.css';
// Imagenes

import Image from "next/image";
import receta2 from '@/assets/img/RECETA2.png';

import { useContext } from "react";
import AuthContext from "../context/AuthContext"

import maqImg from '@/assets/img/creminox.png';
import Selector from './selector/selector';
import textstyle from './texto.module.css';

const Configuraciones = () => {
    const { data } = useContext(AuthContext); // Obtiene datos del contexto

    const {
        idRecetaActual,
    } = data?.desmoldeo|| {};

    const NombreActual = data?.desmoldeo ? data?.desmoldeo["Nombre actual"] : 'null';

    const datosGeneralesIzq = [
        { id: 1, texto: 'DATO 1', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
        { id: 2, texto: 'DATO 2', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
        { id: 3, texto: 'DATO 3', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
        { id: 4, texto: 'DATO 4', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
        { id: 5, texto: 'DATO 5', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
        { id: 6, texto: 'DATO 6', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
        { id: 7, texto: 'DATO 7', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
        { id: 8, texto: 'DATO 8', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
    ];       

    const datosGeneralesDer = [
        { id: 1, texto: 'DATO 9', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
        { id: 2, texto: 'DATO 10', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
        { id: 3, texto: 'DATO 11', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
        { id: 4, texto: 'DATO 12', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
        { id: 5, texto: 'DATO 13', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
        { id: 6, texto: 'DATO 14', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
        { id: 7, texto: 'DATO 15', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
        { id: 8, texto: 'DATO 16', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
        { id: 9, texto: 'DATO 17', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null', icono:receta2  },
    ];  

    return (
        <>
            <div className={style.all}>
                <div className={style.Izq}>
                    <div className={style.selector}>
                        <Selector />
                    </div>
                    <div className={style.contenedor}>
                        <div className={style.datosGen}>
                            <ul className={style.lista}>
                                {datosGeneralesIzq.map(({ id, texto, dato, icono }) => (
                                    <li key={id} className={style.datoList}>
                                        <div className={style.detallesDatos} href='EquipoX'>
                                            <div className={style.texto}>
                                                <h3 className={textstyle.subtitulo}>{texto}</h3>
                                                <h4 className={textstyle.h4}>{dato}</h4>
                                            </div>
                                            <Image 
                                                src={icono} 
                                                alt={`Estado: ${id}`} 
                                                className={style.icon} 
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={style.Med}>
                    <div className={style.contenedor}>
                    <div className={style.datosGen}>
                            <ul className={style.lista}>
                                {datosGeneralesDer.map(({ id, texto, dato, icono }) => (
                                    <li key={id} className={style.datoList}>
                                        <div className={style.detallesDatos} href='EquipoX'>
                                            <div className={style.texto}>
                                                <h3 className={textstyle.subtitulo}>{texto}</h3>
                                                <h4 className={textstyle.h4}>{dato}</h4>
                                            </div>
                                            <Image 
                                                src={icono} 
                                                alt={`Estado: ${id}`} 
                                                className={style.icon} 
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={style.Der}>
                    <div className={style.contenedor}>
                        <div className={style.contenedorImagen}>
                            <Image className={style.img} src={maqImg} alt="Creminox" />
                        </div>
                        <h2 className={style.h2}>CONFIGURACIONES</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Configuraciones;