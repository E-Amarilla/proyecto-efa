"use client";

import React, { useState, useEffect } from 'react';
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
import useWebSocket from '../../utils/useWebSocket';

const validIds = process.env.NEXT_PUBLIC_VALID_IDS
    ? process.env.NEXT_PUBLIC_VALID_IDS.split(',').map(Number)
    : [];

const MenuAlarmas = ({ icon }) => {
    const [alerts, setAlerts] = useState([]); // Estado para almacenar las alertas filtradas
    const pollId = "alarmas-datos";
    const { data } = useWebSocket(pollId);

    useEffect(() => {
        if (data) {
            // Filtra las alarmas con ID válido
            const filteredAlerts = data.filter(alarma => validIds.includes(alarma.id_alarma) && alarma.estadoAlarma === "Activo");

            // Agrega nuevas alertas al inicio y recorta el exceso
            setAlerts(prevAlerts => {
                const updatedAlerts = [...filteredAlerts, ...prevAlerts]; // Nuevas alertas primero
                return updatedAlerts.slice(0, 3); // Mantener solo las primeras 3
            });
        }
    }, [data]);

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
                    {alerts.length > 0 ? (
                        alerts.map((alarma, index) => (
                            <DropdownItem
                                className={style.items}
                                key={index}
                                description={alarma.descripcion}
                            >
                                {alarma.tipoAlarma}
                            </DropdownItem>
                        ))
                    ) : (
                        <DropdownItem
                            className={style.items}
                            key="no-alerts"
                            description="No activity"
                        >
                            No active alarms
                        </DropdownItem>
                    )}
                </DropdownSection>

                <DropdownItem
                    className={style.buttonContainer}
                    key="button"
                >
                    <Link href="/alertas">
                        <Button
                            className={`${style.hoverEffect} flex justify-self-center font-bold`}
                            radius="full"
                            auto
                        >
                            See more
                        </Button>
                    </Link>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default MenuAlarmas;
