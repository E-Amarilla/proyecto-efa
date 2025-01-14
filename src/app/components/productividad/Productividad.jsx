// Productividad.jsx
'use server';

import style from './Productividad.module.css';
import FiltroPeriodo from '../filtroperiodo/FiltroPeriodo.jsx';

const fetchData = async (fechaInicio, fechaFin) => {
    try {
        const response = await fetch(`http://192.168.0.169:8000/productividadresumen?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

const Productividad = async () => {
    const fechaInicio = '2025-01-15';
    const fechaFin = '2025-07-10';

    let data;
    try {
        data = await fetchData(fechaInicio, fechaFin);
    } catch (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const Cant_Dias = 7; // Supongamos que la cantidad de días es 7 para el cálculo del promedio de horas

    const CantidadCiclosFinalizados = data.CantidadCiclosFinalizados !== undefined ? data.CantidadCiclosFinalizados : 'null';
    const PesoTotal = data.PesoTotal !== undefined ? data.PesoTotal : 'null';
    const Horas_Uso = data.ProductosRealizados && Array.isArray(data.ProductosRealizados) ? data.ProductosRealizados.reduce((acc, prod) => acc + prod.tiempoTotal, 0) : 'null';

    const Promedio_Horas = (Horas_Uso, Cant_Dias) => Horas_Uso !== 'null' ? (Horas_Uso / (Cant_Dias * 24)).toFixed(2) : 'null';

    const datos = [
        { id: 1, titulo: 'Ciclos realizados', dato: CantidadCiclosFinalizados },
        { id: 2, titulo: 'Producción total', dato: PesoTotal },
        { id: 3, titulo: 'Horas de uso diarias', dato: Promedio_Horas(Horas_Uso, Cant_Dias) },
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
                            <p className={style.descripcion}>{dato.titulo}</p>
                            <p className={style.valor}>{dato.dato}</p>
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
