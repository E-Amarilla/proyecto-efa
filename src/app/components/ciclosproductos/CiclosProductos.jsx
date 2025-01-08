"use client";

import React from "react";
import style from "./CiclosProductos.module.css";
import Grafico1 from "./grafico_realizados/grafico_realizados";

const CiclosProductos = () => {
    // Datos de ejemplo para los productos
    const productos = [
        {
            nombreProducto: "Ciclos",
            data: [
                { x: 1640995200, y: 10 },
                { x: 1641081600, y: 15 },
                { x: 1641168000, y: 20 }
            ],
            color: "orange", // Color para Ciclos
        },
        {
            nombreProducto: "Peso",
            data: [
                { x: 1640995200, y: 30 },
                { x: 1641081600, y: 25 },
                { x: 1641168000, y: 35 }
            ],
            color: "blue", // Color para Peso
        }
    ];

    return (
        <div className={style.prodReal}>
            <h1 className={style.titulo}>CICLOS POR PRODUCTO</h1>
            <h1 className={style.subtitulo}>POR PERIODO</h1>
            <div className={style.graf}>
                <Grafico1 products={productos} />
            </div>
        </div>
    );
};

export default CiclosProductos;
