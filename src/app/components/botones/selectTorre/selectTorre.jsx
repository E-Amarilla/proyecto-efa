import { useState } from 'react';
import styles from './selectTorre.module.css';

const Dropdown = ({ onChange }) => {
  const [selectedTorre, setSelectedTorre] = useState(1);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedTorre(newValue);
    onChange(newValue); // Enviar el nuevo valor a la página padre
  };

  return (
    <div className={styles.dropdownContainer}>
      <select className={styles.dropdown} value={selectedTorre} onChange={handleChange}>
        {[...Array(50).keys()].map((num) => (
          <option key={num + 1} value={num + 1} className={styles.texto}>
            {num + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
