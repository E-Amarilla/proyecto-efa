"use client";

import React, { useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import cremImg from "@/assets/img/creminox.png";
import usuario from "@/assets/img/usuario.png";
import alarmaImg from "@/assets/img/alarma.png";
import MenuAlarmas from '../../components/dropdownalarmas/dropdown';
import Desloguear from '../../components/usuario/desloguear';
import style from './Header.module.css';
import ExeSubNav from './SubNav/ExeSubNav.jsx';
import Link from "next/link";

const ExeHeader = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // No renderizar nada durante SSR
  }

  const opcionesIconos = [
    { id: 1, icon: usuario, onClick: () => {} },
    { id: 2, icon: alarmaImg, isDropdown: true }
  ];

  const opcionesMenu = [
    { id: 1, url: "/camaras", text: "CAMARAS" },
    { id: 2, url: "/completo", text: "HOME" },
  ];

  return (
    <>
      <header className={style.contenedor}>
        <nav className={style.navbar}>
          <div className={style.icons}>
            {opcionesIconos.map(({ id, icon, onClick, isDropdown }) => (
              <div key={id} className={style.contenedorImg}>
                {isDropdown ? (
                    <MenuAlarmas icon={icon} />
                  ) : (
                    <Desloguear icon={icon} />
                  )
                }
              </div>
            ))}
          </div>
          <div className={style.centerText}>
            <p>FRANKFURT | IFFA ALEMANIA</p>
          </div>
          <div className={style.rightSection}>
            <ul className={style.navLinks}>
              {opcionesMenu.map(({ id, url, text }) => (
                <li key={id} className={style.itemNav}>
                  <Link 
                    href={url}
                    className={pathname === url ? style.activeLink : ''}
                  >
                    <span className={style.homeText}>{text}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={style.logo}>
              <Link href="https://creminox.com" target="_blank" rel="noopener noreferrer">
                <Image className={style.imgCREM} src={cremImg} alt="Creminox" />
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <ExeSubNav />
    </>
  );
};

export default ExeHeader;
