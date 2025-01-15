"use client";

import style from "./TablaAlertas.module.css";
import TiposAlarma from "../components/Botones/TiposAlarma/TiposAlarma.jsx";

const TablaAlertas = () => {
  return (
    <>
      <div className={style.all}>
        <div className={style.contenedor}>
          <div className={style.contenedorTop}>
            <div className={style.tituloSubtitulo}>
              <h1>HISTORIAL DE ALERTAS</h1>
              <h2>EXTENDIDO</h2>
            </div>

            <div className={style.selector}>
              <TiposAlarma />
            </div>
          </div>

          <div className={style.tabla}>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default TablaAlertas;