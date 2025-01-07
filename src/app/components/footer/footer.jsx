// components/footer/DefaultFooter.jsx
"use client";

import React from 'react';
import Image from "next/image";
import cremImg from './IMG/creminox-logo.png';
import webImg from './IMG/web.png';
import linkImg from './IMG/linkedin.png';
import ubiImg from './IMG/ubicacion.png';
import mailImg from './IMG/mail.png';
import fbImg from './IMG/facebook.png';
import style from './Footer.module.css';

const DefaultFooter = () => {
    const opcionesIzq = [
        {
            id: 1,
            icono: ubiImg,
            link: 'https://www.google.com/maps/place/Beron+de+Astrada+2745,+CABA,+Argentina',
            texto: 'Beron de Astrada 2745, CABA, Argentina'
        },
        {
            id: 2,
            icono: mailImg,
            link: 'mailto:sistemas@creminox.com',
            texto: 'sistemas@creminox.com'
        },
        {
            id: 3,
            icono: mailImg,
            link: 'mailto:ingenieria@creminox.com',
            texto: 'ingenieria@creminox.com'
        }
    ];

    const opcionesDer = [
        {
            id: 1,
            icono: webImg,
            link: 'https://creminox.com',
            texto: 'creminox.com'
        },
        {
            id: 2,
            icono: fbImg,
            link: 'https://facebook.com/creminox',
            texto: '/creminox'
        },
        {
            id: 3,
            icono: linkImg,
            link: 'https://ar.linkedin.com/company/creminox',
            texto: 'Creminox'
        }
    ];

    return (
        <footer className={style.footer}>
            <div className={style.contenedor}>
                <ul className={style.footerIzq}>
                    {opcionesIzq.map(({ id, icono, link, texto }) => (
                        <li key={id} className={style.item}>
                            <Image src={icono} alt={texto} className={style.icon} />
                            <a className={style.A} href={link} target="_blank" rel="noopener noreferrer">
                                {texto}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className={style.footerLogo}>
                    <a className={style.A} href="https://creminox.com" target="_blank" rel="noopener noreferrer">
                        <Image src={cremImg} alt="Creminox logo" className={style.logo} />
                    </a>
                </div>
                <ul className={style.footerDer}>
                    {opcionesDer.map(({ id, icono, link, texto }) => (
                        <li key={id} className={style.item}>
                            <a className={style.A} href={link} target="_blank" rel="noopener noreferrer">
                                {texto}
                            </a>
                            <Image src={icono} alt={texto} className={style.icon} />
                        </li>
                    ))}
                </ul>
            </div>
            <hr className={style.HR} />
            <div className={style.footerAbajo}>
                <p>© 2024 All Rights Reserved Cremona Inoxidable</p>
            </div>
        </footer>
    );
};

export default DefaultFooter;