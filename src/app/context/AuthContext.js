// context/AuthContext.js
"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
    const router = useRouter();

    // Restaurar el estado del usuario desde localStorage al cargar la página
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            setUser(parsedUserData);
            axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUserData.access_token}`;
        }
    }, []);

    const login = async (username, password) => {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            const response = await axios.post(`http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/usuario/login`, formData, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            router.push('/desmoldeo'); // Redirige a /desmoldeo después de iniciar sesión
        } catch (error) {
            console.log('Login Failed:', error);
        }
    };

    const logout = () => {
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Eliminar el usuario de localStorage
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, equipoSeleccionado, setEquipoSeleccionado }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
