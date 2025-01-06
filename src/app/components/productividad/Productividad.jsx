import styleProd from './Productividad.module.css';
import FiltroPeriodo from '../FiltroPeriodo/FiltroPeriodo.jsx';
import Productividad_cont from './Productividad_cont.jsx';

const Productividad = () => {
    return (
        <>
            <div className={styleProd.seccion}>
                <div className={styleProd.productividad}>
                    <Productividad_cont />
                </div>
                <div className={styleProd.filtro}>
                    <FiltroPeriodo />
                </div>
            </div>
        </>
    );
};

export default Productividad;
