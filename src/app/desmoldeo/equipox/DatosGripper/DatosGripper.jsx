"use client";

import style from "./DatosGripper.module.css";
import textstyle from "../texto.module.css";
import React, { useState, useEffect, useContext } from "react";

import AuthContext from "../../../context/AuthContext";

const DatosGripperComponent = () => {
  const { equipoSeleccionado, setEquipoSeleccionado } = useContext(AuthContext);
  const { data } = useContext(AuthContext); // Obtiene datos del contexto

  const initialdatosGripper = [
    { id: 1, texto: "N° GRIPPER ACTUAL", dato: null },
    { id: 2, texto: "N° GRIPPER PRÓXIMO", dato: null },
  ];

  const [datosGripper, setdatosGripper] = useState(initialdatosGripper);

  useEffect(() => {
    const gripperData = data?.[2]?.datosGripper;
    if (gripperData) {
      const updateddatosGripper = [
        { id: 1, texto: "N° Gripper actual", dato: gripperData.NGripperActual ?? null },
        { id: 2, texto: "N° Gripper próximo", dato: gripperData.NGripperProximo ?? null }
      ];
      setdatosGripper(updateddatosGripper);
    }
  }, [data]);

  const handleClick = () => {
    setEquipoSeleccionado(
      equipoSeleccionado === "Gripper" || equipoSeleccionado === "Estación de grippers"
        ? null
        : "Gripper"
    );
  };

  return (
    <div
      className={`${style.datosGen} ${
        equipoSeleccionado === "Gripper" || equipoSeleccionado === "Estación de grippers"
          ? style.selected
          : ""
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
                <h4 className={textstyle.h4}>{dato === null ? "null" : dato.toString()}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatosGripperComponent;