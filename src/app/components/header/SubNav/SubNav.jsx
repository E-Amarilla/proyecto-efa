"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./SubNav.module.css";

//Imagenes
import Image from "next/image";
import puntoVerde from "@/assets/img/puntoVerde.png";
import puntoGris from "@/assets/img/puntoGris.png";

const SubNav = () => {
  const pathname = usePathname();

  const opcionesBotones = [
    { id: 1, path: "/completo", text: "COMPLETO", styleClass: style.secciondesbloqueada },
    { id: 2, path: "/desmoldeo", text: "DESMOLDEO", styleClass: style.secciondesbloqueada },
    { id: 3, path: "/encajonado", text: "ENCAJONADO", styleClass: style.seccionbloqueada },
    { id: 4, path: "/paletizado", text: "PALETIZADO", styleClass: style.seccionbloqueada },
  ];

  return (
    <div className={style.contenedor}>
      <div className={style.SubNav}>
        <ul className={style.navLinks}>
          {opcionesBotones.map(({ id, path, text, styleClass }) => (
            <li
              key={id}
              className={`${style.itemNav} ${
                pathname === path ? style.active : ""
              } ${styleClass}`}
            >
              <Link href={path}>
                <Image
                  className={style.puntosNav}
                  src={pathname === path ? puntoVerde : puntoGris}
                  alt="Punto"
                />
                <span className={styleClass}>{text}</span>
              </Link>
              {pathname === path && (
                <div className={style.barraSeleccionada}></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubNav;