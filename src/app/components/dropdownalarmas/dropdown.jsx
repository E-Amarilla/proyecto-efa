"use client";

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
    Button,
} from "@nextui-org/react";
import style from './MenuAlarmas.module.css';

const MenuAlarmas = ({ icon }) => {
    return (
        <Dropdown className={style.contenedorDrop}>
            <DropdownTrigger>
                <Image
                    className={style.icon}
                    src={icon}
                    alt="Alarma Icon"
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
                <DropdownSection className={style.contenedorItems}>
                    <DropdownItem
                        className={style.items}
                        key="1"
                        description="Para de emergencia 'A' activada."
                    >
                        {"Alarma"}
                    </DropdownItem>

                    <DropdownItem
                        className={style.items}
                        key="2"
                        description="Baliza de buzzer abierta."
                    >
                        {"Notificacion"}
                    </DropdownItem>

                    <DropdownItem
                        className={style.items}
                        key="3"
                        description="Puerta principal 'A' abierta."
                    >
                        {"Notificación"}
                    </DropdownItem>
                </DropdownSection>

                <DropdownItem
                    className={style.buttonContainer}
                    key="button"
                >
                    <Link href="/tablaalarmas">
                        <Button
                            className={`${style.hoverEffect} flex justify-self-center font-bold`}
                            radius="full"
                            auto
                        >
                            Ver más
                        </Button>
                    </Link>
                </DropdownItem>

            </DropdownMenu>
        </Dropdown>
    );
};

export default MenuAlarmas;
