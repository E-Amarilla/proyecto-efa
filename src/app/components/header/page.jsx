"use client";

//Next y React
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

//IMG
import cremImg from "@/assets/img/creminox.png";
import usuario from "@/assets/img/usuario.png";
import alarmaImg from "@/assets/img/alarma.png";

//Componentes
import MenuAlarmas from '../../components/dropdownalarmas/dropdown';
import Desloguear from '../../components/usuario/desloguear';
import ExeSubNav from './SubNav/ExeSubNav.jsx';
import DropdownBanderas from "../../components/traduccion/DropdownBanderas.jsx";

//Estilos
import style from './Header.module.css';



const ExeHeader = () => {
  const { t } = useTranslation();
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
    { id: 2, icon: alarmaImg, isDropdown: true },
    { id: 3, isIdioma: true },
  ];

  const opcionesMenu = [
    { id: 1, url: "/camaras", text: t('mayus.camaras') },
    { id: 2, url: "/completo", text: t('mayus.home') },
  ];

  return (
    <>
      <header className={style.contenedor}>
        <nav className={style.navbar}>
          <div className={style.icons}>
            {opcionesIconos.map(({ id, icon, onClick, isDropdown, isIdioma }) => (
              <div key={id} className={style.contenedorImg}>
                {isIdioma ? (
                  <DropdownBanderas />
                ) : isDropdown ? (
                  <MenuAlarmas icon={icon} />
                ) : (
                  <Desloguear icon={icon} />
                )}
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
