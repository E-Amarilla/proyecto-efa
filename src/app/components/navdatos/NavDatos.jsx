"use client";

import Image from "next/image";
import receta1 from '@/assets/img/RECETA.png';
import receta2 from '@/assets/img/RECETA2.png';
import torre from '@/assets/img/TORRE.png';
import nivelactual from '@/assets/img/NIVELACTUAL.png';
import molde from '@/assets/img/MOLDE.png';
import peso from '@/assets/img/PESO.png';
import tiempo from '@/assets/img/TIEMPO.png';
import gripper from "@/assets/img/GRIPPER.png";

import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { useTranslation } from "react-i18next";

const NavDatos = () => {
    const { data } = useContext(AuthContext);
    const { t } = useTranslation('trad');

    const {
        idRecetaActual,
        idRecetaProxima,
        CodigoProducto,
        TotalNiveles,
        TipoMolde,
        estadoMaquina,
        desmoldeoBanda,
        PesoProducto,
        TiempoTranscurrido,
        sdda_nivel_actual,
        NGripperActual,
        PesoActualDesmoldado,
        TorreActual
    } = data?.[0] || {};

    const opcionesAlarma = [
        { id: 1, nombre: t('mayus.layout') },
        { id: 2, nombre: t('mayus.productividad') },
        { id: 3, nombre: t('mayus.graficosHistoricos') },
    ];

    const datosTiempoReal = [
        { id: 1, nombre: t('min.recetaActual'), dato: CodigoProducto || '', icono: receta1 },
        { id: 2, nombre: t('min.nroMolde'), dato: TipoMolde || '', icono: receta2 },
        { id: 3, nombre: t('min.nroGripperActual'), dato: NGripperActual || '', icono: gripper },
        { id: 4, nombre: t('min.nroTorreActual'), dato: TorreActual || '', icono: torre },
        { id: 5, nombre: t('min.pesoFila'), dato: PesoProducto || '', icono: peso },
        { id: 6, nombre: t('min.pesoDesmoldado'), dato: estadoMaquina === 'CICLO INACTIVO' ? '0' : (PesoActualDesmoldado != null ? PesoActualDesmoldado : ''), icono: peso },
        { id: 7, nombre: t('min.torreNivelActual'), dato: (sdda_nivel_actual != null && TotalNiveles != null) ? `${sdda_nivel_actual}/${TotalNiveles}` : '', icono: nivelactual },
        { id: 8, nombre: t('min.tiempoTranscurrido'), dato: TiempoTranscurrido != null ? (TiempoTranscurrido === 0 ? '00:00 mm:ss' : TiempoTranscurrido) : '', icono: tiempo },
        { id: 9, nombre: t('min.idProxReceta'), dato: idRecetaProxima || '', icono: receta2 },
    ];

    const [activeSection, setActiveSection] = useState(1);
    const debounceTimeout = useRef(null);
    
    useEffect(() => {
        const handleScroll = () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
    
            debounceTimeout.current = setTimeout(() => {
                let closestSection = null;
                let closestDistance = Infinity;
    
                opcionesAlarma.forEach(({ id }) => {
                    const section = document.getElementById(`section${id}`);
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        const sectionTop = rect.top;
                        const sectionBottom = rect.bottom;
    
                        const offsetMargin = 200;
                        const distanceFromTop = Math.abs(sectionTop);
    
                        if (sectionTop < window.innerHeight + offsetMargin && sectionBottom >= 0 - offsetMargin) {
                            if (distanceFromTop < closestDistance) {
                                closestDistance = distanceFromTop;
                                closestSection = id;
                            }
                        }
                    }
                });
    
                if (closestSection) {
                    setActiveSection(closestSection);
                }
            }, 50);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(debounceTimeout.current);
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
        <div className="fixed top-[65px] left-0 w-[270px] bottom-0 bg-black pt-[50px] px-[20px] pb-[20px] z-[998] flex flex-col">
            <ul className="flex flex-col gap-2 p-0 m-0 list-none">
                {opcionesAlarma.map(({ id, nombre }) => (
                    <li
                        key={id}
                        className="m-0 gap-[10px]"
                    >
                        <Link
                            href={`#section${id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleScrollClick(id);
                            }}
                            className={`m-0 p-0 block py-[6px] text-center text-white no-underline rounded-[15px] text-base font-bold border border-[#555555] transition-colors ${
                                activeSection === id 
                                    ? 'bg-[#007bff] border-[#0056b3]' 
                                    : 'bg-[#1c1c1c] hover:bg-[#2b2b2b]'
                            }`}
                        >
                            {nombre}
                        </Link>
                    </li>
                ))}
            </ul>

            <hr className="w-[98%] flex mx-auto mt-[20px] mb-[10px] text-white"></hr>

            <div className="overflow-auto">
                <p className="m-0 mb-[10px] font-bold text-white block text-center">{t('mayus.datosGenerales')}</p>
                
                <ul className="list-none p-0 m-0 flex flex-col gap-2" lang="es">
                    {datosTiempoReal.map(({ id, nombre, dato, icono }) => (
                        <Link href='/desmoldeo/equipox' key={id} className="block">
                            <li className="flex items-start justify-between py-[10px] px-[15px] gap-2 border-2 border-[#555555] rounded-[15px] bg-[#1C1C1C] min-h-[55px] 
                                        max-w-[1432px]:flex max-w-[1432px]:items-start max-w-[1432px]:justify-between
                                        min-w-[1432px]:flex min-w-[1432px]:items-start min-w-[1432px]:justify-between">
                                <div className="w-[90%] flex flex-col no-underline text-white">
                                    <h3 className="w-full text-base p-0 m-0 font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{nombre}</h3>
                                    <h4 className="w-full text-sm p-0 m-0 overflow-hidden text-ellipsis whitespace-nowrap">
                                        {(nombre === 'Peso desmoldado:' || nombre === 'Peso por fila:') ? `${dato} kg` : dato}
                                    </h4>
                                </div>
                                <div className="w-[10%] flex items-start justify-center">
                                    <Image 
                                        src={icono} 
                                        alt={`Estado: ${id}`} 
                                        className="max-w-[25px] max-h-[25px] flex-shrink-0 mt-[3px]" 
                                    />
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NavDatos;