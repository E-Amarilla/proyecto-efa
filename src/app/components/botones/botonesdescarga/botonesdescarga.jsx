"use client";
import { Button } from "@nextui-org/react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";

export default function BotonesDescarga() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", width:"100%" }}>
        {/* Botón PDF */}
        <Button
        style={{
            backgroundColor: "rgba(243, 18, 96, 0.3)",
            border: "1px solid #F31260",
            color: "#F31260",
            width: "100%",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "17px",
        }}
        >
        <FaFilePdf style={{ marginRight: "8px" }} />
        Descargar PDF
        </Button>

        {/* Botón Excel */}
        <Button
        style={{
            backgroundColor: "rgba(17, 171, 90, 0.3)",
            border: "1px solid #11AB5A",
            color: "#11AB5A",
            width: "100%",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "17px",
        }}
        >
        <FaFileExcel style={{ marginRight: "8px" }} />
            Descargar EXCEL
        </Button>
    </div>
    );
}
