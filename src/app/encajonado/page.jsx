"use client";

import Image from "next/image";
import maqImg from './IMG/nsd42jps.png';
import style from './Encajonado.module.css';

const Encajonado = () => {
    return (
        <>
            <div className={style.contenedor}>
                <div className={style.contenedorImagen}>
                    <Image className={style.img} src={maqImg} alt="Creminox" />
                </div>
                <h2>ENCAJONADO</h2>
                <div>
                </div>
            </div>
        </>
    );
};

export default Encajonado;