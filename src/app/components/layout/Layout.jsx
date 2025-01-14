"use client";

import React from "react";
import Link from "next/link";  // Importa Link de Next.js
import style from './Layout.module.css';
import EstadosLayout from "./estadoslayout/estadoslayout";

//Imagenes
import Image from "next/image";
import LayoutIMG from '@/assets/img/LAYOUT.png';

const Layout = () => {
  const sections = [
    { id: 1, name: "Torre", path: "/desmoldeo/equipox", style: { top: "3.5%", left: "77.65%", width: "14.4%", height: "94.6%" }, styleclass: "Torresection" },
    { id: 2, name: "SDDA", path: "/desmoldeo/equipox", style: { top: "35%", left: "55.9%", width: "23%", height: "35.5%" }, styleclass: "SDDAsection" },
    { id: 3, name: "Robot", path: "/desmoldeo/equipox", style: { top: "38%", left: "34.8%", width: "14.5%", height: "25.8%" }, styleclass: "ROBOTsection" },
    { id: 4, name: "Estacino Grippers", path: "/desmoldeo/equipox", style: { top: "75%", left: "12%", width: "10%", height: "21.6%" }, styleclass: "Grippersection" }
  ];

  return (
    <div className={style.layoutContainer}>
      <div className={style.estadoLayout}>
        <EstadosLayout />
      </div>
      <Image src={LayoutIMG} alt="Layout" className={style.backgroundImage} />
      {sections.map((section) => (
        <Link key={section.id} href={section.path}>
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
