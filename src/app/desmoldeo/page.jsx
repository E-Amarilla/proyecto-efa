import ProtectedRoute from '../utils/ProtectedRoute';

import NavDatos from '../components/navdatos/NavDatos.jsx';
import Productividad from '../components/productividad/Productividad.jsx';

import FiltroPeriodoGraficos from '../components/filtroperiodo/FiltroPeriodoGraficos.jsx'

import Layout from '../components/layout/Layout.jsx';

import style from "./Desmoldeo.module.css";

function Desmoldeo() {

    return (
        <ProtectedRoute>
        <div className={style.contenedor}>
            <NavDatos />

            <div className={style.secciones}>
                <section id="section1" className={style.seccion}>
                    <Layout />
                </section>

                <section id="section2" className={style.seccion}>
                    <Productividad />
                </section>

                <section id="section3" className={style.seccion}>
                    <FiltroPeriodoGraficos />
                </section>
            </div>
        </div>
        </ProtectedRoute>
    );
}

export default Desmoldeo;
