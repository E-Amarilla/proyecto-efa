"use client";

import style from "./DatosGripper.module.css";
import textstyle from "../texto.module.css";
import React, { useState, useEffect, useContext } from "react";

import AuthContext from "../../../context/AuthContext";

const DatosGripperComponent = () => {
  const { equipoSeleccionado, setEquipoSeleccionado } = useContext(AuthContext);

  const initialdatosGripper = [
    { id: 1, texto: "N° GRIPPER ACTUAL", dato: null },
    { id: 2, texto: "N° GRIPPER PROXIMO", dato: null },
  ];

  const [datosGripper, setdatosGripper] = useState(initialdatosGripper);

  const { data } = useContext(AuthContext); // Obtiene datos del contexto

  useEffect(() => {
    if (data && data?.general?.datosGripper) {
      const updateddatosGripper = initialdatosGripper.map((item, index) => ({
        ...item,
        dato: data?.general?.datosGripper[index] !== undefined ? data?.general?.datosGripper[index] : null,
      }));
      setdatosGripper(updateddatosGripper);
    }
  }, [data]);

  const handleClick = () => {
    setEquipoSeleccionado(equipoSeleccionado === "Gripper" || equipoSeleccionado === "Estación de grippers" ? null : "Gripper"); // Alterna la selección
  };

  return (
    <div
      className={`${style.datosGen} ${
        equipoSeleccionado === "Gripper" || equipoSeleccionado === "Estación de grippers" ? style.selected : ""
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
