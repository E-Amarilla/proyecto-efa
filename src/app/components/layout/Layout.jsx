"use client";

import React, { useContext } from "react";  // Importa useContext de React
import Link from "next/link";  // Importa Link de Next.js
import style from './Layout.module.css';
import EstadosLayout from "./estadoslayout/estadoslayout";
import AuthContext from "../../context/AuthContext";
//Imagenes
import Image from "next/image";
import LayoutIMG from '@/assets/img/LAYOUT.png';

const Layout = () => {
  const { equipoSeleccionado, setEquipoSeleccionado } = useContext(AuthContext);
  const sections = [
    { id: 1, name: "Tower positioner", path: "/desmoldeo/equipox", style: { top: "8.6%", left: "73%", width: "10.1%", height: "66%" }, styleclass: "Torresection" },
    { id: 2, name: "SDDA", path: "/desmoldeo/equipox", style: { top: "30.65%", left: "59.9%", width: "12.3%", height: "21.8%" }, styleclass: "SDDAsection" },
    { id: 3, name: "Robot", path: "/desmoldeo/equipox", style: { top: "33.4%", left: "48.3%", width: "7.8%", height: "16.3%" }, styleclass: "ROBOTsection" },
    { id: 4, name: "Gripper", path: "/desmoldeo/equipox", style: { top: "9.7%", left: "54.2%", width: "7.8%", height: "17.3%" }, styleclass: "Grippersection" },
    { id: 5, name: "Gripper Station", path: "/desmoldeo/equipox", style: { top: "68.6%", left: "47.55%", width: "8.8%", height: "19.5%" }, styleclass: "Estacionsection" },
    { id: 6, name: "BandA", path: "/desmoldeo/equipox", style: { top: "2.9%", left: "47%", width: "9.6%", height: "23%" }, styleclass: "BandaAsection" },
    { id: 7, name: "BandB", path: "/desmoldeo/equipox", style: { top: "12.3%", left: "34.3%", width: "8.5%", height: "27%" }, styleclass: "BandaBsection" }
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
