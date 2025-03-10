"use client";

import AuthContext from "../../../context/AuthContext";
import style from "./DatosTorre.module.css";
import textstyle from "../texto.module.css";
import React, { useState, useEffect, useContext } from "react";

const DatosTorreComponent = () => {
  const { equipoSeleccionado, setEquipoSeleccionado } = useContext(AuthContext);

  const initialDatosTorre = [
    { id: 1, texto: "ACTUAL TOWER N°", dato: null },
    { id: 2, texto: "NEXT TOWER N°", dato: null },
    { id: 3, texto: "ACTUAL TOWER LEVEL", dato: null },
  ];

  const [datosTorre, setDatosTorre] = useState(initialDatosTorre);
  const { data } = useContext(AuthContext); // Obtiene datos del contexto

  useEffect(() => {
    if (data && data?.general?.datosTorre) {
      const updatedDatosTorre = initialDatosTorre.map((item, index) => ({
        ...item,
        dato: data?.general?.datosTorre[index] !== undefined ? data?.general?.datosTorre[index] : null,
      }));
      setDatosTorre(updatedDatosTorre);
    }
  }, [data]);

  const handleClick = () => {
    setEquipoSeleccionado(equipoSeleccionado === "Tower Positioner" ? null : "Tower Positioner"); // Alterna la selección
  };

  return (
    <div
      className={`${style.datosGen} ${
        equipoSeleccionado === "Tower Positioner" ? style.selected : ""
      }`}
      onClick={handleClick}
    >
      <h1 className={textstyle.titulo}>TOWER DATA</h1>
      <div className={style.contenedorDatos}>
        {datosTorre.map(({ id, texto, dato }) => (
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

export default DatosTorreComponent;
