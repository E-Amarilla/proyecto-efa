"use client";

import { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import style from "./selectConfiguracion.module.css";
import BotonRefresh from '../../../components/botones/aplicarreset/botonreset2'

const SelectConfiguracion = ({ onChange, onClick}) => {
  const [recetas, setRecetas] = useState([]);
  const [selectedKey, setSelectedKey] = useState("loading"); // Iniciar con "loading"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecetas = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/configuraciones/lista-recetas`
        );

        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const data = await response.json();

        const recetasFormateadas = data.ListadoRecetas.map((receta) => ({
          key: receta.id.toString(),
          label: receta.codigoProducto,
        }));

        setRecetas(recetasFormateadas);
        setSelectedKey(recetasFormateadas.length > 0 ? recetasFormateadas[0].key : ""); // Seleccionar la primera receta
      } catch (error) {
        console.error("Error al obtener recetas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecetas();
  }, []);

  const handleSelectionChange = (keys) => {
    if (keys.size > 0) {
      const newValue = Array.from(keys)[0];
      setSelectedKey(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className={style.customSelect}>
      <Select
        isDisabled={loading}
        aria-label="Seleccionar receta"
        className="max-w"
        selectedKeys={[selectedKey]}
        onSelectionChange={handleSelectionChange}
        itemHeight={32.2}
        maxListboxHeight={310}
        isVirtualized
        style={{
          gap: "8px",
          backgroundColor: "#131313",
          color: "#D9D9D9",
          minHeight: "64px",
        }}
        popoverProps={{
          classNames: {
            base: "before:bg-default-200",
            content:
              "p-[10px] bg-[#131313] align-middle mb-[8px] shadow-lg shadow-white/20",
          },
        }}
        scrollShadowProps={{
          isEnabled: true,
        }}
        listboxProps={{
          itemClasses: {
            base: [
              "border-[2px]",
              "border-[#8c8c8c]",
              "border-opacity-[0.02]",
              "max-h-[690px]",
              "mb-[8px]",
              "rounded-md",
              "text-default-500",
              "p-1",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-default-100",
              "dark:data-[hover=true]:bg-default-50",
              "data-[selectable=true]:focus:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500",
            ],
          },
        }}
      >
        {loading ? (
          <SelectItem key="loading"> Obtaining recipes data...</SelectItem>
        ) : (
          recetas.map((receta) => (
            <SelectItem key={receta.key}>{receta.label}</SelectItem>
          ))
        )}
      </Select>
      <div className={style.Refresh}>
        <BotonRefresh onClick={onClick} />
      </div>
    </div>
  );
};

export default SelectConfiguracion;
