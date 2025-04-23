"use client";

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import style from './MenuAlarmas.module.css';

const MenuAlarmas = ({ icon }) => {

    return (
        <Link href="/alertas">
            <Image
                className={style.icon}
                src={icon}
                alt="Alarma Icon"
            />
        </Link>
    );
};

export default MenuAlarmas;
