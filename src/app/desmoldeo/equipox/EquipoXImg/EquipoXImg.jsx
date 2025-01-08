"use client";
import { useState } from 'react';
import Image from "next/image";
import Img1 from './IMG/EquipoX.png';
import Img2 from './IMG/EquipoX2.png';
import Img3 from './IMG/EquipoX3.png';
import style from './EquipoXImg.module.css';

const images = [
    { src: Img1, alt: 'Imagen Equipo X1' },
    { src: Img2, alt: 'Imagen Equipo X2' },
    { src: Img3, alt: 'Imagen Equipo X3' }
];

const EquipoXImg = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className={style.all}>
            <h1 className={style.title}>Equipo X</h1>
            <div className={style.carousel}>
                <button onClick={prevImage} className={style.button}>❮</button>
                <Image 
                    src={images[currentIndex].src} 
                    alt={images[currentIndex].alt} 
                    className={style.img} 
                />
                <button onClick={nextImage} className={style.button}>❯</button>
            </div>
        </div>
    );
};

export default EquipoXImg;
