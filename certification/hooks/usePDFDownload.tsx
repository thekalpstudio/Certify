import { useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const usePDFDownload = () => {
  const downloadPDF = useCallback(
    async (elementId: string, filename: string = "certificate.pdf") => {
      try {
        const element = document.getElementById(elementId);
        if (!element) {
          console.error("Element not found");
          return;
        }

        // Create canvas from the element
        const canvas = await html2canvas(element, {
          scale: 2, // Higher quality
          useCORS: true, // Allow cross-origin images
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
        });

        const imgData = canvas.toDataURL("image/png");

        // Get canvas dimensions in pixels
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Convert pixels to mm (assuming 96 DPI)
        const pixelToMm = 25.4 / 96;
        const pdfWidth = canvasWidth * pixelToMm;
        const pdfHeight = canvasHeight * pixelToMm;

        // Create PDF with exact canvas dimensions
        const pdf = new jsPDF({
          orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
          unit: "mm",
          format: [pdfWidth, pdfHeight],
        });

        // Add image to PDF - exact 1:1 mapping
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        // Save the PDF
        pdf.save(filename);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    },
    []
  );

  return { downloadPDF };
};

export default usePDFDownload;
