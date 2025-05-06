"use client";

import style from '../camara.module.css';
import VideoStream from "../videostream/VideoStream";
import { useRouter } from 'next/navigation';

const Camara3 = () => {
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
                <VideoStream cameraId="cam3" />
            </div>
        </div>
    );
};

export default Camara3;