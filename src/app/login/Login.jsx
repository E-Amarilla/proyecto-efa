import cremImg from '../IMG/logos/creminox-logo.png';
import style from './Login.module.css';

function Login() {
    return (
        <>
            <body className={style.contenedor}>
                <div className={style.formularioLogin}>
                    <img className={style.img} src={cremImg} alt="Creminox" />
                    <div className={style.inputUsuario}>
                        <p className={style.inputsTextos}>Usuario</p>
                        <input
                            className={style.inputs} 
                            type="text"
                        />
                    </div>
                    <div className={style.inputContraseña}>
                        <p className={style.inputsTextos}>Contraseña</p>
                        <input 
                            className={style.inputs}
                            type="password" 
                        />
                    </div>
                    <button className={style.botonIngresar}>Ingresar</button>
                    <ul className={style.botonRecuperar}>
                        <li><a href="#botonRecuperar">Recuperar contraseña</a></li>
                    </ul>
                </div>
            </body>
        </>
    );
};

export default Login;