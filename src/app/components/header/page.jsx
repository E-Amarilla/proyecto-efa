import React, { useState } from 'react';

import Image from "next/image"
import cremImg from './IMG/creminox.png';
import usuario from './IMG/usuario.png';
import campImg from './IMG/campana.png';
import alarmaImg from './IMG/alarma.png';

// Estilos de Header
import style from './header.module.css'; 

// Componente SubNav
import ExeSubNav from './subnav/exesubnav.jsx';

const ExeHeader = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [activeLink, setActiveLink] = useState(false); // Manejar el estado del enlace activo

    const toggleMenu = () => {
        setMenuVisible((prev) => !prev);
    };

    const handleLinkClick = () => {
        setActiveLink((prev) => !prev); // Cambiar el estado del enlace activo
    };

    const opcionesIconos = [
        { id: 1, icon: usuario }, // Este ícono activará el menú
        { id: 2, url: "/", icon: campImg },
        { id: 3, url: "/", icon: alarmaImg },
    ];

    const opcionesMenu = [
        { id: 1, url: "/home", text: "HOME" },
    ];

    return (
        <>
        <header className={style.contenedor}>
            <nav className={style.navbar}>
                <div className={style.icons}>
                    {opcionesIconos.map(({ id, url, icon }) => (
                        <div key={id} className={style.contenedorImg}>
                            {id === 1 ? (
                                <img
                                    className={style.icon}
                                    src={icon}
                                    alt={`Icono ${id}`}
                                    onClick={toggleMenu}
                                />
                            ) : (
                                <a href={url}>
                                    <img className={style.icon} src={icon} alt={`Icono ${id}`} />
                                </a>
                            )}
                        </div>
                    ))}
                    {menuVisible && (
                        <div className={style.dropdownMenu}>
                            <ul>
                                <li>
                                    <a href="/configuracion">Configuración</a>
                                </li>
                                <li>
                                    <a href="/logout">Cerrar sesión</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className={style.centerText}>
                    <p>SDDA - EFA PROYECTO</p>
                </div>
                <div className={style.rightSection}>
                    <ul className={style.navLinks}>
                        {opcionesMenu.map(({ id, url, text }) => (
                            <li key={id} className={style.itemNav}>
                                <a
                                    href={url}
                                    className={activeLink ? style.activeLink : ''}
                                    onClick={handleLinkClick}
                                >
                                    {text}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className={style.logo}>
                        <img className={style.img} src={cremImg} alt="Creminox" />
                    </div>
                </div>
            </nav>
        </header>
        <ExeSubNav />
        </>
    );
};

export default ExeHeader;