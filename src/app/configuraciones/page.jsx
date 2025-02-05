"use client";

import style from './configuraciones.module.css';
// Imagenes

import Image from "next/image";
import receta2 from '@/assets/img/RECETA2.png';

import { useContext, useState, useEffect, useRef } from "react";
import Link from "next/link";
import AuthContext from "../context/AuthContext"

import maqImg from '@/assets/img/creminox.png';
import Selector from './selector/selector';
import textstyle from './texto.module.css';

import BotonAplicar from '../components/botones/aplicarcorrecion/botonaplicar';
import SelectConfiguracion from '../components/botones/selectConfiguracion/selectConfiguracion'

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

    const datosCorrecionesTorre = [
        { id: 1, texto: 'Coreccion_hBastidor', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null'},
        { id: 2, texto: 'Coreccion_hAjuste', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null'},
        { id: 3, texto: 'Coreccion_hAjusteN1', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null'},
        { id: 4, texto: 'Coreccion_DisteNivel', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null'},
        { id: 5, texto: 'Coreccion_hNivel1', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null'},
        { id: 6, texto: 'hDeltaeNiveles', dato: idRecetaActual !== undefined && idRecetaActual !== null ? idRecetaActual : 'null'}
    ];
    
    const opcionesCorrecciones = [
        { id: 1, nombre: 'TORRES' },
        { id: 2, nombre: 'NIVELES' },
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (id) => {
        setSelectedOption(prev => (prev === id ? null : id));
    };

    return (
        <div className={style.all}>
            <div className={style.Izq}>
                <div className={style.selector}>
                    <SelectConfiguracion />
                </div>
                <div className={style.contenedor}>
                    <div className={style.datosGen}>
                        <ul className={style.lista}>
                            {datosGeneralesIzq.map(({ id, texto, dato, icono }) => (
                                <li key={id} className={style.datoList}>
                                    <div className={style.detallesDatos}>
                                        <div className={style.texto}>
                                            <h3 className={textstyle.subtitulo}>{texto}</h3>
                                            <h4 className={textstyle.h4}>{dato}</h4>
                                        </div>
                                        <Image src={icono} alt={`Estado: ${id}`} className={style.icon} />
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
                                    <div className={style.detallesDatos}>
                                        <div className={style.texto}>
                                            <h3 className={textstyle.subtitulo}>{texto}</h3>
                                            <h4 className={textstyle.h4}>{dato}</h4>
                                        </div>
                                        <Image src={icono} alt={`Estado: ${id}`} className={style.icon} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className={style.Der}>
                <div className={style.tituloCorreciones}>
                    <h2 className={style.h2}>CORRECIONES</h2>
                </div>
                <div className={style.botonesCorreciones}>
                    <ul className={style.navList}>
                        {opcionesCorrecciones.map(({ id, nombre }) => (
                            <li key={id} className={style.navItem}>
                                <button
                                    className={`${style.navLink} ${selectedOption === id ? style.active : ''}`}
                                    onClick={() => handleOptionClick(id)}
                                >
                                    {nombre}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={style.contenedor}>
                    <div className={style.datosGenCorreciones}>
                        <ul className={style.lista}>
                            {datosCorrecionesTorre.map(({ id, texto, dato }) => (
                                <li key={id} className={style.datoListCorreciones}>
                                    <div className={style.detallesDatos}>
                                        <div className={style.texto}>
                                            <h3 className={textstyle.subtitulo}>{texto}</h3>
                                            <h4 className={textstyle.h4}>{dato} - <input className={style.inputCorreciones}></input> </h4>
                                        </div>
                                        <BotonAplicar className={style.botonAplicar} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configuraciones;