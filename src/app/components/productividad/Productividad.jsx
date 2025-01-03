import style from './Productividad_cont.module.css';
import FiltroPeriodo from '../FiltroPeriodo/FiltroPeriodo.jsx';
import Botones from '../Botones/Exportar/Grandes/ExportarGrandes.jsx'
import Productividad_cont from './Productividad_cont.jsx';

const Productividad = () => {
    return (
        <>
            <div className={style.seccion}>
                <div className={style.productividad}>
                    <Productividad_cont />
                </div>
                <div className={style.filtro}>
                    <FiltroPeriodo />
                    <div className={style.botonesContainer}>
                        <Botones />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Productividad;
