"use client";

import ProtectedRoute from '../utils/ProtectedRoute';

import style from './camaras.module.css';
//Imagenes
import Image from "next/image";
import maqImg from '@/assets/img/creminox.png';

const Camaras = () => {
    return (
        <ProtectedRoute>
        <h1 className={style.h1}>CAMARAS</h1>
            <div className={style.contenedores}>
                <div className={style.contenedor}>
                    <div className={style.contenedorImagen}>
                        </div>
                            <Image className={style.img} src={maqImg} alt="Creminox" />
                            <h2 className={style.h2}>CAMARAS</h2>
                        <div>
                    </div>
                </div>
                <div className={style.contenedor}>
                    <div className={style.contenedorImagen}>
                        </div>
                            <Image className={style.img} src={maqImg} alt="Creminox" />
                            <h2 className={style.h2}>CAMARAS</h2>
                        <div>
                    </div>
                </div>
                <div className={style.contenedor}>
                    <div className={style.contenedorImagen}>
                        </div>
                            <Image className={style.img} src={maqImg} alt="Creminox" />
                            <h2 className={style.h2}>CAMARAS</h2>
                        <div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Camaras;