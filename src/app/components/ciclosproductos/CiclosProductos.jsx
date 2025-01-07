"use client";

import style from './CiclosProductos.module.css';
import Grafico2 from '../grafico_realizados/grafico_realizados';

const CiclosProductos = () => {
    const datos = [
        { 
            nombre: 'Kilos',
            color: '#FFA500' 
        },
        {
            nombre: 'Torres',
            color: '#0000FF'
        }
    ];
    return (
        <>
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
                                    <p>{`${producto.nombre}`}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <h1>POR PERIODO</h1>
                </div>

                <div className={style.graf}>
                        <Grafico2 />
                </div>
            </div>
        </>
    );
};

export default CiclosProductos;
