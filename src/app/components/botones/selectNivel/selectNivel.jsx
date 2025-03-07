import { useState } from 'react';
import styles from './selectNivel.module.css';

const Dropdown = ({ onChange }) => {
  const [selectedNivel, setSelectedNivel] = useState('HN');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedNivel(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.dropdownContainer}>
      <select className={styles.dropdown} value={selectedNivel} onChange={handleChange}>
        <option value="HN" className={styles.texto} title="CH - Correccion_h">
          HN
        </option>
        <option value="ChG" className={styles.texto} title="CHg - Correccion_hguardado">
          ChG
        </option>
        <option value="ChB" className={styles.texto} title="CHb - Correccion_hbusqueda">
          ChB
        </option>
        <option value="FA" className={styles.texto} title="FA - Fallas">
          FA
        </option>
        <option value="uHN" className={styles.texto} title="uHN - ultimo_hNivel">
          uHN
        </option>
      </select>
    </div>
  );
};

export default Dropdown;
