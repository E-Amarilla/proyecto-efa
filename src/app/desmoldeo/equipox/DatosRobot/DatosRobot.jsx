"use client";
import style from './DatosRobot.module.css';
import textstyle from '../texto.module.css';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../../context/AuthContext";

const DatosRobotComponent = () => {
  const initialDatosRobot = [
    { id: 1, texto: 'POSICION X', dato: null, texto2: ' mm' },
    { id: 2, texto: 'POSICION Y', dato: null, texto2: ' mm' },
    { id: 3, texto: 'POSICION Z', dato: null, texto2: ' mm' },
  ];

  const [datosRobot, setDatosRobot] = useState(initialDatosRobot);
  const { equipoSeleccionado, setEquipoSeleccionado } = useContext(AuthContext);

  const { data } = useContext(AuthContext); // Obtiene datos del contexto

  useEffect(() => {
    if (data && data?.general?.datosRobot) {
      const updatedDatosRobot = initialDatosRobot.map((item, index) => ({
        ...item,
        dato: data?.general?.datosRobot[index] !== undefined ? data?.general?.datosRobot[index] : null,
      }));
      setDatosRobot(updatedDatosRobot);
    }
  }, [data]);

  const handleClick = () => {
    setEquipoSeleccionado(equipoSeleccionado === "Robot" ? null : "Robot"); // Alterna la selección
  };

  return (
    <div
      className={`${style.datosGen} ${
        equipoSeleccionado === "Robot" ? style.selected : ""
      }`}
      onClick={handleClick}
    >
      <h1 className={textstyle.titulo}>ROBOT DATA</h1>
      <div className={style.contenedorDatos}>
        {datosRobot.map(({ id, texto, dato }) => (
          <div key={id} className={style.datoList}>
            <div className={style.detallesDatos}>
              <div className={style.texto}>
                <h3 className={textstyle.subtitulo}>{texto}</h3>
                <h4 className={textstyle.h4}>{dato === null ? 'null' : dato.toString()} mm</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatosRobotComponent;
