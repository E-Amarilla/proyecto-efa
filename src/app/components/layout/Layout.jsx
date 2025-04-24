"use client";

import React, { useContext } from "react";
import Link from "next/link";
import style from './Layout.module.css';
import EstadosLayout from "./estadoslayout/estadoslayout";
import AuthContext from "../../context/AuthContext";
//Imagenes
import Image from "next/image";
import LayoutIMG from '@/assets/img/LAYOUT.png';
import { useTranslation } from "react-i18next";

const Layout = () => {
  const { t } = useTranslation('trad');
  const { equipoSeleccionado, setEquipoSeleccionado } = useContext(AuthContext);
  
  // Define las secciones con un ID constante (en español) y una clave de traducción
  const sections = [
    { 
      id: 1, 
      identifier: "Posicionador de torres", // ID constante en español para las validaciones
      translationKey: 'min.posicionadorDeTorres', // Clave para la traducción
      path: "/desmoldeo/equipox", 
      style: { top: "8.6%", left: "73%", width: "10.1%", height: "66%" }, 
      styleclass: "Torresection" 
    },
    { 
      id: 2, 
      identifier: "SDDA", 
      translationKey: 'mayus.SDDA', 
      path: "/desmoldeo/equipox", 
      style: { top: "30.65%", left: "59.9%", width: "12.3%", height: "21.8%" }, 
      styleclass: "SDDAsection" 
    },
    { 
      id: 3, 
      identifier: "Robot", 
      translationKey: 'min.robot', 
      path: "/desmoldeo/equipox", 
      style: { top: "33.4%", left: "48.3%", width: "7.8%", height: "16.3%" }, 
      styleclass: "ROBOTsection" 
    },
    { 
      id: 4, 
      identifier: "Gripper", 
      translationKey: 'min.gripper', 
      path: "/desmoldeo/equipox", 
      style: { top: "9.7%", left: "54.2%", width: "7.8%", height: "17.3%" }, 
      styleclass: "Grippersection" 
    },
    { 
      id: 5, 
      identifier: "Estación de grippers", 
      translationKey: 'min.estacionDeGrippers', 
      path: "/desmoldeo/equipox", 
      style: { top: "68.6%", left: "47.55%", width: "8.8%", height: "19.5%" }, 
      styleclass: "Estacionsection" 
    },
    { 
      id: 6, 
      identifier: "BandaA", 
      translationKey: 'min.bandaA', 
      path: "/desmoldeo/equipox", 
      style: { top: "2.9%", left: "47%", width: "9.6%", height: "23%" }, 
      styleclass: "BandaAsection" 
    },
    { 
      id: 7, 
      identifier: "BandaB", 
      translationKey: 'min.bandaB', 
      path: "/desmoldeo/equipox", 
      style: { top: "12.3%", left: "34.3%", width: "8.5%", height: "27%" }, 
      styleclass: "BandaBsection" 
    }
  ];

  const handleSectionClick = (section) => {
    // Usa el identificador en español para las validaciones internas
    setEquipoSeleccionado(section.identifier);
  };

  return (
    <div className={style.layoutContainer}>
      <div className={style.estadoLayout}>
        <EstadosLayout />
      </div>
      <Image src={LayoutIMG} alt="Layout" className={style.backgroundImage} />
      {sections.map((section) => (
        <Link key={section.id} href={section.path} onClick={() => handleSectionClick(section)}>
          <div
            className={`${style.interactiveSection} ${style[section.styleclass] || ""}`}
            style={section.style}
          >
            {/* Usa la traducción solo para mostrar el texto */}
            <span className={style.tooltip}>{t(section.translationKey)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Layout;