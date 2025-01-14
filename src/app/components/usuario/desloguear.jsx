"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";

import style from './desloguear.module.css';

//Imagenes
import Image from "next/image";

const Desloguear = ({ icon }) => {
    const router = useRouter();

    const handleLogout = () => {
        console.log("Deslogueando...");
        router.push('/login');
    };

    const handleChangeUser = () => {
        console.log("Cambiando de usuario...");
        router.push('/login'); // Cambia a la URL que desees
    };

    return (
        <Dropdown className={style.contenedorDrop}>
            <DropdownTrigger>
                <Image
                    className={style.icon}
                    src={icon}
                    alt="Usuario Icon"
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
                <DropdownItem
                    className={style.items}
                    key="1"
                    onClick={handleChangeUser} // Cambiamos la navegación aquí
                >
                    Cambiar de usuario
                </DropdownItem>
                <DropdownItem
                
                    className={`${style.items} ${style.botonCerrar}`}
                    key="2"
                    onClick={handleLogout} // Añadimos el manejador de clic aquí
                >
                    <span className={style.textCerrar}>Cerrar sesión</span>
                </DropdownItem>

            </DropdownMenu>
        </Dropdown>
    );
};

export default Desloguear;