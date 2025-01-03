import React from 'react';
import cremImg from '../IMG/logos/creminox-logo.png';
import webImg from '../IMG/icons/web.png';
import linkImg from '../IMG/icons/linkedin.png';
import ubiImg from '../IMG/icons/ubicacion.png';
import mailImg from '../IMG/icons/mail.png';
import fbImg from '../IMG/icons/facebook.png';

import style from './Footer.module.css';

const Footer = () => {
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
                
                {/* Sección izquierda */}
                <ul className={style.footerIzq}>
                    {opcionesIzq.map(({ id, icono, link, texto }) => (
                        <li key={id} className={style.item}>
                            <img src={icono} alt={texto} className={style.icon} />
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                {texto}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Logo central */}
                <div className={style.footerLogo}>
                    <a href="https://creminox.com" target="_blank" rel="noopener noreferrer">
                        <img src={cremImg} alt="Creminox logo" className={style.logo} />
                    </a>
                </div>

                {/* Sección derecha */}
                <ul className={style.footerDer}>
                    {opcionesDer.map(({ id, icono, link, texto }) => (
                        <li key={id} className={style.item}>
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                {texto}
                            </a>
                            <img src={icono} alt={texto} className={style.icon} />
                        </li>
                    ))}
                </ul>
            </div>
            <hr />
            <div className={style.footerAbajo}>
                <p>© 2024 All Rights Reserved Cremona Inoxidable</p>
            </div>
        </footer>
    );
};

export default Footer;