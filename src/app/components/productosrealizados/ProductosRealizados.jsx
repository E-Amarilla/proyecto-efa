"use client";

import Image from "next/image";
import style from './ProductosRealizados.module.css';
import grafico from "./IMG/grafico.png";

const ProductosRealizados = () => {
    const productos = [
        { 
            nombre: 'Jamón 3Lb',
            porcentaje: 15,
            color: '#FFA500' 
        },
        {
            nombre: 'Paleta 4Lb',
            porcentaje: 35,
            color: '#0000FF'
        },
        {
            nombre: 'Jamón Premium 4Lb',
            porcentaje: 20,
            color: '#FF0000'
        },
        {
            nombre: 'Mortadela 5Lb',
            porcentaje: 20,
            color: '#00FF00'
        },
        {
            nombre: 'Paleta Premium 4Lb',
            porcentaje: 10,
            color: '#54C42D'
        }
    ];

    return (
        <div className={style.prodReal}>
            <div className={style.contenedorPrinc}>
                <div className={style.tituloProductos}>
                    <h2 className={style.titulo}>PRODUCTOS REALIZADOS</h2>
                    {productos.map((producto, index) => (
                        <div key={index} className={style.itemLeyenda}>
                            <span
                                className={style.colorMuestra}
                                style={{ backgroundColor: producto.color }}
                            ></span>
                            <p>{`${producto.nombre}`}</p>
                        </div>
                    ))}
                </div>
                <h1>POR PERIODO</h1>
            </div>

            <div className={style.graf}>
                    <Image src={grafico} alt="grafico" />
            </div>
        </div>
    );
};

export default ProductosRealizados;
