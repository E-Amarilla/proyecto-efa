"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation'; // Usa usePathname en lugar de useRouter
import Image from "next/image";
import cremImg from './IMG/creminox.png';
import usuario from './IMG/usuario.png';
import confImg from './IMG/configuracion.png';
import alarmaImg from './IMG/alarma.png';
import MenuAlarmas from '../../components/dropdownalarmas/dropdown';
import Desloguear from '../../components/usuario/desloguear';
import style from './Header.module.css';
import ExeSubNav from './SubNav/ExeSubNav.jsx';

const ExeHeader = () => {
  const pathname = usePathname(); // Obtén la ruta actual
  const [logoutVisible, setLogoutVisible] = useState(false);

  const toggleLogout = () => {
    setLogoutVisible(true);
  };

  const opcionesIconos = [
    { id: 1, icon: usuario, onClick: toggleLogout },
    { id: 2, icon: alarmaImg, isDropdown: true },
    { id: 3, url: "/configuraciones", icon: confImg },
  ];

  const opcionesMenu = [
    { id: 1, url: "/completo", text: "HOME" },
  ];

  return (
    <>
      <header className={style.contenedor}>
        <nav className={style.navbar}>
          <div className={style.icons}>
            {opcionesIconos.map(({ id, url, icon, onClick, isDropdown }) => (
              <div key={id} className={style.contenedorImg}>
                {isDropdown ? (
                    <MenuAlarmas icon={icon} />
                ) : onClick ? (
                    <Desloguear icon={icon} />
                ) : (
                  <a href={url}>
                    <Image
                      className={style.icon}
                      src={icon}
                      alt={`Icono ${id}`}
                    />
                  </a>
                )}
              </div>
            ))}
          </div>
          {logoutVisible && <Desloguear />}
          <div className={style.centerText}>
            <p>SDDA - EFA PROYECTO</p>
          </div>
          <div className={style.rightSection}>
            <ul className={style.navLinks}>
              {opcionesMenu.map(({ id, url, text }) => (
                <li key={id} className={style.itemNav}>
                  <a
                    href={url}
                    className={
                      pathname === url ? style.activeLink : ''
                    } // Añadir clase activa si la ruta coincide
                  >
                    <span className={style.homeText}>{text}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className={style.logo}>
              <Image className={style.imgCREM} src={cremImg} alt="Creminox" />
            </div>
          </div>
        </nav>
      </header>
      <ExeSubNav />
    </>
  );
};

export default ExeHeader;
