"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import ResetIcon from "./IMG/RefreshIcon.jpg";

const BotonFiltro = ({ onClick }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Button
                style={{
                    backgroundColor: "rgba(0, 123, 255, 0.25)",
                    border: "2px solid #007BFF",
                    color: "#D9D9D9",
                    width: "100%",
                    height: "42px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "15px",
                    boxShadow: "0 2px 5px rgba(217, 217, 217, 0.1)",
                    marginTop: "10px",
                    fontWeight: "bold"
                }}
                onClick={onClick}
            >
                Refrescar datos
                <Image src={ResetIcon} alt="Buscar Icono" width={16} height={16} style={{ marginLeft: "5px" }} />
            </Button>
        </div>
    );
};

export default BotonFiltro;
