"use client";

import Link from "next/link"
import Image from "next/image";
import cremImg from './IMG/creminox-logo.png';
import style from './Login.module.css';

function Login() {
    return (
        <>
            <body className={style.contenedor}>
                <div className={style.formularioLogin}>
                    <Image className={style.img} src={cremImg} alt="Creminox" />
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
                    <button className={style.botonIngresar}><a href="/completo">Ingresar</a></button>
                    <ul className={style.botonRecuperar}>
                        <li><a href="login/recuperarcontrasena">Recuperar contraseña</a></li>
                    </ul>
                </div>
            </body>
        </>
    );
};

export default Login;