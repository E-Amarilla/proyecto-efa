import NavDatos from '../components/navdatos/NavDatos.jsx';
import Productividad from '../components/productividad/Productividad.jsx';

import FiltroPeriodo from '../components/filtroperiodo/FiltroPeriodo.jsx';

import Grafico1 from '../components/grafico_realizados/grafico_realizados.jsx';
import Grafico2 from '../components/grafico_ciclos/grafico_ciclos.jsx';

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

                <section id="section3" className={style.seccion}>
                    <Grafico1 />
                    <div className={style.graph2}>
                        <FiltroPeriodo />
                        <Grafico2 />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Desmoldeo;
