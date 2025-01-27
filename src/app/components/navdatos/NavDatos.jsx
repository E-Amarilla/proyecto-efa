"use client";

import { Card, Skeleton } from "@nextui-org/react";
import useWebSocket from '../../utils/useWebSocket';
import React, { useState, useEffect, useRef } from 'react';
import style from './NavDatos.module.css';
import Link from "next/link";

const NavDatos = () => {
    const pollId = "resumen-desmoldeo";
    const { data, error, isConnected } = useWebSocket(pollId);

    const opcionesAlarma = [
        { id: 1, nombre: 'LAYOUT' },
        { id: 2, nombre: 'PRODUCTIVIDAD' },
        { id: 3, nombre: 'GRAFICOS HISTORICOS' },
    ];

    const {
        Nombre,
        RecetaProximaDesmolde,
        NroGriper,
        PesoProducto,
        NivelActual,
        TotalNiveles,
        torreActual,
        PesoActual,
        TipoMolde,
        TiempoTranscurrido
    } = data || {};

    const datosTiempoReal = [
        { id: 1, nombre: 'Nombre receta', dato: Nombre !== undefined && Nombre !== null ? Nombre : 'null' },
        { id: 2, nombre: 'Proxima receta', dato: RecetaProximaDesmolde !== undefined && RecetaProximaDesmolde !== null ? RecetaProximaDesmolde : 'null' },
        { id: 3, nombre: 'N° Gripper actual', dato: NroGriper !== undefined && NroGriper !== null ? NroGriper : 'null' },
        { id: 4, nombre: 'Peso producto', dato: PesoProducto !== undefined && PesoProducto !== null ? PesoProducto : 'null' },
        { id: 5, nombre: 'Peso total producto', dato: PesoActual !== undefined && PesoActual !== null ? PesoActual : 'null' },
        { id: 6, nombre: 'N° Torre actual', dato: torreActual !== undefined && torreActual !== null ? torreActual : 'null' },
        { id: 7, nombre: 'Torre nivel actual', dato: (NivelActual !== undefined && NivelActual !== null ? NivelActual : 'null') + "/" + (TotalNiveles !== undefined && TotalNiveles !== null ? TotalNiveles : 'null') },
        { id: 8, nombre: 'N° Molde', dato: TipoMolde !== undefined && TipoMolde !== null ? TipoMolde : 'null' },
        { id: 9, nombre: 'Tiempo transcurrido', dato: TiempoTranscurrido !== undefined && TiempoTranscurrido !== null ? TiempoTranscurrido : 'null' },
    ];

    const [activeSection, setActiveSection] = useState(1);
    const sectionsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id').replace('section', '');
                        setActiveSection(Number(id));
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5, // Ajusta este valor según sea necesario
            }
        );

        // Observar las secciones
        sectionsRef.current.forEach(section => {
            if (section) observer.observe(section);
        });

        return () => {
            sectionsRef.current.forEach(section => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    const handleScrollClick = (id) => {
        const section = document.getElementById(`section${id}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
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
                            <Link
                                href={`#section${id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleScrollClick(id);
                                }}
                                className={style.navLink}
                            >
                                {nombre}
                            </Link>
                        </li>
                    ))}
                </ul>

                <hr className={style.linea}></hr>

                <div className={style.contenedorDatos}>
                    <p className={style.datosGen}>DATOS GENERALES</p>
                    <ul className={style.datosTods}>
                        {datosTiempoReal.map(({ id, nombre, dato }) => (
                            <li key={id} className={style.datosIndv}>
                                <Link className={style.detallesDatos} href='/desmoldeo/equipox'>
                                    <h3 className={style.h3}>{nombre}</h3>
                                    <h4 className={style.h4}>{dato}</h4>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default NavDatos;