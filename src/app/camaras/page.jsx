"use client";

import style from './camaras.module.css';
import VideoStream from "./videostream/VideoStream"
import Link from 'next/link';

const Camaras = () => {
    return (
        <>
            <div className={style.contenedores}>
                <Link href="camaras/camara1" className={style.contenedor}>
                        <VideoStream cameraId="cam1" />        
                </Link>

                <Link href="camaras/camara2" className={style.contenedor}>
                        <VideoStream cameraId="cam2" />        
                </Link>

                <Link href="camaras/camara3" className={style.contenedor}>
                        <VideoStream cameraId="cam3" />        
                </Link>
            </div>
        </>
    );
};

export default Camaras;