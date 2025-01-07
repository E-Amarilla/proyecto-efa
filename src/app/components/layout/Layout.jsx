"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";  // Importa Link de Next.js
import LayoutIMG from './IMG/LAYOUT.png';
import style from './Layout.module.css';

const Layout = () => {
  const sections = [
    { id: 1, name: "BandaA", path: "/desmoldeo/equipox", style: { top: "22.2%", left: "15.4%", width: "10%", height: "19%" }, styleclass: "BandaAsection" },
    { id: 2, name: "BandaB", path: "/desmoldeo/equipox", style: { top: "0%", left: "47%", width: "9.5%", height: "29.8%" }, styleclass: "BandaBsection" },
    { id: 3, name: "KUKA", path: "/desmoldeo/equipox", style: { top: "74%", left: "45.7%", width: "12.2%", height: "23.6%" }, styleclass: "KUKAsection" },
    { id: 4, name: "Torre", path: "/desmoldeo/equipox", style: { top: "38.9%", left: "68.1%", width: "11.3%", height: "21.6%" }, styleclass: "Torresection" },
    { id: 5, name: "SDDA", path: "/desmoldeo/equipox", style: { top: "18%", left: "83.6%", width: "6.5%", height: "63.5%" }, styleclass: "SDDAsection" },
    { id: 6, name: "Estacion Grippers", path: "/desmoldeo/equipox", style: { top: "69%", left: "10%", width: "18.5%", height: "20%" }, styleclass: "Grippersection" },
  ];

  return (
    <div className={style.layoutContainer}>
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

const Sector = ({ name }) => (
  <div className={style.sectorContainer}>
    <h1>{name}</h1>
    <p>Bienvenido a {name}.</p>
  </div>
);

export default Layout;