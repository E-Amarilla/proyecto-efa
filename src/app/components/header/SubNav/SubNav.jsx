import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./SubNav.module.css";
import puntoVerde from "../../IMG/semaforo/puntoVerde.png"; // Imagen de punto verde
import puntoGris from "../../IMG/semaforo/puntoGris.png"; // Imagen de punto gris

const SubNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);

  const opcionesBotones = [
    { id: 1, path: "/home", text: "COMPLETO" },
    { id: 2, path: "/desmoldeo", text: "DESMOLDEO" },
    { id: 3, path: "/encajonado", text: "ENCAJONADO" },
    { id: 4, path: "/paletizado", text: "PALETIZADO" },
  ];

  // Actualiza el estado al hacer clic
  const handleClick = (id, path) => {
    setActiveId(id);
    navigate(path); // Redirige al path correspondiente
  };

  // Selecciona automáticamente el activo con base en la URL
  useEffect(() => {
    const currentOption = opcionesBotones.find(
      (option) => option.path === location.pathname
    );
    if (currentOption) setActiveId(currentOption.id);
  }, [location.pathname]);

  return (
    <div className={style.contenedor}>
      <div className={style.SubNav}>
        <ul className={style.navLinks}>
          {opcionesBotones.map(({ id, path, text }) => (
            <li
              key={id}
              className={`${style.itemNav} ${
                activeId === id ? style.active : ""
              }`}
              onClick={() => handleClick(id, path)} // Redirige al hacer clic en cualquier parte del contenedor
            >
              <div className={style.navContent}>
                {/* Imagen del punto */}
                <img
                  className={style.puntosNav}
                  src={activeId === id ? puntoVerde : puntoGris}
                  alt="Punto"
                />
                <span>{text}</span>
              </div>
              {activeId === id && (
                <div className={style.barraSeleccionada}></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubNav;