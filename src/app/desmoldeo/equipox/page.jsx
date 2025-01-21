//components
import DatosGenerales from './DatosGenerales/DatosGenerales.jsx';
import DatosGripper from './DatosGripper/DatosGripper.jsx';
import DatosTorre from './DatosTorre/DatosTorre.jsx';
import DatosRobot from './DatosRobot/DatosRobot.jsx';
import DatosSDDA from './DatosSDDA/DatosSDDA.jsx';
import EquipoXImg from './EquipoXImg/EquipoXImg.jsx';
import SectorIO from './SectorIO/SectorIO.jsx';
import { EquipoProvider } from './EquipoContext';

import style from './EquipoX.module.css';

const EquipoX = () => {
  return (
    <EquipoProvider>
      <div className={style.all}>
        <div className={style.Izq}>
          <DatosGenerales />
          <SectorIO />
        </div>

        <div className={style.Med}>
          <DatosGripper />
          <DatosRobot />
          <DatosSDDA />
          <DatosTorre />
        </div>

        <div className={style.Der}>
          <EquipoXImg />
        </div>
      </div>
    </EquipoProvider>
  );
};

export default EquipoX;
