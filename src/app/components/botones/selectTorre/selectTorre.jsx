import React, { useState, useEffect } from 'react';
import { Spinner } from "@nextui-org/react";
import styles from './selectTorre.module.css';

const SelectTorre = ({ selectedReceta, onChange, refreshTorres, refreshTorres2, selectedTorre, onTorresChange }) => {
  const [torres, setTorres] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTorres = () => {
    if (selectedReceta) {
      setLoading(true);

      fetch(`http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/configuraciones/lista-torres?id_receta=${selectedReceta}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.ListadoTorres) {
            setTorres(data.ListadoTorres);
            onTorresChange(data.ListadoTorres); // Aquí pasamos el listado de torres al componente padre
            if (data.ListadoTorres.length > 0 && !selectedTorre) {
              onChange(data.ListadoTorres[0].id);
            }
          } else {
            setTorres([]);
          }
        })
        .catch((error) => {
          console.error('Error al obtener torres:', error);
          setTorres([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setTorres([]);
    }
  };

  useEffect(() => {
    fetchTorres();
  }, [selectedReceta, selectedTorre]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div className={styles.dropdownContainer}>
      {loading ? (
        <div className={styles.Cargando}><Spinner /></div>
      ) : (
        <select className={styles.dropdown} onChange={handleChange} value={selectedTorre || ''}>
          {torres.map((torre) => (
            <option key={torre.id} value={torre.id}>
              {torre.id}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SelectTorre;