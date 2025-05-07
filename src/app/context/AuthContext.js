"use client";
import Cookies from 'js-cookie';

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import useWebSocket from "../utils/useWebSocket";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [equipoSeleccionado, setEquipoSeleccionado] = useState("Default");
  const router = useRouter();
  const pathname = usePathname();
  const [streamInitialized, setStreamInitialized] = useState(false);
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem('user_data');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

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
    const publicRoutes = ['/login', '/', '/login/recuperacion']; // Añadir esta ruta
    const blockedRoutes = ['/encajonado', '/paletizado'];
    const acceso = sessionStorage.getItem('acceso');
    
    if (!publicRoutes.includes(pathname) && !acceso) {
      router.push('/login');
    }
    if (publicRoutes.includes(pathname) && acceso) {
      router.push('/completo');
    }
    if (blockedRoutes.includes(pathname)) {
      router.push('/error');
    }
  }, [pathname]);

  const login = async (username, password) => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      const response = await axios.post(
        `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/usuario/login`,
        formData,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      
      const { role, access_token, token_type } = response.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      // Almacenar en sessionStorage solo el token y el token_type, excluyendo el role
      sessionStorage.setItem('user_data', JSON.stringify({ access_token, token_type, role }));
      
      Cookies.set('token', access_token, { secure: false, sameSite: 'lax' });
      
      // Guardar el role únicamente en el estado del contexto
      setUser({ access_token, token_type, role });
      
      router.push('/completo');
    } catch (error) {
      throw new Error('Credenciales inválidas');
    }
  };

  const logout = () => {
    setUser(null);
     delete axios.defaults.headers.common['Authorization'];
     sessionStorage.removeItem('token');
     sessionStorage.removeItem('user_data');
     sessionStorage.removeItem('username');
     sessionStorage.removeItem('acceso');

      Cookies.remove('token');

    router.push('/login');
  };

  const contextValue = {
    user,
    login,
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