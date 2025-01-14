"use client";
import { useState } from "react";
import Link from "next/link";

import style from "../Login.module.css";

//Imagenes
import Image from "next/image";
import crem from "@/assets/img/creminox.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Correo enviado con éxito.");
      } else {
        setMessage(data.error || "Hubo un error al enviar el correo.");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <form className={style.all} onSubmit={handleSubmit}>
      <div className={style.contenedor}>
        <Image src={crem} alt="Creminox" priority={true} className={style.imagen} />
        <div className={style.formularioLogin}>
          <div className={style.inlab}>
            <label className={style.inputsTextos}>Email</label>
            <input
              className={style.inputs}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <button className={style.botonIngresar} type="submit">
          Recuperar Contraseña
        </button>
        <div>{message && <p>{message}</p>}</div>
        <div>
          <Link className={style.signup} href="../login">
            ¿Recordó su contraseña? Inicie sesión aquí
          </Link>
        </div>
      </div>
    </form>
  );
}
