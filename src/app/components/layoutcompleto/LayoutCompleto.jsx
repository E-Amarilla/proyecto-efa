"use client";

import Link from "next/link";
import React from "react";

import style from './LayoutCompleto.module.css';
import DatosDesmoldeo from "./datosdesmoldeo/datosdesmoldeo";
import DatosEncajonado from "./datosencajonado/datosencajonado";
import DatosPaletizado from "./datospaletizado/datospaletizado";
import DatosEstadoDesmoldeo from "./datosdesmoldeo/datosestadodesmoldeo/datosestadodesmoldeo";
import DatosEstadoEncajonado from "./datosencajonado/datosestadoencajonado/datosestadoencajonado.jsx";
import DatosEstadoPaletizado from "./datospaletizado/datosestadopaletizado/datosestadopaletizado.jsx";

//Imagenes
import Image from "next/image";
import LayoutIMG from '@/assets/img/layoutcompleto.png';

const LayoutCompleto = () => {
  const sections = [
    {
      id: 1,
      name: "Desmoldeo",
      path: "/desmoldeo",
      position: { top: "36.2%", left: "0%", width: "35.3%", height: "63.8%" },
      styleClass: "secciondesbloqueada",
    },
    {
      id: 2,
      name: "Encajonado",
      path: "/encajonado",
      position: { top: "0.3%", left: "35.3%", width: "59.5%", height: "48%" },
      styleClass: "seccionbloqueada",
    },
    {
      id: 3,
      name: "Paletizado",
      path: "/paletizado",
      position: { top: "32.8%", left: "59.8%", width: "37.2%", height: "34%" },
      styleClass: "seccionbloqueada",
    },
    {
      id: 4,
      name: "Datos",
      path: "/",
      position: { top: "67.5%", left: "36.5%", width: "61.3%", height: "31.5%" },
      styleClass: "secciondatos",
    },
  ];

  return (
    <div className={style.layoutContainer}>
      <div className={`${style.backgroundImage} ${style.imageContainer}`}>
        <Image
          src={LayoutIMG}
          alt="Layout"
          width={1080} // Cambia según las dimensiones reales
          height={1920} // Cambia según las dimensiones reales
          priority
        />
      </div>
      {sections.map((section) => (
        <Link href={section.path} key={section.id}>
          <div
            className={`${style.interactiveSection} ${style[section.styleClass]}`}
            style={section.position}
          >
            <span className={style.tooltip}>{section.name}</span>
            {section.id === 1 && (
              <DatosEstadoDesmoldeo />
            )}
            {section.id === 2 && (
              <DatosEstadoEncajonado />
            )}
            {section.id === 3 && (
              <DatosEstadoPaletizado />
            )}
          </div>
        </Link>
      ))}
      <div
        className={`${style.interactiveSection} ${style.secciondatos} ${style.noBoxShadow}`}
        style={sections[3].position}
      >
        <DatosDesmoldeo />
        <DatosEncajonado />
        <DatosPaletizado />
      </div>
    </div>
  );
};

export default LayoutCompleto;
