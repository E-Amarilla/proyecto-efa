"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./SubNav.module.css";
import puntoVerde from "./IMG/puntoVerde.png";
import puntoGris from "./IMG/puntoGris.png";

const SubNav = () => {
  const pathname = usePathname();

  const opcionesBotones = [
    { id: 1, path: "/completo", text: "COMPLETO" },
    { id: 2, path: "/desmoldeo", text: "DESMOLDEO" },
    { id: 3, path: "/encajonado", text: "ENCAJONADO" },
    { id: 4, path: "/paletizado", text: "PALETIZADO" },
  ];

  return (
    <div className={style.contenedor}>
      <div className={style.SubNav}>
        <ul className={style.navLinks}>
          {opcionesBotones.map(({ id, path, text }) => (
            <li
              key={id}
              className={`${style.itemNav} ${
                pathname === path ? style.active : ""
              }`}
            >
              <Link href={path}>
                <div className={style.navContent}>
                  <Image
                    className={style.puntosNav}
                    src={pathname === path ? puntoVerde : puntoGris}
                    alt="Punto"
                  />
                  <span>{text}</span>
                </div>
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