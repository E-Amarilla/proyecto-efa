import NavDatos from '../components/navdatos/NavDatos.jsx';
import Productividad from '../components/productividad/Productividad.jsx';

import CiclosProductos from '../components/ciclosproductos/CiclosProductos';
import CiclosRealizados from '../components/ciclosrealizados/CiclosRealizados';

import Layout from '../components/layout/Layout.jsx';

import style from "./Desmoldeo.module.css";

function Desmoldeo() {
    return (
        <div className={style.contenedor}>
            <NavDatos />

            <div className={style.secciones}>
                <section id="section1" className={style.seccion}>
                    <Layout />
                </section>
                <section id="section2" className={style.seccion}>
                    <Productividad />
                </section>
            </div>
        </div>
    );
}

export default Desmoldeo;
