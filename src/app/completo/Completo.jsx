"use client";

// Importar imágenes
import Image from "next/image";
import luzR from './IMG/puntoRojo.png';
import luzV from './IMG/puntoVerde.png'; 
import LayoutCompleto from '../components/layoutCompleto/LayoutCompleto.jsx'

// Importar estilos
import style from './Completo.module.css';

const Completo = () => {
    // Opciones de alarma con estados
    const opcionesAlarma = [
        {
            id: 1,
            nombre: 'Alarma',
            descripcion: 'Parada de emergencia - "A" activada',
            estado: 'rojo'
        },
        {
            id: 2,
            nombre: 'Notificación',
            descripcion: 'Baliza de buzzer abierta',
            estado: 'verde'
        },
        {
            id: 3,
            nombre: 'Notificación',
            descripcion: 'Puerta principal "A" abierta',
            estado: 'verde'
        },
    ];

    return (
        <div className={style.body}>
            <div className={style.contenedor}>
                <div className={style.contenedorImagen}>
                    <LayoutCompleto />
                </div>
            </div>

            {/* Título */}
            <h2 className={style.titulo} >ÚLTIMAS ALERTAS</h2>

            {/* Lista de alertas */}
            <div className={style.contenedorAlertas}>
                <ul className={style.alertasTods}>
                    {opcionesAlarma.map(({ id, nombre, descripcion, estado }) => (
                        <li key={id} className={style.alertaIndv}>
                            <a className={style.detallesAlerta} href='#'>
                                {/* Selección de la imagen basada en el estado */}
                                <Image 
                                    src={estado === 'rojo' ? luzR : luzV} 
                                    alt={`Estado: ${estado}`} 
                                    className={style.icon} 
                                />
                                {nombre} - {descripcion}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
            
    );
};

export default Completo;
