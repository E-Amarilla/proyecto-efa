"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import crem from './IMG/creminox.png';
import style from '../Login.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/send-recovery-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });      

      if (response.ok) {
        alert('Se ha enviado un correo de recuperación de contraseña.');
      } else {
        alert('Hubo un error al enviar el correo de recuperación.');
      }
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      alert('Hubo un error al enviar el correo de recuperación.');
    }
  };

  return (
    <form
      className={style.all}
      action='https://formspree.io/f/xoqzlyek'
      method='POST'
      onSubmit={handleSubmit}
      >
      <div className={style.contenedor}>
        <Image
          src={crem}
          alt='Creminox'
          priority={true}
          className={style.imagen}
        />
        <div className={style.formularioLogin}>
          <div className={style.inlab}>
            <label className={style.inputsTextos}>Email</label>
            <input
              className={style.inputs}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button className={style.botonIngresar} type="submit">Recuperar Contraseña</button>
        <div>
          <Link className={style.signup} href="../login">¿Recordó su contraseña? Inicie sesión aquí</Link>
        </div>
      </div>
    </form>
  );
}
