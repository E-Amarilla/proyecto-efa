import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
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
  const { user } = useContext(AuthContext); // Se obtiene el usuario desde el contexto
  const userRole = user?.role; // Se accede al rol directamente
  const pathname = usePathname();

  const opcionesIconos = [
    { id: 1, icon: usuario, onClick: () => {} },
    { id: 2, icon: alarmaImg, isDropdown: true },
    { id: 3, url: "/configuraciones", icon: confImg },
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
            {opcionesIconos.map(({ id, url, icon, onClick, isDropdown }) => (
              <div key={id} className={style.contenedorImg}>
                {isDropdown ? (
                    <MenuAlarmas icon={icon} />
                ) : onClick ? (
                    <Desloguear icon={icon} />
                ) : (
                  // Ejemplo de ocultar el enlace basado en el rol
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
