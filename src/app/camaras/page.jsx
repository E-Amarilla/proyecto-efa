"use client";

import style from './camaras.module.css';
import VideoStream from "./videostream/VideoStream"

const Camaras = () => {
    return (
        <>
            <div className={style.contenedores}>
                <div className={style.contenedor}>
                    <div className={style.contenedorVideo}>
                        </div>
                            <VideoStream cameraId="cam1" />
                        <div>
                    </div>
                </div>
                <div className={style.contenedor}>
                    <div className={style.contenedorVideo}>
                        </div>
                            <VideoStream cameraId="cam2" />
                        <div>
                    </div>
                </div>
                <div className={style.contenedor}>
                    <div className={style.contenedorVideo}>
                        </div>
                            <VideoStream cameraId="cam3" />
                        <div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Camaras;