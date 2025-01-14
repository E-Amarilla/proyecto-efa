"use client";
import { Button } from "@nextui-org/react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function BotonesDescarga() {
    const handlePdfDownload = async () => {
        const productSection = document.getElementById('ProductividadSection');
        const filtroSection = document.querySelector('.ocultar-en-pdf');

        if (productSection) {
            // Primero captura la sección de Productividad
            const canvasProduct = await html2canvas(productSection, {
                ignoreElements: (element) => element === filtroSection,
            });
            const imgDataProduct = canvasProduct.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgDataProduct);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgDataProduct, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resumen_productividad.pdf');
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", width: "100%" }}>
            <Button
                style={{
                    backgroundColor: "rgba(243, 18, 96, 0.3)",
                    border: "1px solid #F31260",
                    color: "#F31260",
                    width: "100%",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "17px",
                }}
                onClick={handlePdfDownload}
            >
                <FaFilePdf style={{ marginRight: "8px" }} />
                Descargar PDF
            </Button>

            <Button
                style={{
                    backgroundColor: "rgba(17, 171, 90, 0.3)",
                    border: "1px solid #11AB5A",
                    color: "#11AB5A",
                    width: "100%",
                    height: "50px",
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