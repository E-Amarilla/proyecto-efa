//styles
import style from './DatosSDDA.module.css';

const DatosSDDA = () => {
    const datosSDDA = [
        {
            id: 1,
            texto: 'SDDA_LONG_MM',
            dato: '0',
        },
        {
            id: 2,
            texto: 'SDDA_VERTICAL_MM',
            dato: '0',
        },
        {
            id: 3,
            texto: 'SDDA NIVEL ACTUAL',
            dato: '0/11',
        }
    ];
    return (
        <>
            <div className={style.datosGen}>
                <h1 className={style.titulo}>DATOS SDDA</h1>
                <div className={style.contenedorDatos}>
                    {datosSDDA.map(({ id, texto, dato, icono }) => (
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

export default DatosSDDA;