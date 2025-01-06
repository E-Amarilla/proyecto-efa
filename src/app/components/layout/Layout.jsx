"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";  // Importa Link de Next.js
import LayoutIMG from './IMG/LAYOUT.png';
import style from './Layout.module.css';

const Layout = () => {
  const sections = [
    { id: 1, name: "BandaB", path: "/BandaB", style: { top: "28.9%", left: "12.6%", width: "21.5%", height: "28.5%" }, styleclass: "rotatedsection1" },
    { id: 2, name: "KUKA", path: "/KUKA", style: { top: "52.7%", left: "44.7%", width: "10.1%", height: "18.7%" } },
    { id: 3, name: "BandaA", path: "/BandaA", style: { top: "2.8%", left: "39.6%", width: "15.5%", height: "42.7%" } },
    { id: 4, name: "SDDA", path: "/SDDA", style: { top: "49%", left: "66.2%", width: "15.4%", height: "26.9%" } },
  ];

return (
  <div className={style.layoutContainer}>
    <Image src={LayoutIMG} alt="Layout" className={style.backgroundImage} priority={true}/>
    {sections.map((section) => (
      <Link href={section.path}>
      <div
        key={section.id}
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