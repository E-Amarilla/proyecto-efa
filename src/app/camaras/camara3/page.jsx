"use client";

import style from './camara3.module.css';
import VideoStream from "../videostream/VideoStream"

const Camara3 = () => {
    return (
        <>
            <div className={style.contenedores}>
                <div className={style.contenedor}>
                        <VideoStream cameraId="cam3" />        
                </div>
            </div>
        </>
    );
};

export default Camara3;