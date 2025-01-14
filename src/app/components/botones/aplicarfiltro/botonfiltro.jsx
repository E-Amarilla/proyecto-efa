"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import BuscarIcon from "./IMG/SearchIcon.png";

export default function BotonFiltro() {
    return (
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            {/* Botón PDF */}
            <Button
                style={{
                    backgroundColor: "#1F1F1F",
                    border: "1px solid #131313",
                    color: "#8c8c8c",
                    width: "100%",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "15px",
                    paddingLeft: "10px",
                    paddingRight: "10px"
                }}
            >
                <span>Aplicar filtro</span>
                <Image src={BuscarIcon} alt="Buscar Icono" width={20} height={20} />
            </Button>
        </div>
    );
}
