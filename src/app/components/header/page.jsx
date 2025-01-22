"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import cremImg from "@/assets/img/creminox.png";
import usuario from "@/assets/img/usuario.png";
import confImg from "@/assets/img/configuracion.png";
import alarmaImg from "@/assets/img/alarma.png";
import MenuAlarmas from '../../components/dropdownalarmas/dropdown';
import Desloguear from '../../components/usuario/desloguear';
import style from './Header.module.css';
import ExeSubNav from './SubNav/ExeSubNav.jsx';



const ExeHeader = () => {
  const { user, logout } = useContext(AuthContext);
  const pathname = usePathname();
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
    { id: 1, url: "/camaras", text: "CAMARAS" },
    { id: 2, url: "/completo", text: "HOME" },
  ];

  useEffect(() => {
    // Sincroniza el estado con la ruta actual en la carga del cliente
  }, [pathname]);

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
                    className={pathname === url ? style.activeLink : ''}
                  >
                    <span className={style.homeText}>{text}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className={style.logo}>
              <a href="https://creminox.com" target="_blank" rel="noopener noreferrer">
              <Image className={style.imgCREM} src={cremImg} alt="Creminox" />
              </a>
            </div>
          </div>
        </nav>
      </header>
      <ExeSubNav />
    </>
  );
};

export default ExeHeader;
