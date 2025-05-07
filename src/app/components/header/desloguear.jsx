"use client";

import React, { useState, useRef, useEffect, useContext } from 'react';
import { VscAccount } from "react-icons/vsc";
import { useTranslation } from 'react-i18next';
import AuthContext from '../../context/AuthContext';
import Cookies from 'js-cookie';

const Desloguear = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { t } = useTranslation('trad');
    const { logout } = useContext(AuthContext);
    // Estado para almacenar el nombre de usuario
    const [username, setUsername] = useState('Usuario');

    // Cargar el nombre de usuario desde sessionStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUsername = sessionStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
            }
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        // Eliminar tokens y cookies
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('acceso');
        Cookies.remove('token');
        
        // Usar la función de logout del contexto si existe
        if (typeof logout === 'function') {
            logout();
        } else {
            // Como respaldo, redirigir manualmente
            window.location.href = '/login';
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Botón del perfil */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex items-center justify-center w-[25px] h-[25px] rounded-[100%] group transition-all duration-200 ease-in-out"
            >
                <div className="absolute inset-0 rounded-[100%] bg-gray-400/0 group-hover:bg-gray-400/20 transition-all duration-200 ease-in-out group-hover:scale-150 pointer-events-none" />
                <VscAccount className="w-[25px] h-[25px] text-black transition-transform duration-300 ease-in-out group-hover:scale-110" />
            </button>
    
            {/* Dropdown menu with shadow */}
            <div className={`absolute left-[-10px] mt-[14px] w-48 rounded-md transform transition-all duration-200 ease-in-out origin-top-right shadow-[0_0_15px_rgba(0,0,0,0.3)]
                ${isOpen 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                } bg-[#EEE]`}>

                {/* Header del perfil - MODIFICADO AQUÍ */}
                <div className="px-[10px] py-[14px] border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="ml-3">
                            <p className="text-sm font-medium text-[#131313]">
                                {username} {/* Usa el username del estado */}
                            </p>
                            <p className="text-xs text-gray-600">
                                {t('min.estadosesion')}
                            </p>
                        </div>
                    </div>
                </div>
    
                {/* Botón de cerrar sesión */}
                <div className="bg-[#f15b5f] rounded-b-md">
                    <button
                        onClick={handleLogout}
                        className="w-[100%] text-left px-[10px] py-[8px] text-sm text-[#D9D9D9] font-bold
                                 hover:bg-[#ff7a7e] rounded-b-md
                                 active:bg-red-200 active:text-black
                                 transition-all duration-200 ease-in-out
                                 flex items-center space-x-2
                                 cursor-pointer"
                    >
                        <span>{t('min.botonsesion')}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Desloguear;