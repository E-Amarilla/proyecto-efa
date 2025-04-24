"use client";
//components
import DatosGenerales from './DatosGenerales/DatosGenerales.jsx';
import DatosGripper from './DatosGripper/DatosGripper.jsx';
import DatosTorre from './DatosTorre/DatosTorre.jsx';
import DatosRobot from './DatosRobot/DatosRobot.jsx';
import DatosSDDA from './DatosSDDA/DatosSDDA.jsx';
import EquipoXImg from './EquipoXImg/EquipoXImg.jsx';
import SectorIO from './SectorIO/SectorIO.jsx';
import { useTranslation } from "react-i18next";


import style from './EquipoX.module.css';

const EquipoX = () => {
  const { t } = useTranslation('trad');
  return (
    
      <div className={style.all}>
        <div className={style.Izq}>
          <DatosGenerales />
          <SectorIO />
        </div>
        
          <div className={style.Med}>
            <span className={style.titulo}>{t('mayus.datosDesmoldeo')}</span>
            <DatosRobot />
            <DatosSDDA />
            <DatosTorre />
            <DatosGripper />
          </div>

        <div className={style.Der}>
          <EquipoXImg />
        </div>
      </div>
    

  );
};

export default EquipoX;
