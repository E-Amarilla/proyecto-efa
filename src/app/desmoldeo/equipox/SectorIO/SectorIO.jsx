"use client";
import puntoGris from './IMG/puntoGris.png';
import puntoVerde from './IMG/puntoVerde.png'; // Asumimos que tienes un icono para true
import useWebSocket from '@/app/utils/useWebSocket';
import Image from "next/image";
//styles
import style from './SectorIO.module.css';
import textstyle from '../texto.module.css';
import React, { useState, useEffect } from 'react';

const SectorIOComponent = () => {
    const initialSectorIO = [
        { id: 1, texto: 'ESTADO', dato: '0', icono: puntoGris, },
        { id: 2, texto: 'IO_YY EQ XX', dato: '0', icono: puntoGris, },
        { id: 3, texto: 'ID EQUIPO', dato: '0', icono: puntoGris, },
        { id: 4, texto: 'NOMBRE', dato: '0', icono: puntoGris, }
    ];

    const [sectorIO, setSectorIO] = useState(initialSectorIO);

    const pollId = "lista-tiempo-real";
    const { data, error, isConnected } = useWebSocket(pollId);
    
    useEffect(() => {
        if (data && data.sectorIO) {
            const updatedSectorIO = sectorIO.map((item, index) => ({
                ...item,
                dato: data.sectorIO[index] !== undefined && data.sectorIO[index] !== null ? data.sectorIO[index] : '0',
                icono: data.sectorIO[index] ? puntoVerde : puntoGris // Asumimos puntoVerde para true y puntoGris para false
            }));
            setSectorIO(updatedSectorIO);
        }
    }, [data]);

    return (
        <div className={style.datoListContainer}>
            <h1 className={textstyle.titulo}>SECTOR IO</h1>
            <div className={style.datosGen}>
                {sectorIO.map(({ id, texto, dato, icono }) => (
                    <div key={id} className={style.datoList}>
                        <div className={style.detallesDatos} href='EquipoX'>
                            <div className={style.texto}>
                                <h3 className={textstyle.subtitulo}>{texto}</h3>
                            </div>
                            <Image 
                                src={icono} 
                                alt={`Estado: ${id}`} 
                                className={style.icon} 
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectorIOComponent;
