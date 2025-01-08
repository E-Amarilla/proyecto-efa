"use client";
import style from './ProductosRealizados.module.css';
import Grafico2 from "./grafico_ciclos/grafico_ciclos";

const productos = [
    {
        nombreProducto: "Jamon",
        nroLote: 1,
        nroTorre: 1,
        data: [
            { x: "2023-01-01", y: 50 },
            { x: "2023-02-01", y: 80 },
            { x: "2023-03-01", y: 75 },
            { x: "2023-04-01", y: 100 },
        ],
    },
    {
        nombreProducto: "Paleta",
        nroLote: 2,
        nroTorre: 2,
        data: [
            { x: "2023-01-01", y: 60 },
            { x: "2023-02-01", y: 85 },
            { x: "2023-03-01", y: 90 },
            { x: "2023-04-01", y: 120 },
        ],
    },
    {
        nombreProducto: "Morcilla",
        nroLote: 3,
        nroTorre: 1,
        data: [
            { x: "2023-01-01", y: 40 },
            { x: "2023-02-01", y: 70 },
            { x: "2023-03-01", y: 85 },
            { x: "2023-04-01", y: 95 },
        ],
    },
    {
        nombreProducto: "Chorizo",
        nroLote: 4,
        nroTorre: 3,
        data: [
            { x: "2023-01-01", y: 30 },
            { x: "2023-02-01", y: 50 },
            { x: "2023-03-01", y: 65 },
            { x: "2023-04-01", y: 70 },
        ],
    },
];

const ProductosRealizados = () => {
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
                            <p>{producto.nombreProducto}</p>
                        </div>
                    ))}

                </div>
                <h1>POR PERIODO</h1>
            </div>

            <div id={style.graf}>
                <Grafico2 products={productos} />
            </div>
        </div>
    );
};

export default ProductosRealizados;
