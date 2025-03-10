"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./SubNav.module.css";

// Imagenes
import Image from "next/image";
import puntoVerde from "@/assets/img/puntoVerde.png";
import puntoGris from "@/assets/img/puntoGris.png";

const SubNav = () => {
  const pathname = usePathname();

  const opcionesBotones = [
    { id: 1, path: "/completo", text: "GENERAL", styleClass: style.secciondesbloqueada },
    { id: 2, path: ["/desmoldeo", "/desmoldeo/equipox"], text: "DEMOLDING", styleClass: style.secciondesbloqueada },
    { id: 3, path: "/encajonado", text: "PACKING", styleClass: style.seccionbloqueada },
    { id: 4, path: "/paletizado", text: "PALETIZED", styleClass: style.seccionbloqueada },
  ];

  return (
    <div className={style.contenedor}>
      <div className={style.SubNav}>
        <ul className={style.navLinks}>
          {opcionesBotones.map(({ id, path, text, styleClass }) => {
            // Verifica si pathname coincide con alguna de las rutas
            const isActive = Array.isArray(path)
              ? path.includes(pathname) // Si path es un array, verifica si pathname está en él
              : pathname === path; // Si path es una cadena, compara directamente

            return (
              <li
                key={id}
                className={`${style.itemNav} ${
                  isActive ? style.active : ""
                } ${styleClass}`}
              >
                <Link href={Array.isArray(path) ? path[0] : path}>
                  <Image
                    className={style.puntosNav}
                    src={isActive ? puntoVerde : puntoGris}
                    alt="Punto"
                  />
                  <span className={styleClass}>{text}</span>
                </Link>
                {isActive && (
                  <div className={style.barraSeleccionada}></div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SubNav;