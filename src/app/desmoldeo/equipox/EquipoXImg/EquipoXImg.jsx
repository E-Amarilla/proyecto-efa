"use client";

import { useEquipo } from "../EquipoContext";
import { useState } from "react";
import style from "./EquipoXImg.module.css";
// Imágenes
import Image from "next/image";
import ImgDefault1 from "@/assets/img/equipos/EquipoX.png";
import ImgDefault2 from "@/assets/img/equipos/EquipoX2.png";
import ImgGripper from "@/assets/img/equipos/EquipoX3.png";
import ImgTorre from "@/assets/img/equipos/EquipoX3.png";
import ImgRobot from "@/assets/img/equipos/EquipoX3.png";
import ImgSDDA from "@/assets/img/equipos/EquipoX3.png";

const imageSets = {
  Default: 
  [
    { src: ImgDefault1, alt: "Imagen Equipo Default 1" },
    { src: ImgDefault2, alt: "Imagen Equipo Default 2" },
  ],
  Gripper: 
  [
    { src: ImgGripper, alt: "Imagen Equipo Gripper" }
  ],
  Torre: 
  [
    { src: ImgTorre, alt: "Imagen Equipo Torre" }
  ],
  Robot: 
  [
    { src: ImgRobot, alt: "Imagen Equipo Robot" }
  ],
  SDDA: 
  [
    { src: ImgSDDA, alt: "Imagen Equipo SDDA" }
  ],
};

const EquipoXImg = () => {
  const { equipoSeleccionado } = useEquipo();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = imageSets[equipoSeleccionado || "Default"];
  const totalImages = images.length;

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalImages - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={style.all}>
      <h1 className={style.title}>
        {equipoSeleccionado ? `EQUIPO ${equipoSeleccionado.toUpperCase()}` : "EQUIPOS"}
      </h1>
      <div className={style.carousel}>
        {totalImages > 0 ? (
          <>
            <button onClick={prevImage} className={style.button}>
              ❮
            </button>
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
            <button onClick={nextImage} className={style.button}>
              ❯
            </button>
          </>
        ) : (
          <p className={style.noImageText}>
            Selecciona un equipo para ver imágenes
          </p>
        )}
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
