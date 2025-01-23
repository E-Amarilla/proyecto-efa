// context/AuthContext.js
"use client";
import Cookies from 'js-cookie';
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
    const router = useRouter();

    const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
    });
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
            Cookies.set('token', token, { secure: true, sameSite: 'strict' }); // Guarda el token con seguridad
            setUser(response.data);
            router.push('/completo');
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
