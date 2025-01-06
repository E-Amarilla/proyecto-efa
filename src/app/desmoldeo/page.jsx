import NavDatos from '../components/navdatos/NavDatos';
import Productividad from '../productividad/Productividad.jsx';
import Graficos from '../../components/graficos/Graficos.jsx';
import Layout from '../../components/layout/Layout.jsx'
import Footer from '../footer/footer.jsx'

import style from "./Desmoldeo.module.css";

function Desmoldeo() {
    return (
        <div className={style.contenedor}>
            <NavDatos/>
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

    );
}

export default Desmoldeo;
