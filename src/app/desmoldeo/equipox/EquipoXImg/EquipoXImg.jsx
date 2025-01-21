"use client";

import { useEquipo } from "../EquipoContext";
import { useState, useEffect } from "react";
import style from "./EquipoXImg.module.css";
import Image from "next/image";

import ImgGripper1 from "@/assets/img/equipos/Equipo_Gripper1.png";
import ImgGripper2 from "@/assets/img/equipos/Equipo_Gripper2.png";
import ImgGripper3 from "@/assets/img/equipos/Equipo_Gripper3.png";
import ImgGripper4 from "@/assets/img/equipos/Equipo_Gripper4.png";
import ImgGripper5 from "@/assets/img/equipos/Equipo_Gripper5.png";
import ImgGripper6 from "@/assets/img/equipos/Equipo_Gripper6.png";

import ImgSDDA1 from "@/assets/img/equipos/Equipo_SDDA1.png";
import ImgSDDA2 from "@/assets/img/equipos/Equipo_SDDA2.png";
import ImgSDDA3 from "@/assets/img/equipos/Equipo_SDDA3.png";
import ImgSDDA4 from "@/assets/img/equipos/Equipo_SDDA4.png";

import ImgRobot1 from "@/assets/img/equipos/Equipo_Robot1.png";
import ImgRobot2 from "@/assets/img/equipos/Equipo_Robot2.png";
import ImgRobot3 from "@/assets/img/equipos/Equipo_Robot3.png";

import ImgTorre1 from "@/assets/img/equipos/Equipo_Torre1.png";
import ImgTorre2 from "@/assets/img/equipos/Equipo_Torre2.png";
import ImgTorre3 from "@/assets/img/equipos/Equipo_Torre3.png";

const imageSets = {
  Default: [
    { src: ImgTorre1, alt: "Torre Imagen-1" },
    { src: ImgTorre2, alt: "Torre Imagen-2" },
    { src: ImgTorre3, alt: "Torre Imagen-3" },
    { src: ImgGripper1, alt: "Gripper Imagen-1" },
    { src: ImgGripper2, alt: "Gripper Imagen-2" },
    { src: ImgGripper3, alt: "Gripper Imagen-3" },
    { src: ImgGripper4, alt: "Gripper Imagen-4" },
    { src: ImgGripper5, alt: "Gripper Imagen-5" },
    { src: ImgGripper6, alt: "Gripper Imagen-6" },
    { src: ImgRobot1, alt: "Imagen Equipo Robot" },
    { src: ImgRobot2, alt: "Imagen Equipo Robot" },
    { src: ImgRobot3, alt: "Imagen Equipo Robot" },
    { src: ImgSDDA1, alt: "SDDA Imagen-1" },
    { src: ImgSDDA2, alt: "SDDA Imagen-2" },
    { src: ImgSDDA3, alt: "SDDA Imagen-3" },
    { src: ImgSDDA4, alt: "SDDA Imagen-4" },
  ],
  Gripper: [
    { src: ImgGripper1, alt: "Gripper Imagen-1" },
    { src: ImgGripper2, alt: "Gripper Imagen-2" },
    { src: ImgGripper3, alt: "Gripper Imagen-3" },
    { src: ImgGripper4, alt: "Gripper Imagen-4" },
    { src: ImgGripper5, alt: "Gripper Imagen-5" },
    { src: ImgGripper6, alt: "Gripper Imagen-6" },
  ],
  Torre: [
    { src: ImgTorre1, alt: "Torre Imagen-1" },
    { src: ImgTorre2, alt: "Torre Imagen-2" },
    { src: ImgTorre3, alt: "Torre Imagen-3" },
  ],
  Robot: [
    { src: ImgRobot1, alt: "Robot Equipo-1" },
    { src: ImgRobot2, alt: "Robot Equipo-2" },
    { src: ImgRobot3, alt: "Robot Equipo-3" },
  ],
  SDDA: [
    { src: ImgSDDA1, alt: "SDDA Imagen-1" },
    { src: ImgSDDA2, alt: "SDDA Imagen-2" },
    { src: ImgSDDA3, alt: "SDDA Imagen-3" },
    { src: ImgSDDA4, alt: "SDDA Imagen-4" },
  ],
};

const EquipoXImg = () => {
  const { equipoSeleccionado } = useEquipo();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [equipoSeleccionado]);

  // Asegúrate de que 'images' tenga un valor por defecto si 'equipoSeleccionado' no está en 'imageSets'
  const images = imageSets[equipoSeleccionado] || [];
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
        {equipoSeleccionado ? `${equipoSeleccionado.toUpperCase()}` : "EQUIPOS"}
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
          <p className={style.noImageText}>Selecciona un equipo para ver imágenes</p>
        )}
      </div>
      <div className={style.indicators}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${style.indicator} ${index === currentIndex ? style.active : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default EquipoXImg;
