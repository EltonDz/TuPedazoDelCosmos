// ==================== VARIABLES GLOBALES ====================
// let selectedCertificate = null;
// let formData = {};
// let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
// let currentLanguage = localStorage.getItem('language') || 'es';

// ==================== METODOS ====================
import { appVariables } from "./variables.js";
import { mostrarPrimerosReg } from "./lista-recientes.js";
import { changeLanguage, applyTranslations } from "./traducciones.js";
import { openModal, closeModal, closeModalOutside } from "./modal.js"

// // ==================== TRADUCCIONES ====================

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("btn-es")
    .addEventListener("click", () => {
      changeLanguage("es");
    });
  
    document.getElementById("btn-en")
    .addEventListener("click", () => {
      changeLanguage("en");
    });

  document.getElementById("btn-pt")
    .addEventListener("click", () => {
      changeLanguage("pt");
    });

});

// ==================== FUNCIONES DE MODAL ====================

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("modal-inicio")
    .addEventListener("click", () => {
      openModal("inicio");
    });
  document.getElementById("modal-rastrear")
    .addEventListener("click", () => {
      openModal("rastrear");
    });
  document.getElementById("modal-faq")
    .addEventListener("click", () => {
      openModal("faq");
    });
  document.getElementById("modal-pedido")
    .addEventListener("click", () => {
      openModal("pedido");
    });
  document.getElementById("modal-contacto")
    .addEventListener("click", () => {
      openModal("contacto");
    });

  const mod = document.getElementById("modal");
  mod.addEventListener("click", (event) => {
    closeModalOutside(event);
  });

  document.getElementById("modal-cls")
    .addEventListener("click", () => {
      closeModal();
    })
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ==================== VALIDAR FORMULARIO Y MOSTRAR CERTIFICADOS ====================
function validarYMostrarCertificados() {
  const form = document.getElementById('registroForm');
  const nombre = form.nombre.value.trim();
  const objeto = form.objeto.value.trim();
  const ra1 = form.ra1.value.trim();
  const ra2 = form.ra2.value.trim();
  const ra3 = form.ra3.value.trim();
  // const ra = form.ra.value.trim();
  const dec1 = form.dec1.value.trim();
  const dec2 = form.dec2.value.trim();
  const dec3 = form.dec3.value.trim();
  // const dec = form.dec.value.trim();
  const nuevoNombre = form.nuevoNombre.value.trim();
  const magnitud = form.magnitud.value.trim() || 'N/A';
  const messageDiv = document.getElementById("formMessage");
  
  const inputs = document.querySelectorAll("#registroForm input");
  let hasError = false;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add("input-error");
      hasError = true;
    } else {
      input.classList.remove("input-error");
    }
  });
  
  if (hasError) {
  // if (!nombre || !objeto || !ra1 || !ra2 || !ra3 || !dec1 || !dec2 || !dec3 || !nuevoNombre) {
    // alert(translations[currentLanguage].error_campos);
    let messageTimer;
    clearTimeout(messageTimer);

    messageDiv.textContent = translations[appVariables.currentLanguage].error_campos;
    messageDiv.classList.remove("hidden");

    messageTimer = setTimeout(() => {
      messageDiv.classList.add("hidden");
    }, 3000);
    
    return;
  }

  messageDiv.textContent = "";

  const ra = `${ra1}h ${ra2}m ${ra3}s`
  const dec = `${dec1}º ${dec2}' ${dec3}"`
  
  appVariables.formData = { nombre, objeto, ra, dec, nuevoNombre, magnitud };
  mostrarSeleccionCertificados();
}

