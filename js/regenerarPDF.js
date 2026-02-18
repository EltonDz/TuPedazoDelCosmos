import { appVariables } from "./variables.js";
import { applyTranslations } from "./traducciones.js"

// ==================== FUNCIONES AUXILIARES ====================
export function rastrearPedido() {
  const input = document.getElementById('trackingInput');
  const searchId = input.value.trim().toUpperCase();
  
  fetch(`${"https://script.google.com/macros/s/AKfycbxIrdP_fXuSI2iJlBLTRlYPB1sBnhbf7zwv45lQVmaMGaWsbwVgyB828rrcv4nVT_x5QQ/exec"}?id=${searchId}`)
    .then(res => res.json())
    .then(data => {
      regenCertificado(data, searchId);
    })
    .catch(console.error);
}

function regenCertificado(data, sid) {
  const result = document.getElementById('trackingResult');
  const pdfButton = document.getElementById("pdfButton");
  
  pdfButton.style.display = "none";

  if (!sid) {
    result.innerHTML = '<p class="text-yellow-400" data-translate="rastrear_amarillo">Ingresa un número de serie.</p>';
    result.classList.remove('hidden');
    result.style.background = 'rgba(234, 179, 8, 0.2)';
    applyTranslations();
    return;
  }

  if (data.length) {
    appVariables.cliente_actual = data[0];
    result.innerHTML = `
      <div class="text-green-400 mb-2"><i class="fas fa-check-circle mr-2"></i><span data-translate="rastrear_encontrado">¡Encontrado!</span></div>
      <p><strong><span data-translate="rastrear_cliente_enc">Cliente</span>:</strong> ${appVariables.cliente_actual.nombre}</p>
      <p><strong><span data-translate="rastrear_objeto_enc">Objeto</span>:</strong> ${appVariables.cliente_actual.objeto}</p>
      <p><strong><span data-translate="rastrear_estrella_enc">Estrella</span>:</strong> ${appVariables.cliente_actual.nuevo_nombre}</p>
      <p><strong><span data-translate="rastrear_fecha_enc">Fecha</span>:</strong> ${appVariables.cliente_actual.fecha}</p>
    `;
    pdfButton.style.display = "inline-block";
    result.style.background = 'rgba(34, 197, 94, 0.2)';
  } else {
    result.innerHTML = '<p class="text-red-400" data-translate="rastrear_no_encontrado">No se encontró ese registro.</p>';
    appVariables.cliente_actual = null;
    pdfButton.style.display = "none";
    result.style.background = 'rgba(239, 68, 68, 0.2)';
  }
  result.classList.remove('hidden');
  applyTranslations();
}

export async function regenerarPDF() {
  try {
    const { PDFDocument, rgb, StandardFonts } = PDFLib;
    
    // Cargar el PDF de plantilla
    const pdfUrl = `assets/certificados/CERTIFICADO-${appVariables.cliente_actual.tipo}.pdf`;
    let pdfDoc;
    
    try {
      const existingPdfBytes = await fetch(pdfUrl).then(res => {
        if (!res.ok) throw new Error('PDF no encontrado');
        return res.arrayBuffer();
      });
      pdfDoc = await PDFDocument.load(existingPdfBytes);
    } catch (e) {
      console.log('No se puede crear certificado.');
    }
    
    const pages = pdfDoc.getPages();
    const page = pages[0];
    const { width, height } = page.getSize();
    
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Coordenadas basadas en la imagen del certificado que proporcionaste
    // Ajustadas para un PDF de aproximadamente 842x595 (A4 horizontal)
    
    const blackColor = rgb(0.1, 0.2, 0.3);
    
    // Nombre de la estrella (después de "Este certificado comprueba que la estrella")
    // Posición aproximada: centrado, línea debajo del texto introductorio
    page.drawText(appVariables.cliente_actual.objeto, {
      x: 350,
      y: height - 235,
      size: 16,
      font: fontBold,
      color: blackColor,
    });
    
    // Coordenadas (después de "con las siguientes coordenadas")
    const coordenadas = `RA: ${appVariables.cliente_actual.ra}  |  Dec: ${appVariables.cliente_actual.dec}`;
    page.drawText(coordenadas, {
      x: 378,
      y: height - 290,
      size: 12,
      font: font,
      color: blackColor,
    });
    
    // Magnitud (después de "y magnitud aparente")
    page.drawText(`${appVariables.cliente_actual.mag}` || 'N/A', {
      x: 355,
      y: height - 346,
      size: 12,
      font: font,
      color: blackColor,
    });
    
    // Nuevo nombre / renombrada como (después de "ha sido renombrada como")
    page.drawText(`${appVariables.cliente_actual.nuevo_nombre}`, {
      x: 500,
      y: height - 407,
      size: 18,
      font: fontBold,
      color: blackColor,
    });
    
    // Fecha (parte inferior izquierda)
    let fecha = new Date(appVariables.cliente_actual.fecha);

    fecha = fecha.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    page.drawText(fecha, {
      x: 350,
      y: height - 500,
      size: 11,
      font: font,
      color: blackColor,
    });
    
    // Clave de registro (parte inferior derecha)
    page.drawText(appVariables.cliente_actual.id, {
      x: 635,
      y: height - 500,
      size: 11,
      font: font,
      color: blackColor,
    });
    
    // Descargar
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");
  } catch (error) {
    console.error('Error generando PDF:', error);
    alert('Error al generar el certificado. Intentando método alternativo...');
    generarCertificadoAlternativo();
  }
}