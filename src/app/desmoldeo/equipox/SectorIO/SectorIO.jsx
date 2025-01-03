import puntoGris from '../../IMG/semaforo/puntoGris.png';

//styles
import style from './SectorIO.module.css';

const SectorIO = () => {
    const SectorIO = [
        {
            id: 1,
            texto: 'ESTADO',
            dato: '0',
            icono: puntoGris,
        },
        {
            id: 2,
            texto: 'IO_YY EQ XX',
            dato: '0',
            icono: puntoGris,
        },
        {
            id: 3,
            texto: 'ID EQUIPO',
            dato: '0',
            icono: puntoGris,
        },
        {
            id: 4,
            texto: 'NOMBRE',
            dato: '0',
            icono: puntoGris,
        }
    ];
    return (
        <div className={style.datoListContainer}>
            <h1 className={style.texto}>SECTOR IO</h1>
            <div className={style.datosGen}>
                {SectorIO.map(({ id, texto, dato, icono }) => (
                    <div key={id} className={style.datoList}>
                        <div className={style.detallesDatos} href='EquipoX'>
                            <div className={style.texto}>
                                <h3>{texto}</h3>
                                <h4>{dato}</h4>
                            </div>
                            <img 
                                src={icono} 
                                alt={`Estado: ${id}`} 
                                className={style.icon} 
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectorIO;
