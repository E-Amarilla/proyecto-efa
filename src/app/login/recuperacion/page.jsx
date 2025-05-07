"use client";

import { useState } from "react";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import crem from "@/assets/img/creminox.png";
import { useTranslation } from 'react-i18next';

// Componente Spinner para reutilizar
const Spinner = () => (
  <div className="border-[3px] border-solid border-[#f3f3f3] border-t-[#e82a31] rounded-[50%] w-[20px] h-[20px] animate-spin"></div>
);

export default function ForgotPassword() {
  const { t } = useTranslation('trad');
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Correo enviado con éxito.", {
          position: "bottom-center",
        });
      } else {
        toast.error(data.error || "Hubo un error al enviar el correo.", {
          position: "bottom-center",
        });
      }
    } catch (error) {
      toast.error("Error al conectar con el servidor.", {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="bottom-center" richColors={true} />
      <div className="flex min-h-[100vh] w-full items-center justify-center">
        <div className="w-auto h-[350] gap-[15px] flex flex-col items-center justify-between p-[3rem_4rem_2rem_4rem] max-w-[1920px] text-[#D9D9D9] bg-[#131313] rounded-[15px]">
          <Image
            src={crem}
            alt="Creminox"
            className="flex w-[65%] p-[0px] h-auto"
          />
          
          <form onSubmit={handleSubmit} className="w-[100%] h-3/5 flex flex-col justify-evenly mt-[-100px]">
            <div className="flex flex-col gap-[5px] h-[80px]">
              <label className="flex font-bold text-[17px] tracking-[0.5px]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#1f1f1f] p-[4px] rounded-[10px] w-[100%] h-[60%] flex items-center justify-center border-none pl-[8px]"
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="bg-[#e82a31] mt-[5px] p-[4px] rounded-[10px] w-[100%] h-[40px] flex items-center justify-center border-none text-[#D9D9D9] font-bold cursor-pointer disabled:bg-[#a82328] disabled:cursor-not-allowed"
            >
              {loading ? <Spinner /> : t('min.recuperarcontra')}
            </button>
          </form>
          
          <Link 
            href="/login"
            className="w-[100%] mt-[-100px] flex text-center justify-center text-[#5d5d5d] h-auto text-[14px] font-bold tracking-[0.5px] cursor-pointer hover:text-[#e82a31] transition-all duration-200 ease-in-out"
          >
            {t('min.recordo')}
          </Link>
        </div>
      </div>
    </>
  );
}