import style from './FiltroPeriodo.module.css';
import Botones from '../Botones/Exportar/Grandes/ExportarGrandes.jsx'

const FiltroPeriodo = () => {
    return (
        <>
            <div className={style.contenedor}>
                <h2 className={style.titulo}>FILTRO POR PERIODO</h2>
                <Botones />   
            </div> 
        </>
    );
};

export default FiltroPeriodo;
