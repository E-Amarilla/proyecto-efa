"use client";

import { useState } from "react";
import { Toaster, toast } from "sonner"; // Importa Sonner
import Link from "next/link";
import Image from "next/image";
import style from "../Login.module.css";
import crem from "@/assets/img/creminox.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

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
        // Muestra una notificación de éxito
        toast.success("Correo enviado con éxito.", {
          position: "bottom-center",
        });
      } else {
        // Muestra una notificación de error con el mensaje del servidor
        toast.error(data.error || "Hubo un error al enviar el correo.", {
          position: "bottom-center",
        });
      }
    } catch (error) {
      // Muestra una notificación de error si hay problemas con la conexión
      toast.error("Error al conectar con el servidor.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <Toaster position="bottom-center" richColors={true} /> {/* Notificaciones */}
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
          <div>
            <Link className={style.signup} href="../login">
              ¿Recordó su contraseña? Inicie sesión aquí
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}