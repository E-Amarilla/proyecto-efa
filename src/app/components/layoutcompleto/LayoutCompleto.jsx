"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import LayoutIMG from './IMG/layoutcompleto.png';
import style from './LayoutCompleto.module.css';

const LayoutCompleto = () => {
  const sections = [
    {
      id: 1,
      name: "Desmoldeo",
      path: "/desmoldeo",
      position: { top: "36.2%", left: "0.2%", width: "35.2%", height: "63%" },
      styleClass: "secciondesbloqueda",
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
  ];

  return (
    <div className={style.layoutContainer}>
      <Image src={LayoutIMG} alt="Layout" className={style.backgroundImage} priority={true}/>
      {sections.map((section) => (
        <Link href={section.path} key={section.id}>
          <div
            className={`${style.interactiveSection} ${style[section.styleClass]}`}
            style={section.position}
          >
            <span className={style.tooltip}>{section.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LayoutCompleto;