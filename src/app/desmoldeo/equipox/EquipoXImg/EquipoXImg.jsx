"use client";
import { useState } from "react";
import style from "./EquipoXImg.module.css";
// Imágenes
import Image from "next/image";
import Img1 from "@/assets/img/equipos/EquipoX.png";
import Img2 from "@/assets/img/equipos/EquipoX2.png";
import Img3 from "@/assets/img/equipos/EquipoX3.png";

const images = [
  { src: Img1, alt: "Imagen Equipo X1" },
  { src: Img2, alt: "Imagen Equipo X2" },
  { src: Img3, alt: "Imagen Equipo X3" },
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
      <h1 className={style.title}>EQUIPO X</h1>
      <div className={style.carousel}>
        <button onClick={prevImage} className={style.button}>❮</button>
        <div className={style.sliderWrapper}>
          <div
            className={style.slider}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                className={style.img}
              />
            ))}
          </div>
        </div>
        <button onClick={nextImage} className={style.button}>❯</button>
      </div>
      <div className={style.indicators}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${style.indicator} ${
              index === currentIndex ? style.active : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default EquipoXImg;
