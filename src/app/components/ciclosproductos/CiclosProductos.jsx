"use client";

import React from "react";
import style from "./CiclosProductos.module.css";
import Graph from "../grafico_realizados/grafico_realizados";

const CiclosProductos = () => {
    return (
        <div className={style.prodReal}>
            <h2 className={style.titulo}>CICLOS POR PRODUCTO</h2>
            <h1>POR PERIODO</h1>
            <div className={style.graf}>
                <Graph />
            </div>
        </div>
        );
    };

export default CiclosProductos;
