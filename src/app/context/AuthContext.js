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
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        }
        return null;
    });

    // Conectar WebSocket con el pollId estático
    const { data, isConnected } = useWebSocket("lista-datos-ws");

    useEffect(() => {
        const publicRoutes = ['/login', '/signup', '/login/recuperacion'];
        const blockedRoutes = ['/encajonado', '/paletizado'];
    
        if (typeof window !== "undefined") {
            // 🔹 Redirigir al login si no hay usuario y la ruta no es pública
            if (!user && !publicRoutes.includes(pathname)) {
                router.push('/login');
            }
    
            // 🔹 Bloquear rutas sin importar si el usuario está autenticado o no
            if (blockedRoutes.includes(pathname)) {
                router.push('/error'); // O cualquier otra página que indique acceso denegado
            }
        }
    }, [user, pathname]);    

    useEffect(() => {
        const initializeStream = async () => {
            if (!streamInitialized) {
                try {
                    await fetch("/api/cleanup", { method: "POST" });
                    const response = await fetch("/api/stream");
                    const data = await response.json();
                    console.log(data.message);
                    setStreamInitialized(true);
                } catch (error) {
                    console.error("Error al iniciar la transmisión:", error);
                }
            }
        };
        initializeStream();
    }, [streamInitialized, pathname]);

    useEffect(() => {
        if (pathname !== "/desmoldeo/equipox") {
            setEquipoSeleccionado("Default");
        }
    }, [pathname]);

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
            Cookies.set('token', token, { secure: false, sameSite: 'lax' });
            setUser(response.data);
            router.push('/completo');
            console.log('Login Authorized');
        } catch (error) {
            console.log('Login Failed:', error);
            throw new Error('Credenciales inválidas');
        }
    };

    const logout = () => {
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    const contextValue = {
        user,
        login,
        logout,
        equipoSeleccionado,
        setEquipoSeleccionado,
        streamInitialized,
        data, // Datos del WebSocket disponibles en el contexto
        isConnected // Estado de conexión WebSocket
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;