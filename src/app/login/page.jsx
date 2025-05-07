"use client";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import crem from "@/assets/img/creminox.png";
import { useTranslation } from 'react-i18next';
import styles from './Login.module.css';
import { Toaster, toast } from "sonner";

const Spinner = () => (
  <div className="border-[3px] border-solid border-[#f3f3f3] border-t-[#e82a31] rounded-[50%] w-[20px] h-[20px] animate-spin"></div>
);

const Login = () => {
   const { t } = useTranslation();
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
      sessionStorage.setItem('acceso', 'true'); // Agrega esta línea
      setMessage('');
    } catch (error) {
      if (error.message === "Credenciales inválidas") {
        toast.error(t('min.credencialesInvalidas'), {
          position: "bottom-center",
        });
      } else {
        toast.error(t('min.errorCredenciales'), {
          position: "bottom-center",
        });
      }
    } finally {
      setLoading(false);
    }
  };
    

  return (
    <div className="flex min-h-[100vh] w-full items-center justify-center">
      <Toaster position="bottom-center" richColors={true} />
      <div className="w-auto h-[440px] flex flex-col items-center justify-between p-[3rem_4rem_2rem_4rem] max-w-[1920px] text-[#D9D9D9] bg-[#131313] rounded-[15px]">
        <Image
          src={crem}
          alt="Creminox"
          className="flex w-[65%] p-[0px] h-auto"
        />
        
        <form onSubmit={handleSubmit} className="w-[100%] h-3/5 flex flex-col">
          <div className="flex flex-col gap-[5px] h-[80px]">
            <label className="flex font-bold text-[17px] tracking-[0.5px]">
              {t('min.usuario')}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#1f1f1f] p-[4px] rounded-[10px] w-[100%] h-[80px] flex items-center justify-center border-none pl-[8px]"
            />
          </div>

          <div className="flex flex-col gap-[5px] h-[80px]">
            <label className="flex font-bold text-[17px] tracking-[0.5px]">
            {t('min.contra')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#1f1f1f] p-[4px] rounded-[10px] w-[100%] h-[80px] flex items-center justify-center border-none pl-[8px]"
            />
          </div>

          <div className={styles.errorContainer}>
            {message && <div className={styles.errorMessage}>{message}</div>}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="bg-[#e82a31] p-[4px] rounded-[10px] w-[100%] h-[50px] flex items-center justify-center border-none text-[#D9D9D9] font-bold cursor-pointer disabled:bg-[#a82328] disabled:cursor-not-allowed"
          >
            {loading ? <Spinner /> : t('min.acceder')}
          </button>
        </form>

        <Link 
          href="/login/recuperacion"
          className="w-[100%] flex text-center justify-center text-[#5d5d5d] h-auto text-[14px] font-bold tracking-[0.5px] cursor-pointer hover:text-[#e82a31] transition-all duration-200 ease-in-out"
        >
          {t('min.recuperar')}
        </Link>
      </div>
    </div>
  );
}

export default Login;