//components
import DatosGenerales from './DatosGenerales/DatosGenerales.jsx';
import DatosGripper from './DatosGripper/DatosGripper.jsx';
import DatosTorre from './DatosTorre/DatosTorre.jsx';
import DatosKuka from './DatosKuka/DatosKuka.jsx';
import DatosSDDA from './DatosSDDA/DatosSDDA.jsx';
import EquipoXImg from './EquipoXImg/EquipoXImg.jsx';
import SectorIO from './SectorIO/SectorIO.jsx';

import style from './EquipoX.module.css';

const EquipoX = () => {
    return (
        <>
            <body className={style.all}>
                <div className={style.Izq}>
                    <DatosGenerales />
                    <SectorIO />
                </div>

                <div className={style.Med}>
                    <DatosGripper />
                    <DatosKuka />
                    <DatosSDDA />
                    <DatosTorre />
                </div>

                <div className={style.Der}>
                    <EquipoXImg />
                </div>
            </body>
        </>
    );
};

export default EquipoX;