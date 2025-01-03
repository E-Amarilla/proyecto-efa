import maqImg from '../IMG/otros/nsd42jps.bmp';
import style from './Encajonado.module.css';

const Encajonado = () => {
    return (
        <>
            <body className={style.contenedor}>
                <div className={style.contenedorImagen}>
                    <img className={style.img} src={maqImg} alt="Creminox" />
                </div>
                <h2>ENCAJONADO</h2>
                <div>
                    <div>
                        
                    </div>
                </div>
            </body>
        </>
    );
};

export default Encajonado;