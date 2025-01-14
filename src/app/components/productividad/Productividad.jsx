// Productividad.jsx
'use client';

import style from './Productividad.module.css';
import FiltroPeriodo from '../filtroperiodo/FiltroPeriodo.jsx';
import useWebSocket from '../../utils/useWebSocket.js';

const Productividad = () => {
    const pollId = "productividad_datos";
    const { data, error, isConnected } = useWebSocket(pollId);

    const {
        N_LoteProducto,
        Nombre_Prod,
        PesoTotal_Prod,
        Ciclos_Realiz,
        Prod_Total,
        Horas_Uso
    } = data || {};  // Si data es null, evita un error de desestructuración
    
    const Promedio_Horas = (Horas_Uso, Cant_Dias) => { return Horas_Uso / (Cant_Dias * 24); };

    const datos = [
        { id: 1, titulo: 'Ciclos realizados', dato: Ciclos_Realiz !== undefined && Ciclos_Realiz !== null ? Ciclos_Realiz : 'null' },
        { id: 2, titulo: 'Produccion total', dato: Prod_Total !== undefined && RecetaProximaDesmolde !== null ? Prod_Total : 'null' },
        { id: 3, titulo: 'Horas de uso diarias', dato: Promedio_Horas !== undefined && Promedio_Horas !== null ? Promedio_Horas : 'null' },
    ];

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
        <div className={style.all}>
        <div className={style.productividad}>
            <h2 className={style.titulo}>PRODUCTIVIDAD</h2>
            <div className={style.metricaContainer}>
                {datos.map((dato, index) => (
                    <div key={index} className={style.metrica}>
                        <div>
                            <p className={style.valor}>{dato.valor}</p>
                            <p className={style.descripcion}>{dato.titulo}</p>
                        </div>
                        <span className={style.icono}>{dato.icono}</span>
                    </div>
                ))}
            </div>
            <hr className={style.divisor}/>
            <div className={style.barraContainer}>
                <h3>% Producto realizado</h3>
                <div className={style.barra}>
                    {productos.map((producto, index) => (
                        <div
                            key={index}
                            className={style.segmento}
                            style={{
                                width: `${producto.porcentaje}%`,
                                backgroundColor: producto.color,
                            }}
                        />
                    ))}
                </div>
                <div className={style.leyenda}>
                    {productos.map((producto, index) => (
                        <div key={index} className={style.itemLeyenda}>
                            <span
                                className={style.colorMuestra}
                                style={{ backgroundColor: producto.color }}
                            ></span>
                            <p>{`${producto.nombre} - ${producto.porcentaje}%`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className={style.filtro}>
            <FiltroPeriodo />
        </div>
    </div>
    );
};

export default Productividad;

