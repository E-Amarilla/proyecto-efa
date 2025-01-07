"use client";

import useWebSocket from '../../utils/useWebSocket';
import React, { useState, useEffect } from 'react';
import style from './NavDatos.module.css';

const NavDatos = () => {
    const pollId = "resumen-desmoldeo";
    const { data, error, isConnected } = useWebSocket(pollId);

    const opcionesAlarma = [
        { id: 1, nombre: 'LAYOUT' },
        { id: 2, nombre: 'PRODUCTIVIDAD' },
        { id: 3, nombre: 'GRAFICOS HISTORICOS' },
    ];

    // Desestructurar los datos recibidos
    const {
        NombreReceta,
        RecetaActual,
        ProximaReceta,
        NroGriper,
        PesoTotalProducto,
        PesoNivelTorreProd,
        TorreNivelActual,
        Estado,
        TiempoTranscurrido
    } = data || {};  // Si data es null, evita un error de desestructuración

    const datosTiempoReal = [
        { id: 1, nombre: 'Nombre receta', dato: NombreReceta !== undefined && NombreReceta !== null ? NombreReceta : 'null' },
        { id: 2, nombre: 'Receta actual', dato: RecetaActual !== undefined && RecetaActual !== null ? RecetaActual : 'null' },
        { id: 3, nombre: 'Proxima receta', dato: ProximaReceta !== undefined && ProximaReceta !== null ? ProximaReceta : 'null' },
        { id: 4, nombre: 'N° Gripper actual', dato: NroGriper !== undefined && NroGriper !== null ? NroGriper : 'null' },
        { id: 5, nombre: 'Peso total producto', dato: PesoTotalProducto !== undefined && PesoTotalProducto !== null ? PesoTotalProducto : 'null' },
        { id: 6, nombre: 'Torre nivel actual', dato: PesoNivelTorreProd !== undefined && PesoNivelTorreProd !== null ? PesoNivelTorreProd : 'null' },
        { id: 7, nombre: 'N° Torre actual', dato: TorreNivelActual !== undefined && TorreNivelActual !== null ? TorreNivelActual : 'null' },
        { id: 8, nombre: 'Estado', dato: Estado !== undefined && Estado !== null ? Estado : 'null' },
        { id: 9, nombre: 'Tiempo transcurrido', dato: TiempoTranscurrido !== undefined && TiempoTranscurrido !== null ? TiempoTranscurrido : 'null' },
    ];       

    const [activeSection, setActiveSection] = useState(1); // Inicializamos con la primera sección activa

    useEffect(() => {
        const handleScroll = () => {
            opcionesAlarma.forEach(({ id }) => {
                const section = document.getElementById(`section${id}`);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                        setActiveSection(id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollClick = (id) => {
        const section = document.getElementById(`section${id}`);
        if (section) {
            const offset = -133;
            const elementPosition = section.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition + offset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
    
            setActiveSection(id);
        }
    };

    return (
        <>
            <div className={style.nav}>
                <ul className={style.navList}>
                    {opcionesAlarma.map(({ id, nombre }) => (
                        <li
                            key={id}
                            className={`${style.navItem} ${
                                activeSection === id ? style.active : ''
                            }`}
                        >
                            <a
                                href={`#section${id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleScrollClick(id);
                                }}
                                className={style.navLink}
                            >
                                {nombre}
                            </a>
                        </li>
                    ))}
                </ul>

                <hr className={style.linea}></hr>
                
                <div className={style.contenedorDatos}>
                    <p className={style.datosGen}>DATOS GENERALES</p>
                    <ul className={style.datosTods}>
                        {datosTiempoReal.map(({ id, nombre, dato }) => (
                            <li key={id} className={style.datosIndv}>
                                <a className={style.detallesDatos} href='/desmoldeo/equipox'>
                                    <h3 className={style.h3}>{nombre}</h3>
                                    <h4 className={style.h4}>{dato}</h4>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default NavDatos;