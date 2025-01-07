//Imagenes
"use client";
import receta1 from './IMG/RECETA.png';
import receta2 from './IMG/RECETA2.png';
import peso from './IMG/PESO.png';
import estado from './IMG/ESTADO.png';
import tiempo from './IMG/TIEMPO.png';

//styles
import style from './DatosGenerales.module.css';
import textstyle from '../texto.module.css';


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
                <h1 className={textstyle.titulo}>DATOS GENERALES</h1>
                <ul className={style.lista}>
                    {datosGenerales.map(({ id, texto, dato, icono }) => (
                        <li key={id} className={style.datoList}>
                            <div className={style.detallesDatos} href='EquipoX'>
                                <div className={style.texto}>
                                    <h3 className={textstyle.subtitulo}>{texto}</h3>
                                    <h4 className={textstyle.h4}>{dato}</h4>
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
        </>
    );
};

export default DatosGenerales;