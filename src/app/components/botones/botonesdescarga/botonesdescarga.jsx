'use client';
import { Button } from "@nextui-org/react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logoDataURL from './cremonabase64'; // Importa la data URL de la imagen
import FiltroPeriodo from "../../../components/filtroperiodo/FiltroPeriodo"

export default function BotonesDescarga({ startDate, endDate }) {
    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).access_token : null;

    const handlePdfDownload = async () => {
        const productSection = document.getElementById('ProductividadSection');
    
        if (productSection) {
            const canvasProduct = await html2canvas(productSection, {
                scale: 2,
                ignoreElements: (element) => element.classList && element.classList.contains('FiltroPeriodo'),
            });
    
            const imgDataProduct = canvasProduct.toDataURL('image/png');
    
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [120, 297]
            });
    
            const pdfWidth = 370; // mm
            const pdfHeight = 210; // mm
    
            pdf.addImage(logoDataURL, 'PNG', 10, 10, 40, 10);
    
            const imgProps = pdf.getImageProperties(imgDataProduct);
            let imgWidth = pdfWidth - 20;
            let imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    
            if (imgHeight > pdfHeight - 40) {
                imgHeight = pdfHeight - 40;
                imgWidth = (imgProps.width * imgHeight) / imgProps.height;
            }
    
            const x = (pdfWidth - imgWidth) / 2;
            const y = 30;
    
            pdf.addImage(imgDataProduct, 'PNG', x, y, imgWidth, imgHeight, undefined, 'FAST');
    
            pdf.save('resumen_productividad.pdf');
        }
    };
    

    const handleExcelDownload = async () => {
        try {
            const response = await fetch(
                `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/productividad/descargar-excel?fecha_inicio=${startDate}&fecha_fin=${endDate}`,
                {
                    method: "GET",
                    
                    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
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
