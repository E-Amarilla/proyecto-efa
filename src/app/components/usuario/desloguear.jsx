"use client";

import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";
import style from './desloguear.module.css';

const Desloguear = ({ icon }) => {
    const router = useRouter();

    const handleLogout = () => {
        // Lógica de cierre de sesión aquí
        console.log("Deslogueando...");
        // Redireccionar a la página de inicio de sesión
        router.push('/login');
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Image
                    className={style.icon}
                    src={icon}
                    alt="Usuario Icon"
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
                <DropdownItem
                    className={style.buttonContainer}
                    key="button"
                    onClick={handleLogout} // Añadimos el manejador de clic aquí
                >
                    <Button
                        className={`${style.hoverEffect} flex justify-self-center font-bold`}
                        radius="full"
                        auto
                    > Cerrar sesión
                    </Button>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default Desloguear;
