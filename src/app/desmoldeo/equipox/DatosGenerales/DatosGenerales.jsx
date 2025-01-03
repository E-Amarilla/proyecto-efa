//Imagenes
import receta1 from '../../IMG/icons/receta.png';
import receta2 from '../../IMG/icons/receta2.png';
import peso from '../../IMG/icons/peso.png';
import estado from '../../IMG/icons/estado.png';
import tiempo from '../../IMG/icons/tiempo.png';
import gripper from '../../IMG/icons/gripper.png';

//styles
import style from './DatosGenerales.module.css';


const DatosGenerales = () => {
    const datosGenerales = [
        {
            id: 1,
            texto: 'NOMBRE RECETA',
            dato: '0',
            icono: receta1,
        },
        {
            id: 2,
            texto: 'RECETA ACTUAL',
            dato: '0',
            icono: receta2,
        },
        {
            id: 3,
            texto: 'PROXIMA RECETA',
            dato: '0',
            icono: receta2,
        },
        {
            id: 4,
            texto: 'PESO TOTAL PRODUCTO',
            dato: '0',
            icono: peso,
        },
        {
            id: 5,
            texto: 'ESTADO',
            dato: '0',
            icono: estado,
        },
        {
            id: 6,
            texto: 'TIEMPO TRANSCURRIDO',
            dato: '00:00hs',
            icono: tiempo,
        }
    ];
    return (
        <>
            <div className={style.datosGen}>
                <div className={style.contenedorDatos}>
                    <h1 className={style.texto}>DATOS GENERALES</h1>
                    <ul className={style.lista}>
                        {datosGenerales.map(({ id, texto, dato, icono }) => (
                            <li key={id} className={style.datoList}>
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
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default DatosGenerales;