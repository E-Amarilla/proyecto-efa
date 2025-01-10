"use client";

import Image from "next/image";
import maqImg from './IMG/creminox.png';
import style from './configuraciones.module.css';

const Configuraciones = () => {
    return (
        <>
            <div className={style.contenedor}>
                <div className={style.contenedorImagen}>
                    <Image className={style.img} src={maqImg} alt="Creminox" />
                </div>
                <h2 className={style.h2}>CONFIGURACIONES</h2>
                <div>
                </div>
            </div>
        </>
    );
};

export default Configuraciones;