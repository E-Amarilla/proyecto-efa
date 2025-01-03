import CiclosProductos from '../CiclosProductos/CiclosProductos';
import CiclosRealizados from '../CiclosRealizados/CiclosRealizados';
import style from './Graficos.module.css';

const Graficos = () => {
    return (
        <div classname={style.contenedor}>
            <CiclosProductos />
            <CiclosRealizados />
        </div>
    );
};

export default Graficos;