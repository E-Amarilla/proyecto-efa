"use client";

import style from './CiclosRealizados.module.css';
import FiltroPeriodo from '../filtroperiodo/FiltroPeriodo.jsx';
import Botones from '../botones/Exportar/Grandes/ExportarGrandes.jsx';
import ProductosRealizados from '../productosrealizados/ProductosRealizados.jsx';

const CiclosRealizados = () => {
    return (
        <>
            <div className={style.seccion}>
                <div className={style.filtro}>
                    <FiltroPeriodo />
                    <div className={style.botonesContainer}>
                        <Botones />
                    </div>
                </div>
                <div className={style.productividad}>
                    <ProductosRealizados />
                </div>
            </div>
        </>
    );
};

export default CiclosRealizados;
