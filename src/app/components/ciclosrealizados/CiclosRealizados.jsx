"use client";

import style from './CiclosRealizados.module.css';
import FiltroPeriodo from '../filtroperiodo/FiltroPeriodo.jsx';
import ProductosRealizados from '../productosrealizados/ProductosRealizados.jsx';

export default function CiclosRealizados() {
    return (
        <>
            <div className={style.seccion}>
                <div className={style.filtro}>
                    <FiltroPeriodo />
                </div>
                <div className={style.productividad}>
                    <ProductosRealizados />
                </div>
            </div>
        </>
    );
};
