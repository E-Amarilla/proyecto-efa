import style from './Productividad.module.css';


const Productividad_cont = () => {
    const datos = [
        {
            titulo: 'Ciclos totales realizados',
            valor: 15,
            icono: '♻️'
        },
        {
            titulo: 'Producción total',
            valor: '16,5 Tn',
            icono: '📦',
        },
        {
            titulo: 'Horas de uso / Horas posibles',
            valor: '12/48',
            icono: '⏰',
        }
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
        <div className={style.all} >
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
            
        </div>
    );
};

export default Productividad_cont;
