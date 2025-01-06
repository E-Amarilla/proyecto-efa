import NavDatos from '../components/navdatos/NavDatos.jsx';
import Productividad from '../components/productividad/Productividad.jsx';
import Graficos from '../components/graficos/Graficos.jsx';
import Layout from '../components/layout/Layout.jsx';
import Footer from '../components/footer/footer.jsx';

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
                    <Graficos />
                </section>
            </div>
        </div>
    );
}

export default Desmoldeo;
