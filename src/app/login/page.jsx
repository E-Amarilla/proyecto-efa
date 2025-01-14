"use client";
import { useState } from 'react';
import { users } from '../users';

import Link from 'next/link';
import style from './Login.module.css';

//Imagenes
import Image from "next/image";
import crem from "@/assets/img/creminox.png";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      document.cookie = `auth=${JSON.stringify({ id: user.id, username: user.username })}; path=/`;
      window.location.href = '/home';  // Use window.location.href for navigation
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <form className={style.all} onSubmit={handleSubmit}>
      <div className={style.contenedor}>
        <Image
          src={crem}
          alt='Creminox'
          className={style.imagen}
        />
        <div className={style.formularioLogin}>
          <div className={style.inlab}>
            <label className={style.inputsTextos}>Usuario</label>
            <input 
              className={style.inputs} 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div className={style.inlab}>
            <label className={style.inputsTextos}>Contraseña</label>
            <input
              className={style.inputs} 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
        </div>
        <button className={style.botonIngresar} type="submit">Login</button>
        <div>
          <Link className={style.signup} href="/login/recuperacion">Olvidó su contraseña? Recuperela aquí</Link>
        </div>
      </div>
    </form>
  );
}