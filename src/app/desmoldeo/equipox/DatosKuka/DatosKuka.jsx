//styles
import style from './DatosKuka.module.css';

const DatosKuka = () => {
    const datosKuka = [
        {
            id: 1,
            texto: 'POSICION X',
            dato: '0mm',
        },
        {
            id: 2,
            texto: 'POSICION Y',
            dato: '0mm',
        },
        {
            id: 3,
            texto: 'POSICION Z',
            dato: '0mm',
        }
    ];
    return (
        <>
            <div className={style.datosGen}>
                <h1 className={style.titulo}>DATOS KUKA</h1>
                <div className={style.contenedorDatos}>
                    {datosKuka.map(({ id, texto, dato, icono }) => (
                        <div key={id} className={style.datoList}>
                            <div className={style.detallesDatos}>
                                <div className={style.texto}>
                                    <h3>{texto}</h3>
                                    <h4>{dato}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DatosKuka;
