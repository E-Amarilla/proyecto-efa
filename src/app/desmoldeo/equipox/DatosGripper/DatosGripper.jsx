"use client";

import { useEquipo } from "../EquipoContext";
import style from "./DatosGripper.module.css";
import textstyle from "../texto.module.css";
import useWebSocket from "@/app/utils/useWebSocket";
import React, { useState, useEffect } from "react";

const DatosGripperComponent = () => {
  const { equipoSeleccionado, setEquipoSeleccionado } = useEquipo();

  const initialdatosGripper = [
    { id: 1, texto: "COD. GRIPPER ACTUAL", dato: null },
    { id: 2, texto: "COD. GRIPPER PROXIMO", dato: null },
    { id: 3, texto: "GRIPPERS DISPONIBLES", dato: null },
  ];

  const [datosGripper, setdatosGripper] = useState(initialdatosGripper);
  const pollId = "lista-tiempo-real";
  const { data } = useWebSocket(pollId);

  useEffect(() => {
    if (data && data.datosGripper) {
      const updateddatosGripper = initialdatosGripper.map((item, index) => ({
        ...item,
        dato: data.datosGripper[index] !== undefined ? data.datosGripper[index] : null,
      }));
      setdatosGripper(updateddatosGripper);
    }
  }, [data]);

  const handleClick = () => {
    setEquipoSeleccionado(equipoSeleccionado === "Gripper" ? null : "Gripper"); // Alterna la selección
  };

  return (
    <div
      className={`${style.datosGen} ${
        equipoSeleccionado === "Gripper" ? style.selected : ""
      }`}
      onClick={handleClick}
    >
      <h1 className={textstyle.titulo}>DATOS GRIPPERS</h1>
      <div className={style.contenedorDatos}>
        {datosGripper.map(({ id, texto, dato }) => (
          <div key={id} className={style.datoList}>
            <div className={style.detallesDatos}>
              <div className={style.texto}>
                <h3 className={textstyle.subtitulo}>{texto}</h3>
                <h4 className={textstyle.h4}>{dato === null ? 'null' : dato.toString()}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatosGripperComponent;
