// components/footer/DefaultFooter.jsx
"use client";

import React from 'react';
import style from './Footer.module.css';

//Imagenes
import Image from "next/image"
import cremImg from '@/assets/img/creminox-logo.png';
import linkImg from '@/assets/img/linkedin.png';
import ubiImg from '@/assets/img/ubicacion.png';
import mailImg from '@/assets/img/mail.png';
import fbImg from '@/assets/img/facebook.png';

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
            link: 'mailto:soporte@creminox.com',
            texto: 'soporte@creminox.com'
        }
    ];

    const opcionesDer = [
        {
            id: 3,
            icono: fbImg,
            link: 'https://facebook.com/creminox',
            texto: '/creminox'
        },
        {
            id: 4,
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