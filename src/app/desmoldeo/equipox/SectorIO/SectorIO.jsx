"use client";

import useWebSocket from '@/app/utils/useWebSocket';

// Styles
import style from './SectorIO.module.css';
import textstyle from '../texto.module.css';
import React, { useState, useEffect } from 'react';

// Imágenes
import Image from "next/image";
import puntoGris from '@/assets/img/puntoGris.png';
import puntoVerde from '@/assets/img/puntoVerde.png';
import puntoA from '@/assets/img/puntoA.png';
import puntoB from '@/assets/img/puntoB.png';

const SectorIOComponent = () => {
    const initialSectorIO = [
        { id: 1, texto: 'ESTADO DEL CICLO', dato: '0', icono: puntoGris },
        { id: 2, texto: 'BANDA DE DESMOLDEO', dato: '0', icono: puntoGris },
    ];

    const [sectorIO, setSectorIO] = useState(initialSectorIO);

    const pollId = "lista-tiempo-real";
    const { data, error, isConnected } = useWebSocket(pollId);

    useEffect(() => {
        if (data && data.sectorIO) {
            const updatedSectorIO = sectorIO.map((item, index) => {
                const dato = data.sectorIO[index];
                
                let icono = puntoGris; // Default icon
                if (dato === true) {
                    icono = puntoVerde;
                } else if (dato === 'A') {
                    icono = puntoA;
                } else if (dato === 'B') {
                    icono = puntoB;
                }

                return {
                    ...item,
                    dato: dato !== undefined && dato !== null ? dato : '0',
                    icono: icono
                };
            });
            setSectorIO(updatedSectorIO);
        }
    }, [data]);

    return (
        <div className={style.datoListContainer}>
            <h1 className={textstyle.titulo}>SECTOR IO</h1>
            <div className={style.datosGen}>
                {sectorIO.map(({ id, texto, dato, icono }) => (
                    <div key={id} className={style.datoList}>
                        <div className={style.detallesDatos}>
                            <div className={style.texto}>
                                <h3 className={style.subtitulo}>{texto}</h3>
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
