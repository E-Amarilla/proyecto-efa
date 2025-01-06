"use client";

import React, { useState } from 'react';

import Image from "next/image"
import cremImg from './IMG/creminox.png';
import usuario from './IMG/usuario.png';
import confImg from './IMG/configuracion.png';
import alarmaImg from './IMG/alarma.png';
import MenuAlarmas from '../../components/dropdownalarmas/dropdown'; // Importa tu componente
import style from './Header.module.css'; 
import ExeSubNav from './SubNav/ExeSubNav.jsx';

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
        { id: 1, icon: usuario, onClick: toggleMenu }, // Este ícono activará el menú de usuario
        { id: 2, icon: alarmaImg, isDropdown: true }, // Este ícono activará el menú de alarmas
        { id: 3, url:"/configuraciones", icon: confImg },
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
                                <MenuAlarmas icon={icon} /> // Pasa el ícono a tu componente de dropdown
                            ) : (
                                <Image
                                    className={style.icon}
                                    src={icon}
                                    alt={`Icono ${id}`}
                                    onClick={onClick}
                                />
                            )}
                        </div>
                    ))}
                    {menuVisible && (
                        <div className={style.dropdownMenu}>
                            <ul>
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
