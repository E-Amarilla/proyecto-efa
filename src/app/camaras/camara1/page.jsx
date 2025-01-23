"use client";

import style from './camara1.module.css';
import VideoStream from "../videostream/VideoStream"

const Camara1 = () => {
    return (
        <>
            <div className={style.contenedores}>
                <div className={style.contenedor}>
                        <VideoStream cameraId="cam1" />        
                </div>
            </div>
        </>
    );
};

export default Camara1;