import React from 'react';
import style from './ExportarGrandes.module.css';

const ExportarGrandes = () => {
    const botones = [
        {
            id: 1,
            text: 'Descargar PDF',
            color: 'rgba(243, 18, 96, 0.8)',
            icon: '📄',
        },
        {
            id: 2,
            text: 'Descargar Excel',
            color: 'rgba(17, 171, 90, 0.8)',
            icon: '📊',
        }
    ];

    return (
        <div className={style.container}>
            {botones.map((boton) => (
                <button
                    key={boton.id}
                    className={style.boton}
                    style={{ backgroundColor: boton.color }}
                >
                    <span className={style.icon}>{boton.icon}</span>
                    <span>{boton.text}</span>
                </button>
            ))}
        </div>
    );
};

export default ExportarGrandes;
