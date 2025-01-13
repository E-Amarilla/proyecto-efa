"use client";
import style from './ProductosRealizados.module.css';
import Grafico2 from "./grafico_ciclos/grafico_ciclos";

const ProductosRealizados = () => {
    return (
        <div className={style.prodReal}>
            <h1 className={style.titulo}>PRODUCTOS REALIZADOS</h1>
            <h2 className={style.subtitulo}>POR PERIODO</h2>
            <div className={style.graf}>
                <Grafico2 />
            </div>
        </div>
    );
};

export default ProductosRealizados;
