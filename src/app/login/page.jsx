"use client";

import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import style from "./Login.module.css";
import Link from "next/link";

//Imagenes
import Image from "next/image";
import crem from "@/assets/img/creminox.png";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      login(username, password)
  };

  return (
    <div className={style.all}>
      <div className={style.contenedor}>
        <Image
          src={crem}
          alt='Creminox'
          className={style.imagen}
        />
        <form className={style.formularioLogin} onSubmit={handleSubmit}>
          <div className={style.inlab}>
            <label
              htmlFor="username"
              className={style.inputsTextos}
            >
              Username
            </label>
            
            <input
              type="text" 
              className={style.inputs} 
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} required
            />
          </div>

          <div className={style.inlab}>
            <label
              className={style.inputsTextos}
            >
              Contraseña
            </label>
            
            <input
              type="password"
              className={style.inputs} 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} required
            />
          </div>

          <button className={style.botonIngresar} type="submit">Login</button>
        </form>
        
        <div>
          <Link className={style.signup} href="/login/recuperacion">Olvidó su contraseña? Recuperela aquí</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;