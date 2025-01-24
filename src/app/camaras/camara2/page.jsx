"use client";

import style from '../camara.module.css';
import VideoStream from "../videostream/VideoStream"

const Camara2 = () => {
    return (
        <div className={style.contenedores}>
            <div className={style.contenedor}>
                    <VideoStream cameraId="cam2" />        
            </div>
        </div>
    );
};

export default Camara2;