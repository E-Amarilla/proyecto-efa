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
import Link from "next/link";


const ExeHeader = () => {
  const pathname = usePathname();
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [userRole, setUserRole] = useState(null);

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
    // Recupera el objeto de usuario del localStorage
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      console.log("User role:", user.role); // Log para depuración
      setUserRole(user.role);
    }
  }, []);

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
                  userRole === "ADMIN" || id !== 3 ? (
                    <Link href={url}>
                      <Image
                        className={style.icon}
                        src={icon}
                        alt={`Icono ${id}`}
                      />
                    </Link>
                  ) : null
                )}
              </div>
            ))}
          </div>
          {logoutVisible && <Desloguear />}
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
