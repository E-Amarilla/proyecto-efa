import { useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import style from "./selectConfiguracion.module.css";

export const recetas = [
  { key: "1", label: "RECETA 1" },
  { key: "2", label: "RECETA 2" },
  { key: "3", label: "RECETA 3" },
  { key: "4", label: "RECETA 4" },
  { key: "5", label: "RECETA 5" },
  { key: "6", label: "RECETA 6" },
  { key: "7", label: "RECETA 7" },
  { key: "8", label: "RECETA 8" },
  { key: "9", label: "RECETA 9" },
  { key: "10", label: "RECETA 10" },
  { key: "11", label: "RECETA 11" },
  { key: "12", label: "RECETA 12" },
  { key: "13", label: "RECETA 13" },
  { key: "14", label: "RECETA 14" },
  { key: "15", label: "RECETA 15" },
  { key: "16", label: "RECETA 16" },
  { key: "17", label: "RECETA 17" },
  { key: "18", label: "RECETA 18" },
  { key: "19", label: "RECETA 19" },
  { key: "20", label: "RECETA 20" },
];

const SelectConfiguracion = ({ onChange }) => {
  const [selectedKey, setSelectedKey] = useState("1");

  const handleSelectionChange = (keys) => {
    if (keys.size > 0) {
      const newValue = Array.from(keys)[0];
      setSelectedKey(newValue);
      onChange(newValue); // Enviar el valor a la página padre
    }
  };

  return (
    <div className={style.customSelect}>
      <Select
        aria-label="Seleccionar receta"
        className="max-w"
        selectedKeys={[selectedKey]}
        onSelectionChange={handleSelectionChange}
        itemHeight={32.2}
        maxListboxHeight={667}
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
              "p-[10px] border-small border-divider bg-[#131313] align-middle mb-[8px]",
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
        {recetas.map((receta) => (
          <SelectItem key={receta.key}>{receta.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectConfiguracion;
