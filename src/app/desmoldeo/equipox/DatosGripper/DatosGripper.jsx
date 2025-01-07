"use client";
import gripper from './IMG/GRIPPER.png';

//styles
import style from './DatosGripper.module.css';
import textstyle from '../texto.module.css';

const DatosGripper = () => {
    const datosGripper = [
        {
            id: 1,
            texto: 'COD. GRIPPER ACTUAL',
            dato: '0',
        },
        {
            id: 2,
            texto: 'COD. GRIPPER PROXIMO',
            dato: '0',
        },
        {
            id: 3,
            texto: 'GRIPPERS DISPONIBLES',
            dato: '0',
        }
    ];
    return (
        <>
            <div className={style.datosGen}>
                <h1 className={textstyle.titulo}>DATOS GRIPPER</h1>
                <div className={style.contenedorDatos}>
                    {datosGripper.map(({ id, texto, dato }) => (
                        <div key={id} className={style.datoList}>
                            <div className={style.detallesDatos}>
                                <div className={style.texto}>
                                    <h3 className={textstyle.subtitulo}>{texto}</h3>
                                    <h4 className={textstyle.h4}>{dato}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DatosGripper;