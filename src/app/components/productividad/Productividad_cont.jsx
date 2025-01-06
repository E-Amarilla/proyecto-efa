import styleProdCont from './Productividad_cont.module.css';


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
        <div className={styleProdCont.productividad}>
            <h2 className={styleProdCont.titulo}>PRODUCTIVIDAD</h2>
            <div className={styleProdCont.metricaContainer}>
                {datos.map((dato, index) => (
                    <div key={index} className={styleProdCont.metrica}>
                        <div>
                            <p className={styleProdCont.valor}>{dato.valor}</p>
                            <p className={styleProdCont.descripcion}>{dato.titulo}</p>
                        </div>
                        <span className={styleProdCont.icono}>{dato.icono}</span>
                    </div>
                ))}
            </div>
            <hr className={styleProdCont.divisor}/>
            <div className={styleProdCont.barraContainer}>
                <h3>% Producto realizado</h3>
                <div className={styleProdCont.barra}>
                    {productos.map((producto, index) => (
                        <div
                            key={index}
                            className={styleProdCont.segmento}
                            styleProdCont={{
                                width: `${producto.porcentaje}%`,
                                backgroundColor: producto.color,
                            }}
                        />
                    ))}
                </div>
                <div className={styleProdCont.leyenda}>
                    {productos.map((producto, index) => (
                        <div key={index} className={styleProdCont.itemLeyenda}>
                            <span
                                className={styleProdCont.colorMuestra}
                                styleProdCont={{ backgroundColor: producto.color }}
                            ></span>
                            <p>{`${producto.nombre} - ${producto.porcentaje}%`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Productividad_cont;
