"use client";

import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import style from "./Login.module.css";
import Link from "next/link";

// Imagenes
import Image from "next/image";
import crem from "@/assets/img/creminox.png";

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Estado para el mensaje de error
  const [loading, setLoading] = useState(false); // Estado para el spinner

  useEffect(() => {
    // Recuperar el username desde sessionStorage al montar el componente
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activar el spinner
    setMessage(''); // Limpiar mensajes de error anteriores

    try {
      await login(username, password);
      // Guardar el username en sessionStorage al iniciar sesión exitosamente
      sessionStorage.setItem('username', username);
      setMessage(''); // Limpiar el mensaje si el login es exitoso
    } catch (error) {
      if (error.message === "Credenciales inválidas") {
        setMessage('Credenciales inválidas'); // Mostrar mensaje de error de credenciales
      } else {
        setMessage('Ha ocurrido un error. Por favor, inténtalo de nuevo.'); // Mensaje genérico para otros errores
      }
    } finally {
      setLoading(false); // Desactivar el spinner
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
        <form className={style.formularioLogin} onSubmit={handleSubmit}>
          <div className={style.inlab}>
            <label htmlFor="username" className={style.inputsTextos}>
              Username
            </label>
            <input
              type="text" 
              className={style.inputs} 
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={style.inlab}>
            <label className={style.inputsTextos}>
              Contraseña
            </label>
            <input
              type="password"
              className={style.inputs} 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Contenedor fijo para el mensaje de error */}
          <div className={style.errorContainer}>
            {message && <div className={style.errorMessage}>{message}</div>}
          </div>

          {/* Botón con spinner */}
          <button className={style.botonIngresar} type="submit" disabled={loading}>
            {loading ? (
              <div className={style.spinner}></div> // Spinner
            ) : (
              "Login" // Texto normal del botón
            )}
          </button>
        </form>
        
        <div>
          <Link className={style.signup} href="/login/recuperacion">
            ¿Olvidó su contraseña? Recupérela aquí
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
