
import { appVariables } from './variables.js'
import { closeModal } from './modal.js'

// ==================== PROCESAR COMPRA Y GENERAR CERTIFICADO ====================
export function procesarCompraExitosa() {
  const t = appVariables.translations[appVariables.currentLanguage];
  const fechaActual = new Date().toISOString();
  let fechaCert = new Date();
  const serieID = `COSMOS-${Date.now().toString(36).toUpperCase()}`;
  
  fechaCert = fechaCert.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric"
  });
  
  // Guardar cliente
  appVariables.clientes.push({
    nombre: appVariables.formData.nombre,
    nuevoNombre: appVariables.formData.nuevoNombre,
    objeto: appVariables.formData.objeto,
    ra: appVariables.formData.ra,
    dec: appVariables.formData.dec,
    magnitud: appVariables.formData.magnitud,
    fecha: fechaActual,
    id: serieID,
    certificado: appVariables.selectedCertificate
  });
  localStorage.setItem("clientes", JSON.stringify(appVariables.clientes));
  // actualizarListaClientes();
  
  // Guardar datos para descarga
  appVariables.formData.fecha = fechaCert;
  appVariables.formData.serieID = serieID;

  const data = new URLSearchParams({
    id: serieID,
    nombre: appVariables.formData.nombre,
    objeto: appVariables.formData.objeto,
    nuevo_nombre: appVariables.formData.nuevoNombre,
    ra: appVariables.formData.ra,
    dec: "'"+appVariables.formData.dec,
    mag: appVariables.formData.magnitud,
    fecha: fechaActual,
    tipo: appVariables.selectedCertificate
  });

  fetch("https://script.google.com/macros/s/AKfycbxIrdP_fXuSI2iJlBLTRlYPB1sBnhbf7zwv45lQVmaMGaWsbwVgyB828rrcv4nVT_x5QQ/exec", {
    method: "POST",
    body: data
  })
  .then(res => res.text())
  .then(result => {
    console.log("Saved:", result);
  })  
  .catch(err => console.error(err));
  
  mostrarPanelDescarga();
}

function mostrarPanelDescarga() {
  const t = appVariables.translations[appVariables.currentLanguage];
  const modalBody = document.getElementById('modal-body');
  
  modalBody.innerHTML = `
    <div class="process-steps">
      <div class="step completed"><span class="step-number">✓</span> Datos</div>
      <div class="step completed"><span class="step-number">✓</span> Certificado</div>
      <div class="step completed"><span class="step-number">✓</span> Pago</div>
      <div class="step active"><span class="step-number">4</span> Descarga</div>
    </div>
    
    <div class="download-panel">
      <div class="download-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <h2 class="text-2xl font-bold text-green-400 mb-4">${t.descarga_titulo}</h2>
      <p class="text-gray-300 mb-6">
        ¡Pago confirmado! Tu certificado personalizado está listo.<br>
        <span class="text-yellow-300">ID: ${appVariables.formData.serieID}</span>
      </p>
      <button class="download-btn" id="descargarCert">
        <i class="fas fa-download"></i>
        ${t.descarga_btn}
      </button>
      <p class="mt-6 text-gray-400">¡Gracias por tu compra!</p>
    </div>
  `;
  document.getElementById("descargarCert")
          .addEventListener("click", () => {
            generarYDescargarCertificado();
    });
}

// ==================== GENERAR CERTIFICADO PDF ====================
async function generarYDescargarCertificado() {
  try {
    const { PDFDocument, rgb, StandardFonts } = PDFLib;
    
    // Cargar el PDF de plantilla
    const pdfUrl = `assets/certificados/CERTIFICADO-${appVariables.selectedCertificate}.pdf`;
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
    
    const goldColor = rgb(0.85, 0.65, 0.13);
    const whiteColor = rgb(1, 1, 1);
    const cyanColor = rgb(0, 0.83, 1);
    const blackColor = rgb(0.1, 0.2, 0.3);
    
    // Nombre de la estrella (después de "Este certificado comprueba que la estrella")
    // Posición aproximada: centrado, línea debajo del texto introductorio
    page.drawText(appVariables.formData.objeto, {
      x: 428,
      y: height - 235,
      size: 16,
      font: fontBold,
      color: blackColor,
    });
    
    // Coordenadas (después de "con las siguientes coordenadas")
    const coordenadas = `RA: ${appVariables.formData.ra}  |  Dec: ${appVariables.formData.dec}`;
    page.drawText(coordenadas, {
      x: 360,
      y: height - 289,
      size: 12,
      font: fontBold,
      color: blackColor,
    });
    
    // Magnitud (después de "y magnitud aparente")
    page.drawText(appVariables.formData.magnitud || 'N/A', {
      x: 372,
      y: height - 342,
      size: 12,
      font: fontBold,
      color: blackColor,
    });
    
    // Nuevo nombre / renombrada como (después de "ha sido renombrada como")
    page.drawText(`${appVariables.formData.nuevoNombre}`, {
      x: 490,
      y: height - 406,
      size: 18,
      font: fontBold,
      color: blackColor,
    });
    
    // Fecha (parte inferior izquierda)
    page.drawText(appVariables.formData.fecha, {
      x: 355,
      y: height - 496,
      size: 11,
      font: fontBold,
      color: blackColor,
    });
    
    // Clave de registro (parte inferior derecha)
    page.drawText(appVariables.formData.serieID, {
      x: 628,
      y: height - 496,
      size: 11,
      font: fontBold,
      color: blackColor,
    });
    
    
    // Descargar
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificado_${appVariables.formData.nuevoNombre.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Limpiar formulario
    document.getElementById('registroForm').reset();
    appVariables.selectedCertificate = null;
    appVariables.formData = {};

    closeModal();
    
  } catch (error) {
    console.error('Error generando PDF:', error);
    alert('Error al generar el certificado. Intentando método alternativo...');
    generarCertificadoAlternativo();
  }
}

function generarCertificadoAlternativo() {
  // Método alternativo: abrir ventana con datos
  const contenido = `
    CERTIFICADO DE ADQUISICIÓN ESTELAR
    =====================================
    
    Este certificado comprueba que la estrella:
    ${appVariables.formData.objeto}
    
    Con coordenadas:
    RA: ${appVariables.formData.ra}
    Dec: ${appVariables.formData.dec}
    
    Magnitud aparente: ${appVariables.formData.magnitud}
    
    Ha sido renombrada como:
    "${appVariables.formData.nuevoNombre}"
    
    Fecha: ${appVariables.formData.fecha}
    Clave de registro: ${appVariables.formData.serieID}
    
    TuPedazoDeCosmos.com
  `;
  
  const win = window.open('', '_blank');
  win.document.write(`<pre style="font-family: monospace; padding: 40px;">${contenido}</pre>`);
  win.print();
}