import { useState } from 'react';
import styles from './selectNivel.module.css';

const Dropdown = ({ onChange, disabled = false }) => {
  const [selectedNivel, setSelectedNivel] = useState('HN');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedNivel(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.dropdownContainer}>
      <select 
        className={`${styles.dropdown} ${disabled ? styles.disabled : ''}`} 
        value={selectedNivel} 
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="HN" className={styles.texto} title="HN - Correccion_h">
          HN | hNivel
        </option>
        <option value="ChG" className={styles.texto} title="CHg - Correccion_hguardado">
          ChG | Guardado
        </option>
        <option value="ChB" className={styles.texto} title="CHb - Correccion_hbusqueda">
          ChB | Busqueda
        </option>
        <option value="FA" className={styles.texto} title="FA - Fallas">
          FA | Fallas
        </option>
        <option value="uHN" className={styles.texto} title="uHN - ultimo_hNivel">
          uHN | uhNivel
        </option>
      </select>
    </div>
  );
};

export default Dropdown;