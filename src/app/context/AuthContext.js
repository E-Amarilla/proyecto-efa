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
  const [streamInitialized, setStreamInitialized] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem('stream_initialized') === 'true';
    }
    return false;
  });
  
  const [streamRestartSequence, setStreamRestartSequence] = useState(0);
  const [streamInitializationAttempted, setStreamInitializationAttempted] = useState(false);
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem('user_data');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const { data, isConnected } = useWebSocket("datos");

  useEffect(() => {
    if (!streamInitializationAttempted && !streamInitialized) {
      setStreamInitializationAttempted(true);
      
      const initializeStreamOnStartup = async () => {
        try {
          console.log("[Cámaras] Verificando estado actual antes de iniciar...");
          // Verificar primero si hay streams activos
          const checkResponse = await fetch("/api/stream-status");
          const checkData = await checkResponse.json();
          
          if (checkData.isStreaming) {
            console.log("[Cámaras] Los streams ya están activos, no es necesario reiniciar");
            setStreamInitialized(true);
            sessionStorage.setItem('stream_initialized', 'true');
            return;
          }
          
          console.log("[Cámaras] Iniciando limpieza inicial...");
          await fetch("/api/cleanup", { method: "POST" });

          await new Promise(resolve => setTimeout(resolve, 2000));
          
          console.log("[Cámaras] Iniciando streams...");
          const response = await fetch("/api/stream");
          const data = await response.json();
          
          console.log("[Cámaras] Esperando a que los archivos se generen...");
          
          await new Promise(resolve => setTimeout(resolve, 5000)); 
          
          setStreamInitialized(true);
          sessionStorage.setItem('stream_initialized', 'true');
          console.log("[Cámaras] Streams inicializados correctamente");
        } catch (error) {
          console.error("[Cámaras] Error al inicializar streams:", error);
          setTimeout(() => {
            setStreamInitializationAttempted(false);
          }, 10000);
        }
      };
      
      initializeStreamOnStartup();
    }
  }, [streamInitializationAttempted, streamInitialized]);

  useEffect(() => {
    if (streamInitialized) {
      const checkRestartSequence = async () => {
        try {
          const response = await fetch("/api/check-restart-sequence");
          const data = await response.json();
          
          if (data.restartSequence !== undefined && data.restartSequence !== streamRestartSequence) {
            console.log("[Cámaras] Nueva secuencia de reinicio detectada:", data.restartSequence);
            
            setTimeout(() => {
              setStreamRestartSequence(data.restartSequence);
              console.log("[Cámaras] Actualizando secuencia de reinicio para los reproductores");
            }, 10000);
          }
        } catch (error) {
          console.error("[Cámaras] Error al verificar secuencia de reinicio:", error);
        }
      };
      
      checkRestartSequence();
      const interval = setInterval(checkRestartSequence, 5000);
      
      return () => clearInterval(interval);
    }
  }, [streamInitialized, streamRestartSequence]);

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
      
      sessionStorage.setItem('user_data', JSON.stringify({ access_token, token_type, role }));
      
      Cookies.set('token', access_token, { secure: false, sameSite: 'lax' });
      
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
    streamRestartSequence,
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