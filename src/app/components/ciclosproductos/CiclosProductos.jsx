"use client";

import React, { useEffect, useState } from "react";
import style from "./CiclosProductos.module.css";
import Grafico1 from "./grafico_realizados/grafico_realizados";

const CiclosProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/data/cycles.json");
                const data = await response.json();

                const formattedProducts = data.map((recetario) => ({
                    nombreProducto: `Recetario ${recetario.id_recetario}`,
                    data: recetario.ciclos.map((ciclo) => ({
                        x: Math.floor(new Date(ciclo.fecha_fin).getTime() / 1000),
                        y: ciclo.pesoTotal,
                    })),
                    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Color aleatorio
                }));

                setProductos(formattedProducts);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        fetchData();
    }, []);

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
