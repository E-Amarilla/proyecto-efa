// Layout.jsx
"use client";

import React from "react";
import Link from "next/link";  // Importa Link de Next.js
import style from './Layout.module.css';
import EstadosLayout from "./estadoslayout/estadoslayout";
import { useEquipo } from "../../desmoldeo/equipox/EquipoContext";

//Imagenes
import Image from "next/image";
import LayoutIMG from '@/assets/img/LAYOUT.png';

const Layout = () => {
  const { setEquipoSeleccionado } = useEquipo();
  const sections = [
    { id: 1, name: "Torre", path: "/desmoldeo/equipox", style: { top: "6%", left: "72%", width: "11.35%", height: "89.5%" }, styleclass: "Torresection" },
    { id: 2, name: "SDDA", path: "/desmoldeo/equipox", style: { top: "35.8%", left: "54.65%", width: "17.35%", height: "33.5%" }, styleclass: "SDDAsection" },
    { id: 3, name: "Robot", path: "/desmoldeo/equipox", style: { top: "38.5%", left: "37.9%", width: "11.5%", height: "24.7%" }, styleclass: "ROBOTsection" },
    { id: 4, name: "Estación Grippers", path: "/desmoldeo/equipox", style: { top: "75%", left: "20%", width: "8.5%", height: "18%" }, styleclass: "Grippersection" }
  ];

  const handleSectionClick = (section) => {
    setEquipoSeleccionado(section.name);
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
            <span className={style.tooltip}>{section.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Layout;
