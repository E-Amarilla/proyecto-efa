"use client";

//Next y React
import React, { useState, useEffect, useContext } from 'react';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import AuthContext from '../../context/AuthContext';

//IMG
import cremImg from "@/assets/img/creminox.png";

import alarmaImg from "@/assets/img/alarma.png";
import confImg from "@/assets/img/configuracion.png";

//Componentes
import MenuAlarmas from '../../components/dropdownalarmas/dropdown';
import Desloguear from './desloguear.jsx';
import ExeSubNav from './SubNav/ExeSubNav.jsx';
import DropdownBanderas from "../../components/traduccion/DropdownBanderas.jsx";

//Estilos
import style from './Header.module.css';

const ExeHeader = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const userRole = user?.role;
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // No renderizar nada durante SSR
  }

  const opcionesIconos = [
    { id: 1, isUsuario: true }, // Cambiar esta línea
    { id: 2, icon: alarmaImg, isDropdown: true },
    { id: 3, url: "/configuraciones", icon: confImg },
    { id: 4, isIdioma: true },
  ];

  const opcionesMenu = [
    { id: 1, url: "/camaras", text: t('mayus.camaras') },
    { id: 2, url: "/completo", text: t('mayus.home') },
  ];

  const iconosFiltrados = opcionesIconos.filter(opcion => 
    opcion.id !== 3 || userRole === "ADMIN"
  );

  return (
    <>
      <header className={style.contenedor}>
        <nav className={style.navbar}>
        <div className={style.icons}>
          {iconosFiltrados.map((opcion, index) => (
            <div key={opcion.id} className={style.contenedorImg}>
              {opcion.isIdioma ? (
                <DropdownBanderas />
              ) : opcion.isDropdown ? (
                <MenuAlarmas icon={opcion.icon} />
              ) : opcion.isUsuario ? ( // Cambiar esta condición
                <Desloguear />
              ) : (
                <div className={style.linkWrapper}>
                  <Link href={opcion.url || '#'}>
                    <Image
                      className={style.icon}
                      src={opcion.icon}
                      alt={`Icono ${index + 1}`}
                      width={24}
                      height={24}
                    />
                  </Link>
                </div>
              )}
            </div>
          ))}
          </div>
          <div className={style.centerText}>
            <p>MXEF-04 | CELDA DE DESMOLDEO</p>
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
