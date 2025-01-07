"use client";

import Image from "next/image";
import cremImg from './IMG/creminox-logo.png';
import style from './RecuperarContra.module.css';

function Login() {
    return (
        <>
            <body className={style.contenedor}>
                    <div className={style.formularioRecuperar}>
                        <Image className={style.img} src={cremImg} alt="Creminox" />
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