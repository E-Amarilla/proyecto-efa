"use client";

import style from './DatosSDDA.module.css';
import textstyle from '../texto.module.css';
import useWebSocket from '@/app/utils/useWebSocket';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../../context/AuthContext";

const DatosSDDAComponent = () => {
  const initialdatosSdda = [
    { id: 1, texto: 'SDDA_LONG_MM', dato: null },
    { id: 2, texto: 'SDDA_VERTICAL_MM', dato: null },
    { id: 3, texto: 'SDDA NIVEL ACTUAL', dato: null },
  ];

  const [datosSdda, setdatosSdda] = useState(initialdatosSdda);
  const { equipoSeleccionado, setEquipoSeleccionado } = useContext(AuthContext);

  const pollId = "lista-tiempo-real";
  const { data } = useWebSocket(pollId);

  useEffect(() => {
    if (data && data.datosSdda) {
      const updateddatosSdda = initialdatosSdda.map((item, index) => ({
        ...item,
        dato: data.datosSdda[index] !== undefined ? data.datosSdda[index] : null,
      }));
      setdatosSdda(updateddatosSdda);
    }
  }, [data]);

  const handleClick = () => {
    setEquipoSeleccionado(equipoSeleccionado === "SDDA" ? null : "SDDA"); // Alterna la selección
  };

  return (
    <div
      className={`${style.datosGen} ${
        equipoSeleccionado === "SDDA" ? style.selected : ""
      }`}
      onClick={handleClick}
    >
      <h1 className={textstyle.titulo}>DATOS SDDA</h1>
      <div className={style.contenedorDatos}>
        {datosSdda.map(({ id, texto, dato }) => (
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

export default DatosSDDAComponent;
