"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useWebSocket from "../utils/useWebSocket";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [equipoSeleccionado, setEquipoSeleccionado] = useState("Default");
  const router = useRouter();
  const pathname = usePathname();
  const [streamInitialized, setStreamInitialized] = useState(false);
  const [user, setUser] = useState(null);

  const { data, isConnected } = useWebSocket("datos");

  useEffect(() => {
    const initializeStream = async () => {
      if (!streamInitialized) {
        try {
          await fetch("/api/cleanup", { method: "POST" });
          const response = await fetch("/api/stream");
          const data = await response.json();
          setStreamInitialized(true);
        } finally {}
      }
    };
    initializeStream();
  }, [streamInitialized, pathname]);

  useEffect(() => {
    const publicRoutes = ['/login', '/'];
    const acceso = sessionStorage.getItem('acceso');
    
    if (!publicRoutes.includes(pathname) && !acceso) {
      router.push('/login');
    }
    if (publicRoutes.includes(pathname) && acceso) {
      router.push('/completo');
    }
  }, [pathname]);

  const logout = () => {
    sessionStorage.removeItem('acceso');
    router.push('/login');
  };

  const contextValue = {
    user,
    logout,
    equipoSeleccionado,
    setEquipoSeleccionado,
    streamInitialized,
    data,
    isConnected
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;