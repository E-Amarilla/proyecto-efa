"use client";

import React, { useState } from "react";
import style from "./TiposAlarma.module.css"; // Estilos CSS

const TiposAlarma = () => {
    const opciones = ["TODAS", "ALARMAS", "NOTIFICACIONES", "ADVERTENCIAS"];
    const [seleccionado, setSeleccionado] = useState("TODAS");

    const handleChange = (e) => {
        setSeleccionado(e.target.value);
    };

    return (
        <div className={style.selectWrapper}>
            <select
                value={seleccionado}
                onChange={handleChange}
                className={style.customSelect}
            >
                {opciones.map((opcion, index) => (
                    <option key={index} value={opcion}>
                        {opcion}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TiposAlarma;
