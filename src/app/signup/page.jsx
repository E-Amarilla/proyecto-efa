"use client";

import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import style from "./Login.module.css";
import Link from "next/link";

//Imagenes
import Image from "next/image";
import crem from "@/assets/img/creminox.png";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleRegister = async (e) => {
  e.preventDefault();
  try {
      const response = await axios.post(`http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/usuario/registrar`, {
      username: registerUsername,
      password: registerPassword,
      });
      login(registerUsername, registerPassword);
  } catch(error) {
      console.error('Failed to register user:', error);
  }
}

  return (
    <div className={style.all}>
      <div className={style.contenedor}>
        <Image
          src={crem}
          alt='Creminox'
          className={style.imagen}
        />
        <form className={style.formularioLogin} onSubmit={handleRegister}>
          <div className={style.inlab}>
          <label
            htmlFor="registerUsername"
            className="form-label"
          >
            Username
          </label>
          
          <input
              type="text"
              className="form-control"
              id="registerUsername"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
              required
          />
          </div>

          <div className={style.inlab}>
          <label
            htmlFor="registerPassword"
            className="form-label"
          >
            Password
          </label>

          <input
              type="password"
              className="form-control"
              id="registerPassword"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
          />
          </div>

          <button type="submit" className="btn btn-primary">Register</button>
        </form>
        
        <div>
          <Link className={style.signup} href="/login">Ya esta registrado? Ingrese sesión</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
