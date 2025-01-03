//styles
import style from './DatosTorre.module.css';

const DatosTorre = () => {
    const datosTorre = [
        {
            id: 1,
            texto: 'N° TORRE ACTUAL',
            dato: '0',
        },
        {
            id: 2,
            texto: 'TORRE NIVEL ACTUAL',
            dato: '0/11',
        },
        {
            id: 3,
            texto: 'TAG ACTUAL',
            dato: '0',
        },
        {
            id: 4,
            texto: 'N° TORRE PROXIMA',
            dato: '0',
        },
        {
            id: 5,
            texto: 'TIPO FIN',
            dato: '0',
        },
        {
            id: 6,
            texto: 'DESMOLDEO BANDA',
            dato: '0',
        }
    ];
    return (
        <>
            <div className={style.datosGen}>
                <h1 className={style.titulo}>DATOS TORRE</h1>
                <div className={style.contenedorDatos}>
                    {datosTorre.map(({ id, texto, dato, icono }) => (
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

export default DatosTorre;
