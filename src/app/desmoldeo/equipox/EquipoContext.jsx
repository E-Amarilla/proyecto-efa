// EquipoContext.jsx
"use client";

import React, { createContext, useContext, useState } from "react";

const EquipoContext = createContext();

export const EquipoProvider = ({ children }) => {
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);

  return (
    <EquipoContext.Provider value={{ equipoSeleccionado, setEquipoSeleccionado }}>
      {children}
    </EquipoContext.Provider>
  );
};

export const useEquipo = () => useContext(EquipoContext);
