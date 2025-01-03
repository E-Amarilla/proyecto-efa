import cremImg from '../../IMG/logos/creminox-logo.png';
import Header from '../../Header/Header';
import style from './RecuperarContra.module.css';

function Login() {
    return (
        <>
            <Header />
            <body className={style.contenedor}>
                    <div className={style.formularioRecuperar}>
                        <img className={style.img} src={cremImg} alt="Creminox" />
                        <div className={style.inputRecuperar}>
                            <p className={style.inputsTextos}>Ingrese su correo electronico</p>
                            <input
                                className={style.inputs} 
                                type="text"
                            />
                        </div>
                        <button className={style.botonRecuperar}>Enviar mail de recuperación</button>
                    </div>
            </body>
        </>
    );
};

export default Login;