"use client";
import { useState } from "react";
import style from "./Login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Imagenes
import Image from "next/image";
import crem from "@/assets/img/creminox.png";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    try {
      sessionStorage.setItem('acceso', 'true');
      router.push('/completo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.all}>
      <div className={style.contenedor}>
        <Image
          src={crem}
          alt='Creminox'
          className={style.imagen}
        />
        <div className={style.formularioLogin}>
        <div className={style.inlab}>
            <label htmlFor="username" className={style.inputsTextos}>
              Username
            </label>
            <input
              type="text" 
              className={style.inputs}
            />
          </div>

          <div className={style.inlab}>
            <label className={style.inputsTextos}>
              Contraseña
            </label>
            <input
              type="password"
              className={style.inputs}
            />
          </div>
          <button 
            className={style.botonIngresar} 
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <div className={style.spinner}></div>
            ) : (
              "Acceder"
            )}
          </button>
        </div>
        
        <Link className={style.signup} href="/login/recuperacion">
            ¿Olvidó su contraseña? Recupérela aquí
        </Link>
      </div>
    </div>
  );
}

export default Login;