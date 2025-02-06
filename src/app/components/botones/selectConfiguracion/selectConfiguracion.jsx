import {Select, SelectItem} from "@heroui/react";
import style from './selectConfiguracion.module.css'

export const PetIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="2em"
      {...props}
    >
    </svg>
  );
};

export const animals = [
  {key: "1", label: "RECETA 1"},
  {key: "2", label: "RECETA 2"},
  {key: "3", label: "RECETA 3"},
  {key: "4", label: "RECETA 4"},
  {key: "5", label: "RECETA 5"},
  {key: "6", label: "RECETA 6"},
  {key: "7", label: "RECETA 7"},
  {key: "8", label: "RECETA 8"},
  {key: "9", label: "RECETA 9"},
  {key: "10", label: "RECETA 10"},
  {key: "11", label: "RECETA 11"},
  {key: "12", label: "RECETA 12"},
  {key: "13", label: "RECETA 13"},
  {key: "14", label: "RECETA 14"},
  {key: "15", label: "RECETA 15"},
  {key: "16", label: "RECETA 16"},
  {key: "17", label: "RECETA 17"},
  {key: "18", label: "RECETA 18"},
  {key: "19", label: "RECETA 19"},
  {key: "20", label: "RECETA 20"},
];

export default function App() {
  return (
    <div className={style.customSelect}>
      <Select
        className="max-w"
        defaultSelectedKeys={["1"]}
        placeholder="Eliga su receta"
        startContent={<PetIcon />}
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
            content: "p-[10px] border-small border-divider bg-[#131313] align-middle mb-[8px]",
          },
        }}
        scrollShadowProps={{
          isEnabled: true,
        }}
        listboxProps={{
          itemClasses: {
            base: [
              "border-[2px]", // Añadir borde de 1px
              "border-[#8c8c8c]", // Color del borde
              "border-opacity-[0.02]", // Opacidad del borde
              "max-h-[690px]",
              "mb-[8px]", // Ajusta el margen aquí para agregar espacio entre los items
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
      {animals.map((animal) => (
        <SelectItem key={animal.key}>{animal.label}</SelectItem>
      ))}
    </Select>
    </div>
  );
}
