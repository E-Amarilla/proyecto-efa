"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import crem from "@/assets/img/creminox.png";
import { useTranslation } from 'react-i18next';

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('trad');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      sessionStorage.setItem('acceso', 'true');
      router.push('/completo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100vh] w-full items-center justify-center">
      <div className="w-auto h-[55vh] gap-[15px] flex flex-col items-center justify-between p-[3rem_4rem_2rem_4rem] max-w-[1920px] text-[#D9D9D9] bg-[#131313] rounded-[15px]">
        <Image
          src={crem}
          alt="Creminox"
          className="flex w-[65%] p-[0px] h-auto"
        />
        
        <form onSubmit={handleSubmit} className="w-[100%] h-3/5 flex flex-col justify-evenly mt-[-100px]">
          <div className="flex flex-col gap-[5px] h-1/3">
            <label className="flex font-bold text-[17px] tracking-[0.5px]">
              {t('min.usuario')}
            </label>
            <input
              type="text"
              className="bg-[#1f1f1f] p-[4px] rounded-[10px] w-[100%] h-[60%] flex items-center justify-center border-none"
            />
          </div>

          <div className="flex flex-col gap-[5px] h-1/3">
            <label className="flex font-bold text-[17px] tracking-[0.5px]">
            {t('min.contra')}
            </label>
            <input
              type="password"
              className="bg-[#1f1f1f] p-[4px] rounded-[10px] w-[100%] h-[60%] flex items-center justify-center border-none"
            />
          </div>

          <button 
            type="submit"
            className="bg-[#e82a31] mt-[5px] p-[4px] rounded-[10px] w-[100%] h-1/5 flex items-center justify-center border-none text-[#D9D9D9] font-bold cursor-pointer disabled:bg-[#a82328] disabled:cursor-not-allowed"
          >
            {t('min.acceder')}
          </button>
        </form>

        <Link 
          href="/login/recuperacion"
          className="w-[100%] mt-[-100px] flex text-center justify-center text-[#5d5d5d] h-auto text-[14px] font-bold tracking-[0.5px] cursor-pointer hover:text-[#e82a31] transition-all duration-200 ease-in-out"
        >
          {t('min.recuperar')}
        </Link>
      </div>
    </div>
  );
}

export default Login;