"use client";
import { Button } from "@nextui-org/react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logoDataURL from './cremonabase64'; // Importa la data URL de la imagen

export default function BotonesDescarga() {
    const handlePdfDownload = async () => {
        const productSection = document.getElementById('ProductividadSection');
        
        if (productSection) {
            const canvasProduct = await html2canvas(productSection, {
                scale: 2, // Aumenta la escala para mejorar la resolución
                ignoreElements: (element) => element.classList.contains('filtroPeriodo'),
            });
            const imgDataProduct = canvasProduct.toDataURL('image/png');
            
            // Crear un nuevo documento PDF
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            
            // Agregar logo usando la data URL
            const logoWidth = 100; // Ajusta el tamaño según sea necesario
            const logoHeight = 30;
            pdf.addImage(logoDataURL, 'PNG', 10, 10, logoWidth, logoHeight);

            // Posicionar el contenido capturado
            const imgProps = pdf.getImageProperties(imgDataProduct);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgDataProduct, 'PNG', 0, logoHeight + 20, pdfWidth, pdfHeight, undefined, 'FAST');

            // Agregar footer
            pdf.setFontSize(10);
            pdf.text("© 2025 Mi Empresa. Todos los derechos reservados.", pdfWidth / 2, pdf.internal.pageSize.getHeight() - 10, { align: "center" });

            // Guardar el PDF
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
