"use client";

import React from "react";
import style from "./CiclosProductos.module.css";
import Graph from "../grafico_realizados/grafico_realizados";

const CiclosProductos = () => {
    const datos = [
    {
        nombre: "Producto A",
        color: "blue",
        data: [
        { x: "2023-01-01", y: 50 },
        { x: "2023-02-01", y: 80 },
        { x: "2023-03-01", y: 75 },
        { x: "2023-04-01", y: 100 },
        ],
    },
    {
        nombre: "Producto B",
        color: "orange",
        data: [
        { x: "2023-01-01", y: 60 },
        { x: "2023-02-01", y: 70 },
        { x: "2023-03-01", y: 95 },
        { x: "2023-04-01", y: 110 },
        ],
    },
];

return (
    <div className={style.prodReal}>
        <div className={style.contenedorPrinc}>
        <div className={style.tituloProductos}>
            <h2 className={style.titulo}>CICLOS POR PRODUCTO</h2>
            <div className={style.datosTitulo}>
            {datos.map((producto, index) => (
                <div key={index} className={style.itemLeyenda}>
                <span
                    className={style.colorMuestra}
                    style={{ backgroundColor: producto.color }}
                ></span>
                <p>{producto.nombre}</p>
                </div>
            ))}
            </div>
        </div>
        <h1>POR PERIODO</h1>
        </div>

        <div className={style.graf}>
        <Graph datos={datos} />
        </div>
    </div>
    );
};

export default CiclosProductos;
