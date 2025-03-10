"use client";

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '../../context/AuthContext'; // Importa el AuthContext
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";

import style from './desloguear.module.css';

//Imagenes
import Image from "next/image";

const Desloguear = ({ icon }) => {
    const { logout } = useContext(AuthContext); // Obtén la función logout del contexto

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
                    className={`${style.items} ${style.botonCerrar}`}
                    key="2"
                    onClick={logout} // Llama a la función logout aquí
                >
                    <span className={style.textCerrar}>Log out</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default Desloguear;
