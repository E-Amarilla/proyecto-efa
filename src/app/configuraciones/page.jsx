"use client";

import style from './configuraciones.module.css';
//Imagenes
import Image from "next/image";
import maqImg from '@/assets/img/creminox.png';

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