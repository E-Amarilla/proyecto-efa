'use client';
import { Button } from "@nextui-org/react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logoDataURL from './cremonabase64'; // Importa la data URL de la imagen

export default function BotonesDescarga({ startDate, endDate }) {
    const handlePdfDownload = async () => {
        const graphSection = document.getElementById('GraficosSection');
        
        if (graphSection) {
            const canvasProduct = await html2canvas(graphSection, {
                scale: 2, // Aumenta la escala para mejorar la resolución
                ignoreElements: (element) => element.classList.contains('FiltroPeriodoGraficos'),
            });
            const imgDataProduct = canvasProduct.toDataURL('image/png');
            
            // Crear un nuevo documento PDF
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            
            // Agregar logo usando la data URL
            const logoWidth = 60; // Ajusta el tamaño según sea necesario
            const logoHeight = 15;
            pdf.addImage(logoDataURL, 'PNG', 120, 5, logoWidth, logoHeight);

            // Posicionar el contenido capturado y moverlo 20 píxeles hacia arriba en el eje y
            const imgProps = pdf.getImageProperties(imgDataProduct);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            const yOffset = -10; // Ajusta la posición en el eje y
            pdf.addImage(imgDataProduct, 'PNG', 0, logoHeight + 20 + yOffset, pdfWidth, pdfHeight, undefined, 'FAST');

            // Guardar el PDF
            pdf.save('graficos.pdf');
        }
    };

    const handleExcelDownload = async () => {
        try {
            const response = await fetch(
                `http://192.168.0.150:8000/graficos-historico/descargar-excel?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
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