function mostrarSeleccionCertificados() {
  const t = translations[appVariables.currentLanguage];
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');

  appVariables.selectedCertificate = null;
  
  modalBody.innerHTML = `
    <h2 class="modal-title"><i class="fas fa-certificate mr-2"></i>${t.cert_titulo}</h2>
    
    <div class="process-steps">
      <div class="step completed"><span class="step-number">✓</span> Datos</div>
      <div class="step active"><span class="step-number">2</span> Certificado</div>
      <div class="step"><span class="step-number">3</span> Pago</div>
      <div class="step"><span class="step-number">4</span> Descarga</div>
    </div>
    
    <p class="text-gray-300 mb-4">${t.cert_descripcion}</p>
  
    <div class="certificate-grid">
      ${[1,2,3,4].map(i => `
        <div class="certificate-option" onclick="seleccionarCertificado(${i})" id="cert-${i}">
          <img src="assets/imgs/cert-${i}.png" alt="Certificado ${i}">
          <div class="certificate-label">Estilo ${i}</div>
          <div class="certificate-check"><i class="fas fa-check"></i></div>
        </div>
      `).join('')}
    </div>
    
    <div class="flex justify-between mt-6">
      <button class="nasa-btn" onclick="closeModal()">
        <i class="fas fa-arrow-left mr-2"></i>Volver
      </button>
      <button class="nasa-btn" onclick="continuarAlPago()">
        Continuar al Pago<i class="fas fa-arrow-right ml-2"></i>
      </button>
    </div>

    <div id="messNotSelected" class="text-red-400 mt-4 p-4 rounded-lg hidden" style="background:rgba(239, 68, 68, 0.2)"></div>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function seleccionarCertificado(num) {
  document.querySelectorAll('.certificate-option').forEach(el => el.classList.remove('selected'));
  document.getElementById(`cert-${num}`).classList.add('selected');
  appVariables.selectedCertificate = num;
  console.log('Certificado seleccionado:', num);
}

function continuarAlPago() {
  if (!appVariables.selectedCertificate) {
    // alert(translations[currentLanguage].error_certificado);
    document.getElementById("messNotSelected").classList.remove("hidden")
    document.getElementById("messNotSelected").textContent = translations[appVariables.currentLanguage].error_certificado;

    let messageTimer;
    clearTimeout(messageTimer);

    messageTimer = setTimeout(() => {
      messageDiv.classList.add("hidden");
    }, 3000);
    return;
  }
  mostrarPanelPago();
}

function mostrarPanelPago() {
  const t = translations[appVariables.currentLanguage];
  const modalBody = document.getElementById('modal-body');
  /*
  modalBody.innerHTML = `
    <h2 class="modal-title"><i class="fas fa-credit-card mr-2"></i>${t.pago_titulo}</h2>
    
    <div class="process-steps">
      <div class="step completed"><span class="step-number">✓</span> Datos</div>
      <div class="step completed"><span class="step-number">✓</span> Certificado</div>
      <div class="step active"><span class="step-number">3</span> Pago</div>
      <div class="step"><span class="step-number">4</span> Descarga</div>
    </div>
    
    <div class="nasa-card p-4 mb-6">
      <h3 class="text-lg font-semibold mb-3 text-blue-300">Resumen de tu pedido:</h3>
      <div class="resumen-item">
        <span>Estrella:</span>
        <span class="text-yellow-300">"${appVariables.formData.nuevoNombre}"</span>
      </div>
      <div class="resumen-item">
        <span>Objeto original:</span>
        <span>${appVariables.formData.objeto}</span>
      </div>
      <div class="resumen-item">
        <span>Coordenadas:</span>
        <span>RA: ${appVariables.formData.ra} | Dec: ${appVariables.formData.dec}</span>
      </div>
      <div class="resumen-item">
        <span>Certificado:</span>
        <span>Estilo ${appVariables.selectedCertificate}</span>
      </div>
      <div class="resumen-total">
        <span>Total:</span>
        <span>$12.00 USD</span>
      </div>
    </div>
    
    <div id="paypal-button-container-modal"></div>
    
    <div class="text-center mt-4">
      <button class="text-gray-400 hover:text-white" onclick="mostrarSeleccionCertificados()">
        <i class="fas fa-arrow-left mr-2"></i>Volver a elegir certificado
      </button>
    </div>
  `;
  
  // Inicializar PayPal en el modal
  setTimeout(() => {
    paypal.Buttons({
      style: { shape: 'rect', color: 'blue', layout: 'vertical', label: 'pay' },
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            description: "Certificado Estelar - " + appVariables.formData.nuevoNombre,
            amount: { currency_code: "USD", value: 12 }
          }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(orderData) {
          procesarCompraExitosa();
        });
      },
      onError: function(err) {
        console.error("Error en pago:", err);
        alert("Hubo un error con el pago. Intenta de nuevo.");
      }
    }).render('#paypal-button-container-modal');
  }, 100);*/
  procesarCompraExitosa();
}

function procesarCompraExitosa() {
  const t = translations[appVariables.currentLanguage];
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
  const t = translations[appVariables.currentLanguage];
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
      <button class="download-btn" onclick="generarYDescargarCertificado()">
        <i class="fas fa-download"></i>
        ${t.descarga_btn}
      </button>
      <p class="mt-6 text-gray-400">¡Gracias por tu compra!</p>
    </div>
  `;
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

// // ==================== FUNCIONES AUXILIARES ====================
// function rastrearPedido() {
//   const input = document.getElementById('trackingInput');
//   //const result = document.getElementById('trackingResult');
//   const searchId = input.value.trim().toUpperCase();
  
//   fetch(`${"https://script.google.com/macros/s/AKfycbxIrdP_fXuSI2iJlBLTRlYPB1sBnhbf7zwv45lQVmaMGaWsbwVgyB828rrcv4nVT_x5QQ/exec"}?id=${searchId}`)
//     .then(res => res.json())
//     .then(data => {
//       regenCertificado(data, searchId);
//     })
//     .catch(console.error);
// }

// // let cliente_actual = null;

// function regenCertificado(data, sid) {
//   const result = document.getElementById('trackingResult');
//   const pdfButton = document.getElementById("pdfButton");
  
//   pdfButton.style.display = "none";

//   if (!sid) {
//     result.innerHTML = '<p class="text-yellow-400">Ingresa un número de serie.</p>';
//     result.classList.remove('hidden');
//     result.style.background = 'rgba(234, 179, 8, 0.2)';
//     return;
//   }

//   if (data.length) {
//     cliente_actual = data[0];
//     result.innerHTML = `
//       <div class="text-green-400 mb-2"><i class="fas fa-check-circle mr-2"></i>¡Encontrado!</div>
//       <p><strong>Cliente:</strong> ${cliente_actual.nombre}</p>
//       <p><strong>Objeto:</strong> ${cliente_actual.objeto}</p>
//       <p><strong>Estrella:</strong> ${cliente_actual.nuevo_nombre}</p>
//       <p><strong>Fecha:</strong> ${cliente_actual.fecha}</p>
//     `;
//     pdfButton.style.display = "inline-block";
//     result.style.background = 'rgba(34, 197, 94, 0.2)';
//   } else {
//     result.innerHTML = '<p class="text-red-400">No se encontró ese registro.</p>';
//     cliente_actual = null;
//     pdfButton.style.display = "none";
//     result.style.background = 'rgba(239, 68, 68, 0.2)';
//   }
//   result.classList.remove('hidden');
// }

// async function regenerarPDF() {
//   try {
//     const { PDFDocument, rgb, StandardFonts } = PDFLib;
    
//     // Cargar el PDF de plantilla
//     const pdfUrl = `assets/certificados/CERTIFICADO-${cliente_actual.tipo}.pdf`;
//     let pdfDoc;
    
//     try {
//       const existingPdfBytes = await fetch(pdfUrl).then(res => {
//         if (!res.ok) throw new Error('PDF no encontrado');
//         return res.arrayBuffer();
//       });
//       pdfDoc = await PDFDocument.load(existingPdfBytes);
//     } catch (e) {
//       console.log('No se puede crear certificado.');
//     }
    
//     const pages = pdfDoc.getPages();
//     const page = pages[0];
//     const { width, height } = page.getSize();
    
//     const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//     const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
//     // Coordenadas basadas en la imagen del certificado que proporcionaste
//     // Ajustadas para un PDF de aproximadamente 842x595 (A4 horizontal)
    
//     const blackColor = rgb(0.1, 0.2, 0.3);
    
//     // Nombre de la estrella (después de "Este certificado comprueba que la estrella")
//     // Posición aproximada: centrado, línea debajo del texto introductorio
//     page.drawText(cliente_actual.objeto, {
//       x: 350,
//       y: height - 235,
//       size: 16,
//       font: fontBold,
//       color: blackColor,
//     });
    
//     // Coordenadas (después de "con las siguientes coordenadas")
//     const coordenadas = `RA: ${cliente_actual.ra}  |  Dec: ${cliente_actual.dec}`;
//     page.drawText(coordenadas, {
//       x: 378,
//       y: height - 290,
//       size: 12,
//       font: font,
//       color: blackColor,
//     });
    
//     // Magnitud (después de "y magnitud aparente")
//     page.drawText(`${cliente_actual.mag}` || 'N/A', {
//       x: 355,
//       y: height - 346,
//       size: 12,
//       font: font,
//       color: blackColor,
//     });
    
//     // Nuevo nombre / renombrada como (después de "ha sido renombrada como")
//     page.drawText(`"${cliente_actual.nuevo_nombre}"`, {
//       x: 500,
//       y: height - 407,
//       size: 18,
//       font: fontBold,
//       color: blackColor,
//     });
    
//     // Fecha (parte inferior izquierda)
//     let fecha = new Date(cliente_actual.fecha);

//     fecha = fecha.toLocaleDateString("es-ES", {
//       day: "numeric",
//       month: "long",
//       year: "numeric"
//     });

//     page.drawText(fecha, {
//       x: 350,
//       y: height - 500,
//       size: 11,
//       font: font,
//       color: blackColor,
//     });
    
//     // Clave de registro (parte inferior derecha)
//     page.drawText(cliente_actual.id, {
//       x: 635,
//       y: height - 500,
//       size: 11,
//       font: font,
//       color: blackColor,
//     });
    
//     // Descargar
//     const pdfBytes = await pdfDoc.save();
//     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//     const url = URL.createObjectURL(blob);

//     window.open(url, "_blank");
//   } catch (error) {
//     console.error('Error generando PDF:', error);
//     alert('Error al generar el certificado. Intentando método alternativo...');
//     generarCertificadoAlternativo();
//   }
// }

function cargarListaPedidos() {
  const container = document.getElementById('pedidosList');
  if (!container) return;
  
  if (appVariables.clientes.length === 0) {
    container.innerHTML = '<p class="text-gray-400">No hay pedidos registrados.</p>';
    return;
  }
  
  container.innerHTML = appVariables.clientes.map(c => `
    <div class="nasa-card p-3 rounded-lg">
      <p class="text-blue-300 font-semibold">${c.nuevoNombre}</p>
      <p class="text-sm text-gray-400">Por: ${c.nombre} | ${c.fecha}</p>
      <p class="text-xs text-gray-500">ID: ${c.id}</p>
    </div>
  `).join('');
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', function() {
  console.log('Página cargada');
  applyTranslations();
  // actualizarListaClientes();
  mostrarPrimerosReg();
});
