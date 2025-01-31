"use client";

import AuthContext from "../../../context/AuthContext";

// Styles
import style from './SectorIO.module.css';
import textstyle from '../texto.module.css';
import React, { useState, useEffect, useContext  } from 'react';

// Imágenes
import Image from "next/image";
import puntoGris from '@/assets/img/puntoGris.png';
import puntoVerde from '@/assets/img/puntoVerde.png';
import puntoA from '@/assets/img/puntoA.png';
import puntoB from '@/assets/img/puntoB.png';

const SectorIOComponent = () => {
    const initialSectorIO = [
        { id: 1, texto: 'ESTADO DEL CICLO', dato: 0, icono: puntoGris },
        { id: 2, texto: 'BANDA DE DESMOLDEO', dato: 0, icono: puntoGris },
    ];

    const [sectorIO, setSectorIO] = useState(initialSectorIO);

    const { data } = useContext(AuthContext); // Obtiene datos del contexto

    useEffect(() => {
        if (data && data?.general?.sectorIO) {
            const updatedSectorIO = sectorIO.map((item, index) => {
                // Asignamos los datos recibidos
                let dato = data?.general?.sectorIO[index] !== undefined ? data?.general?.sectorIO[index] : 0;
                let icono = puntoGris; // Default icon

                // Comprobamos el índice y asignamos el icono adecuado
                if (index === 0) {
                    // Lógica para el índice 0 (Estado del ciclo)
                    if (dato === 0 || dato === null) {
                        icono = puntoGris;
                    } else if (dato === 1) {
                        icono = puntoVerde;
                    }
                } else if (index === 1) {
                    // Lógica para el índice 1 (Banda de desmoldeo)
                    if (dato === 1) {
                        icono = puntoA;
                    } else if (dato === 2) {
                        icono = puntoB;
                    }
                }

                return {
                    ...item,
                    dato: dato,
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
