"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import BuscarIcon from "./IMG/SearchIcon.png";

const BotonFiltro = ({ onClick, isDisabled}) => {
    return (
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Button
                style={{
                    backgroundColor: "#1F1F1F",
                    border: "2px solid #555555",
                    color: "#8c8c8c",
                    width: "100%",
                    height: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "15px",
                    boxShadow: "0 2px 5px rgba(217, 217, 217, 0.1)",
                }}
                onClick={onClick}
                isDisabled={isDisabled}
            >
                Apply Changes
                <Image src={BuscarIcon} alt="Buscar Icono" width={20} height={20} style={{ marginLeft: "5px" }} />
            </Button>
        </div>
    );
}

export default BotonFiltro;