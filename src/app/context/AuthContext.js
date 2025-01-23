// context/AuthContext.js
"use client";
import Cookies from 'js-cookie';
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation"; // Importa usePathname

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
    const router = useRouter();
    const pathname = usePathname(); // Obtén la ruta actual

    // Estado de autenticación
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Estado de la transmisión
    const [streamInitialized, setStreamInitialized] = useState(false);

    // Efecto para inicializar y limpiar la transmisión solo en /camaras
    useEffect(() => {
        if (pathname === '/camaras') { // Verifica si la ruta es /camaras
            const initializeStream = async () => {
                try {
                    // Limpiar recursos antes de iniciar nuevas transmisiones
                    await fetch("/api/cleanup", { method: "POST" });

                    // Iniciar nuevas transmisiones
                    const response = await fetch("/api/stream");
                    const data = await response.json();
                    console.log(data.message);
                    setStreamInitialized(true);
                } catch (error) {
                    console.error("Error al iniciar la transmisión:", error);
                }
            };

            if (!streamInitialized) {
                initializeStream();
            }

            // Limpieza al desmontar el componente
            return () => {
                if (streamInitialized) {
                    fetch("/api/cleanup", { method: "POST" })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data.message);
                        })
                        .catch(error => {
                            console.error("Error al limpiar los recursos:", error);
                        });
                }
            };
        }
    }, [streamInitialized, pathname]); // Añade pathname como dependencia

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
            Cookies.set('token', token, { secure: true, sameSite: 'strict' });
            setUser(response.data);
            router.push('/completo');
        } catch (error) {
            console.log('Login Failed:', error);
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