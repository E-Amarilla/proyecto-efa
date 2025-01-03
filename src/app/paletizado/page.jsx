"use client";

import Image from "next/image";
import maqImg from './IMG/nsd42jps.png';
import style from './Paletizado.module.css';

const Paletizado = () => {
    return (
        <>
            <div className={style.contenedor}>
                <div className={style.contenedorImagen}>
                    <Image className={style.img} src={maqImg} alt="Creminox" />
                </div>
                <h2>PALETIZADO</h2>
                <div>
                </div>
            </div>
        </>
    );
};

export default Paletizado;