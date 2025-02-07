import { useState } from 'react';
import styles from './selectNivel.module.css';

const Dropdown = ({ onChange }) => {
  const [selectedNivel, setSelectedNivel] = useState('CH');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedNivel(newValue);
    onChange(newValue); // Enviar el nuevo valor a la página padre
  };

  return (
    <div className={styles.dropdownContainer}>
      <select className={styles.dropdown} value={selectedNivel} onChange={handleChange}>
        <option value="CH" className={styles.texto} title="CH - Correccion_h">
          CH
        </option>
        <option value="CHg" className={styles.texto} title="CHg - Correccion_hguardado">
          CHg
        </option>
        <option value="CHb" className={styles.texto} title="CHb - Correccion_hbusqueda">
          CHb
        </option>
        <option value="FA" className={styles.texto} title="FA - Fallas">
          FA
        </option>
      </select>
    </div>
  );
};

export default Dropdown;
