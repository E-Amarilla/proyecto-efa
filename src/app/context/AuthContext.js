"use client";
import Cookies from 'js-cookie';
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation"; // Importa usePathname

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [equipoSeleccionado, setEquipoSeleccionado] = useState("Default"); // Inicializa con "Default"
    const router = useRouter();
    const pathname = usePathname(); // Obtén la ruta actual

    // Estado de autenticación
    const [user, setUser] = useState(() => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        }
        return null;
    });

    // Estado de la transmisión
    const [streamInitialized, setStreamInitialized] = useState(false);

    // Redirigir al login si no hay usuario autenticado y la ruta no es pública
    useEffect(() => {
        const publicRoutes = ['/login', '/signup', '/login/recuperacion'];
        if (typeof window !== "undefined" && !user && !publicRoutes.includes(pathname)) {
            router.push('/login');
        }
    }, [user, pathname]);

    // Efecto para inicializar la transmisión solo en /camaras
    useEffect(() => {
        const initializeStream = async () => {
            if (!streamInitialized) { // Solo inicializa si no se ha hecho antes
                try {
                    // Limpiar recursos antes de iniciar nuevas transmisiones
                    await fetch("/api/cleanup", { method: "POST" });

                    // Iniciar nuevas transmisiones
                    const response = await fetch("/api/stream");
                    const data = await response.json();
                    console.log(data.message);
                    setStreamInitialized(true); // Solo cambia el estado si no ha sido inicializado
                } catch (error) {
                    console.error("Error al iniciar la transmisión:", error);
                }
            }
        };

        initializeStream();
    }, [streamInitialized, pathname]); // Asegúrate de que `streamInitialized` es el estado correcto

    // Efecto para resetear el equipo seleccionado cuando se abandona la página /desmoldeo/equipox
    useEffect(() => {
        if (pathname !== "/desmoldeo/equipox") {
            setEquipoSeleccionado("Default");
        }
    }, [pathname]);

    // Función para iniciar sesión
    const login = async (username, password) => {
        try {
          const formData = new FormData();
          formData.append('username', username);
          formData.append('password', password);
          const response = await axios.post(`http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/usuario/login`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          });
      
          const token = response.data.access_token;
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          localStorage.setItem('user', JSON.stringify(response.data));
          Cookies.set('token', token, { secure: false, sameSite: 'lax' }); // Cambia secure a false en desarrollo
          setUser(response.data);
          router.push('/completo');
      
          console.log('Login Authorized');         
        } catch (error) {
          console.log('Login Failed:', error);
          throw new Error('Credenciales inválidas'); // Lanzar una excepción con el mensaje de error
        }
      };

    // Función para cerrar sesión
    const logout = () => {
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    // Valor del contexto
    const contextValue = {
        user,
        login,
        logout,
        equipoSeleccionado,
        setEquipoSeleccionado,
        streamInitialized, // Añade el estado de la transmisión al contexto
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
