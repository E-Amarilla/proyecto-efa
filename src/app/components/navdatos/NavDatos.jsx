import React, { useState, useEffect } from 'react';
import Productividad from '../components/Productividad/Productividad.jsx';
import Graficos from '../components/Graficos/Graficos.jsx';
import Layout from '../components/Layout/Layout.jsx'
import Footer from '../Footer/Footer.jsx'
import style from './NavDatos.module.css';

const NavDatos = () => {
    const opcionesAlarma = [
        { id: 1, nombre: 'LAYOUT' },
        { id: 2, nombre: 'PRODUCTIVIDAD' },
        { id: 3, nombre: 'GRAFICOS HISTORICOS' },
    ];

    const datosTiempoReal = [
        { id: 1, nombre: 'Nombre receta', dato: '0' },
        { id: 2, nombre: 'Receta actual', dato: '0' },
        { id: 3, nombre: 'Proxima receta', dato: '0' },
        { id: 4, nombre: 'N° Gripper actual', dato: '0' },
        { id: 5, nombre: 'Peso total producto', dato: '0' },
        { id: 6, nombre: 'Torre nivel actual', dato: '0' },
        { id: 7, nombre: 'N° Torre actual', dato: '0' },
        { id: 8, nombre: 'Estado', dato: '0' },
        { id: 9, nombre: 'Tiempo transcurrido', dato: '0' },
    ];

    const [activeSection, setActiveSection] = useState(1); // Inicializamos con la primera sección activa

    useEffect(() => {
        const handleScroll = () => {
            opcionesAlarma.forEach(({ id }) => {
                const section = document.getElementById(`section${id}`);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                        setActiveSection(id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollClick = (id) => {
        const section = document.getElementById(`section${id}`);
        if (section) {
            const offset = -110;
            const elementPosition = section.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition + offset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
    
            setActiveSection(id);
        }
    };
    

    return (
        <>
        <div className={style.container}>
            <nav className={style.nav}>
                <ul className={style.navList}>
                    {opcionesAlarma.map(({ id, nombre }) => (
                        <li
                            key={id}
                            className={`${style.navItem} ${
                                activeSection === id ? style.active : ''
                            }`}
                        >
                            <a
                                href={`#section${id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleScrollClick(id);
                                }}
                                className={style.navLink}
                            >
                                {nombre}
                            </a>
                        </li>
                    ))}
                </ul>

                <hr></hr>

                    <div className={style.contenedorDatos}>
                    <p>DATOS GENERALES</p>
                        <ul className={style.datosTods}>
                            {datosTiempoReal.map(({ id, nombre, dato }) => (
                                <li key={id} className={style.datosIndv}>
                                    <a className={style.detallesDatos} href='EquipoX'>
                                        <h3>{nombre}</h3>
                                        <h4>{dato}</h4>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
            </nav>

            <div className={style.sections}>
                <section id="section1" className={style.section}>
                    <Layout />
                </section>
                <section id="section2" className={style.section}>
                    <Productividad />
                </section>
                <section id="section3" className={style.section}>
                    <Graficos />
                </section>
                <div className={style.Footer}>
                    <Footer />
                </div>
            </div>
        </div>
        </>
    );
};

export default NavDatos;