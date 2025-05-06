"use client";

import style from '../camara.module.css';
import VideoStream from "../videostream/VideoStream";
import { useRouter } from 'next/navigation';

const Camara1 = () => {
    const router = useRouter();

    return (
        <div className={style.contenedores}>
            <button 
                onClick={() => router.push('/camaras')}
                className={style.backButton}
            >
                ❮
            </button>
            <div className={style.contenedor}>
                <VideoStream cameraId="cam1" />
            </div>
        </div>
    );
};

export default Camara1;