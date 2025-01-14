"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import BuscarIcon from "./IMG/SearchIcon.png";

const BotonFiltro = ({ onClick }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Button
                style={{
                    backgroundColor: "#1F1F1F",
                    border: "1px solid #131313",
                    color: "#8c8c8c",
                    width: "100%",
                    height: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "15px",
                }}
                onClick={onClick}
            >
                Aplicar filtro
                <Image src={BuscarIcon} alt="Buscar Icono" width={20} height={20} style={{ marginLeft: "8px" }} />
            </Button>
        </div>
    );
};

export default BotonFiltro;
