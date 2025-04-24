"use client";

import style from './DatosSDDA.module.css';
import textstyle from '../texto.module.css';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../../context/AuthContext";
import { useTranslation } from "react-i18next";

const DatosSDDAComponent = () => {
  const { t } = useTranslation('trad');
  const { equipoSeleccionado, setEquipoSeleccionado } = useContext(AuthContext);
  const { data } = useContext(AuthContext); // Obtiene datos del contexto

  const initialdatosSdda = [
    { id: 1, texto: t('mayus.nivelActual'), dato: null, texto2: ' mm'  },
    { id: 2, texto: t('min.SDDALong'), dato: null, texto2: ' mm'  },
    { id: 3, texto: t('min.SDDAVertical'), dato: null, texto2: ' mm'  },
  ];

  const [datosSdda, setdatosSdda] = useState(initialdatosSdda);

  useEffect(() => {
    const datosSdda = data?.[2]?.datosSdda;
    if (datosSdda) {
      const updateddatosSdda = [
        { id: 1, texto: t('mayus.nivelActual'), dato: datosSdda.sdda_nivel_actual ?? null, texto2: ' mm'  },
        { id: 2, texto: t('min.SDDALong'), dato: datosSdda.sdda_long_mm ?? null, texto2: ' mm'  },
        { id: 3, texto: t('min.SDDAVertical'), dato: datosSdda.sdda_vertical_mm ?? null, texto2: ' mm'  },
      ];
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
      <h1 className={textstyle.titulo}>{t('mayus.datosSDDA')}</h1>
      <div className={style.contenedorDatos}>
        {datosSdda.map(({ id, texto, dato }) => (
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

export default DatosSDDAComponent;
