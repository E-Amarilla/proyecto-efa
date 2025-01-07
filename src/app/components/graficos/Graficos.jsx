import CiclosProductos from '../CiclosProductos/CiclosProductos';
import CiclosRealizados from '../ciclosrealizados/CiclosRealizados';
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