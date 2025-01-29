'use client';
import { Button } from "@nextui-org/react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logoDataURL from './cremonabase64'; // Importa la data URL de la imagen
import telIcon from './telbase64'; // Importa la data URL de la imagen
import webIcon from './webbase64'; // Importa la data URL de la imagen
import mailIcon from './mailbase64'; // Importa la data URL de la imagen

export default function BotonesDescarga({ startDate, endDate }) {
    const handlePdfDownload = async () => {
        const graphSection = document.getElementById('GraficosSection');

        if (graphSection) {
            const canvasProduct = await html2canvas(graphSection, {
                scale: 2,
                ignoreElements: (element) => element.classList && element.classList.contains('FiltroPeriodoGraficos'),
            });
            const imgDataProduct = canvasProduct.toDataURL('image/png');

            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [184, 297]
            });
    
            const imgProps = pdf.getImageProperties(imgDataProduct);
            const pdfWidth = 287;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgDataProduct, 'PNG', 5, 5, pdfWidth, pdfHeight, undefined, 'FAST');
    
            const logoWidth = 40;
            const logoHeight = 10;
            pdf.addImage(logoDataURL, 'PNG', 245, 20, logoWidth, logoHeight);
            
            // Añadir texto "EFA - Proyecto" debajo del logo
            pdf.setFontSize(12);
            pdf.text("EFA - Proyecto", 252, 37);
            pdf.text("Celda de desmoldeo", 247, 42);
            

            pdf.addImage(webIcon, 'PNG', 240, 65, 5, 5); // Icono de ubicación de 10x10 px
            pdf.text("creminox.com", 247, 69); // Texto al lado del icono

            pdf.addImage(telIcon, 'PNG', 240, 71, 5, 5); // Icono de teléfono de 10x10 px
            pdf.text("+54 11 4918-3944", 247, 75); // Texto al lado del icono

            pdf.addImage(mailIcon, 'PNG', 240, 77, 5, 5); // Icono de teléfono de 10x10 px
            pdf.text("soporte@creminox.com", 247, 81); // Texto al lado del icono
    
            pdf.save('graficos.pdf');
        }
    };

    const handleExcelDownload = async () => {
        try {
            const response = await fetch(
                `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/graficos-historico/descargar-excel?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
                {
                    method: "GET",
                    headers: { Accept: "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`Error en la descarga: ${response.statusText}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `productividad_${startDate}_to_${endDate}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el archivo:", error);
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
                onClick={handleExcelDownload}
            >
                <FaFileExcel style={{ marginRight: "8px" }} />
                Descargar EXCEL
            </Button>
        </div>
    );
}
