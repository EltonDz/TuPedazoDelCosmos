
// ==================== VARIABLES GLOBALES ====================
let selectedCertificate = null;
let formData = {};
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let currentLanguage = localStorage.getItem('language') || 'es';

// ==================== TRADUCCIONES ====================
const translations = {
  es: {
    tagline: "Explora el cielo, elige tu objeto astronómico y hazlo tuyo.",
    nav_inicio: "Inicio",
    nav_rastrear: "Rastrear",
    nav_faq: "FAQ",
    nav_pedido: "Pedido",
    nav_contacto: "Contacto",
    nav_idioma: "Idioma",
    instrucciones_titulo: "¿Cómo seleccionar tu estrella?",
    instruccion_1: "Navega por el cielo estelar con el visor interactivo.",
    instruccion_2: "Haz clic sobre el objeto que te interese.",
    instruccion_3: "En la esquina superior izquierda verás el nombre del objeto, su RA y Dec.",
    instruccion_4: "Copia esos datos manualmente en el formulario de abajo.",
    form_titulo: "Registra tu Estrella",
    clientes_titulo: "Clientes que han adquirido su astro:",
    footer_derechos: "Todos los derechos reservados",
    modal_inicio_titulo: "Bienvenido a TuPedazoDeCosmos.com",
    modal_inicio_contenido: `
      <p class="mb-4">¡Bienvenido a la experiencia más única del universo!</p>
      <p class="mb-4">En <strong>TuPedazoDeCosmos.com</strong> te ofrecemos la oportunidad de adoptar simbólicamente una estrella.</p>
      <h4 class="text-blue-300 font-semibold mt-6 mb-2">¿Qué incluye tu compra?</h4>
      <ul class="list-disc pl-5 space-y-2">
        <li>Certificado digital personalizado en PDF</li>
        <li>Coordenadas exactas de tu objeto celeste</li>
        <li>Nombre personalizado para tu estrella</li>
        <li>Registro permanente en nuestra base de datos</li>
        <li>Número de serie único e irrepetible</li>
      </ul>
    `,
    modal_rastrear_titulo: "Rastrear tu Pedido",
    modal_faq_titulo: "Preguntas Frecuentes",
    modal_pedido_titulo: "Estado de tu Pedido",
    modal_contacto_titulo: "Contáctanos",
    cert_titulo: "Elige tu Estilo de Certificado",
    cert_descripcion: "Selecciona el diseño que más te guste:",
    pago_titulo: "Procesar Pago",
    descarga_titulo: "¡Tu Certificado está Listo!",
    descarga_btn: "Descargar Certificado",
    error_campos: "Por favor, completa todos los campos requeridos",
    error_certificado: "Por favor, selecciona un certificado primero"
  },
  en: {
    tagline: "Explore the sky, choose your astronomical object and make it yours.",
    nav_inicio: "Home",
    nav_rastrear: "Track",
    nav_faq: "FAQ",
    nav_pedido: "Order",
    nav_contacto: "Contact",
    nav_idioma: "Language",
    instrucciones_titulo: "How to select your star?",
    instruccion_1: "Navigate the starry sky with the interactive viewer.",
    instruccion_2: "Click on the object you're interested in.",
    instruccion_3: "In the upper left corner you'll see the object's name, its RA and Dec.",
    instruccion_4: "Copy that data manually into the form below.",
    form_titulo: "Register your Star",
    clientes_titulo: "Customers who have acquired their star:",
    footer_derechos: "All rights reserved",
    modal_inicio_titulo: "Welcome to TuPedazoDeCosmos.com",
    modal_inicio_contenido: `
      <p class="mb-4">Welcome to the most unique experience in the universe!</p>
      <p class="mb-4">At <strong>TuPedazoDeCosmos.com</strong> we offer you the opportunity to symbolically adopt a star.</p>
      <h4 class="text-blue-300 font-semibold mt-6 mb-2">What's included?</h4>
      <ul class="list-disc pl-5 space-y-2">
        <li>Personalized digital PDF certificate</li>
        <li>Exact coordinates of your celestial object</li>
        <li>Custom name for your star</li>
        <li>Permanent registration in our database</li>
        <li>Unique serial number</li>
      </ul>
    `,
    modal_rastrear_titulo: "Track your Order",
    modal_faq_titulo: "Frequently Asked Questions",
    modal_pedido_titulo: "Your Order Status",
    modal_contacto_titulo: "Contact Us",
    cert_titulo: "Choose your Certificate Style",
    cert_descripcion: "Select the design you like best:",
    pago_titulo: "Process Payment",
    descarga_titulo: "Your Certificate is Ready!",
    descarga_btn: "Download Certificate",
    error_campos: "Please fill in all required fields",
    error_certificado: "Please select a certificate first"
  },
  pt: {
    tagline: "Explore o céu, escolha seu objeto astronômico e faça-o seu.",
    nav_inicio: "Início",
    nav_rastrear: "Rastrear",
    nav_faq: "FAQ",
    nav_pedido: "Pedido",
    nav_contacto: "Contato",
    nav_idioma: "Idioma",
    instrucciones_titulo: "Como selecionar sua estrela?",
    instruccion_1: "Navegue pelo céu estrelado com o visualizador interativo.",
    instruccion_2: "Clique no objeto que lhe interessa.",
    instruccion_3: "No canto superior esquerdo você verá o nome do objeto, sua AR e Dec.",
    instruccion_4: "Copie esses dados manualmente no formulário abaixo.",
    form_titulo: "Registre sua Estrela",
    clientes_titulo: "Clientes que adquiriram seu astro:",
    footer_derechos: "Todos os direitos reservados",
    modal_inicio_titulo: "Bem-vindo ao TuPedazoDeCosmos.com",
    modal_inicio_contenido: `
      <p class="mb-4">Bem-vindo à experiência mais única do universo!</p>
      <p class="mb-4">No <strong>TuPedazoDeCosmos.com</strong> oferecemos a oportunidade de adotar simbolicamente uma estrela.</p>
      <h4 class="text-blue-300 font-semibold mt-6 mb-2">O que está incluído?</h4>
      <ul class="list-disc pl-5 space-y-2">
        <li>Certificado digital personalizado em PDF</li>
        <li>Coordenadas exatas do seu objeto celeste</li>
        <li>Nome personalizado para sua estrela</li>
        <li>Registro permanente em nosso banco de dados</li>
        <li>Número de série único</li>
      </ul>
    `,
    modal_rastrear_titulo: "Rastrear seu Pedido",
    modal_faq_titulo: "Perguntas Frequentes",
    modal_pedido_titulo: "Status do seu Pedido",
    modal_contacto_titulo: "Entre em Contato",
    cert_titulo: "Escolha seu Estilo de Certificado",
    cert_descripcion: "Selecione o design que mais gosta:",
    pago_titulo: "Processar Pagamento",
    descarga_titulo: "Seu Certificado está Pronto!",
    descarga_btn: "Baixar Certificado",
    error_campos: "Por favor, preencha todos os campos obrigatórios",
    error_certificado: "Por favor, selecione um certificado primeiro"
  }
};

// ==================== FUNCIONES DE IDIOMA ====================
function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  applyTranslations();
  console.log('Idioma cambiado a:', lang);
}

function applyTranslations() {
  const t = translations[currentLanguage];
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (t[key]) el.textContent = t[key];
  });
}

// ==================== FUNCIONES DE MODAL ====================
function openModal(section) {
  console.log('Abriendo modal:', section);
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const t = translations[currentLanguage];
  
  let content = '';
  
  switch(section) {
    case 'inicio':
      content = `
        <h2 class="modal-title"><i class="fas fa-star mr-2"></i>${t.modal_inicio_titulo}</h2>
        <div>${t.modal_inicio_contenido}</div>
      `;
      break;
    case 'rastrear':
      content = `
        <h2 class="modal-title"><i class="fas fa-search mr-2"></i>${t.modal_rastrear_titulo}</h2>
        <p class="mb-4">Ingresa tu número de serie:</p>
        <div class="flex gap-2 mb-4">
          <input type="text" id="trackingInput" class="nasa-input flex-1" placeholder="COSMOS-XXXXXX">
          <button class="nasa-btn" onclick="rastrearPedido()"><i class="fas fa-search"></i></button>
        </div>
        <div id="trackingResult" class="mt-4 p-4 rounded-lg hidden"></div>
        <button class="nasa-btn" id="pdfButton" onclick="regenerarPDF()" style="display:none; margin:15px auto;">
          Regenerar Certificado
        </button>
      `;
      break;
    case 'faq':
      content = `
        <h2 class="modal-title"><i class="fas fa-question-circle mr-2"></i>${t.modal_faq_titulo}</h2>
        <div class="faq-item">
          <div class="faq-question"><span>¿Es oficial el registro?</span></div>
          <div class="faq-answer">El registro es simbólico y conmemorativo. La Unión Astronómica Internacional (IAU) es el único organismo que asigna nombres oficiales a los cuerpos celestes. Nuestro servicio ofrece una forma única y personal de conectar con el cosmos.</div>
        </div>
        <div class="faq-item">
          <div class="faq-question"><span>¿Qué recibo al comprar?</span></div>
          <div class="faq-answer">Recibirás un certificado PDF descargable con el nombre de tu estrella, coordenadas celestes (RA y Dec), fecha de registro y un número de serie único.</div>
        </div>
        <div class="faq-item">
          <div class="faq-question"><span>¿Puedo regalar una estrella?</span></div>
          <div class="faq-answer">¡Por supuesto! Es un regalo perfecto para cumpleaños, aniversarios, San Valentín o cualquier ocasión especial. Solo ingresa el nombre de la persona a quien deseas obsequiarle su pedazo de cosmos.</div>
        </div>
        <div class="faq-item">
          <div class="faq-question"><span>¿Cómo encuentro las coordenadas?</span></div>
          <div class="faq-answer"> Usa el visor Stellarium en nuestra página principal. Haz clic en cualquier estrella u objeto y verás su información en la esquina superior izquierda, incluyendo RA (Ascensión Recta) y Dec (Declinación).</div>
        </div>
        <div class="faq-item">
          <div class="faq-question"><span>¿Puedo ver mi estrella desde la Tierra?</span></div>
          <div class="faq-answer">Depende del objeto que elijas. Muchas estrellas son visibles a simple vista o con telescopios pequeños. El visor Stellarium te mostrará la ubicación exacta en el cielo según tu ubicación geográfica.</div>
        </div>
      `;
      break;
    case 'pedido':
      content = `
        <h2 class="modal-title"><i class="fas fa-shopping-cart mr-2"></i>${t.modal_pedido_titulo}</h2>
        <div id="pedidosList" class="space-y-3"></div>
      `;
      setTimeout(cargarListaPedidos, 100);
      break;
    case 'contacto':
      content = `
        <h2 class="modal-title"><i class="fas fa-envelope mr-2"></i>${t.modal_contacto_titulo}</h2>
        <form class="space-y-4">
          <input type="text" class="nasa-input" placeholder="Tu nombre" required>
          <input type="email" class="nasa-input" placeholder="Tu correo" required>
          <textarea class="nasa-input" rows="4" placeholder="Tu mensaje..." required></textarea>
          <button type="button" class="nasa-btn w-full" onclick="alert('¡Mensaje enviado!'); closeModal();">
            <i class="fas fa-paper-plane mr-2"></i>Enviar
          </button>
        </form>
      `;
      break;
  }
  
  modalBody.innerHTML = content;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function closeModalOutside(event) {
  if (event.target.id === 'modal') closeModal();
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ==================== VALIDAR FORMULARIO Y MOSTRAR CERTIFICADOS ====================
function validarYMostrarCertificados() {
  const form = document.getElementById('registroForm');
  const nombre = form.nombre.value.trim();
  const objeto = form.objeto.value.trim();
  const ra = form.ra.value.trim();
  const dec = form.dec.value.trim();
  const nuevoNombre = form.nuevoNombre.value.trim();
  const magnitud = form.magnitud.value.trim() || 'N/A';
  
  if (!nombre || !objeto || !ra || !dec || !nuevoNombre) {
    alert(translations[currentLanguage].error_campos);
    return;
  }
  
  formData = { nombre, objeto, ra, dec, nuevoNombre, magnitud };
  mostrarSeleccionCertificados();
}

function mostrarSeleccionCertificados() {
  const t = translations[currentLanguage];
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  
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
          <img src="cert-${i}.png" alt="Certificado ${i}">
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
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function seleccionarCertificado(num) {
  document.querySelectorAll('.certificate-option').forEach(el => el.classList.remove('selected'));
  document.getElementById(`cert-${num}`).classList.add('selected');
  selectedCertificate = num;
  console.log('Certificado seleccionado:', num);
}

function continuarAlPago() {
  if (!selectedCertificate) {
    alert(translations[currentLanguage].error_certificado);
    return;
  }
  mostrarPanelPago();
}

function mostrarPanelPago() {
  const t = translations[currentLanguage];
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
        <span class="text-yellow-300">"${formData.nuevoNombre}"</span>
      </div>
      <div class="resumen-item">
        <span>Objeto original:</span>
        <span>${formData.objeto}</span>
      </div>
      <div class="resumen-item">
        <span>Coordenadas:</span>
        <span>RA: ${formData.ra} | Dec: ${formData.dec}</span>
      </div>
      <div class="resumen-item">
        <span>Certificado:</span>
        <span>Estilo ${selectedCertificate}</span>
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
            description: "Certificado Estelar - " + formData.nuevoNombre,
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
  }, 100);
  */
 procesarCompraExitosa();
}

function procesarCompraExitosa() {
  const t = translations[currentLanguage];
  const fechaActual = new Date().toISOString().split('T')[0];
  const serieID = `COSMOS-${Date.now().toString(36).toUpperCase()}`;
  
  // Guardar cliente
  clientes.push({
    nombre: formData.nombre,
    nuevoNombre: formData.nuevoNombre,
    objeto: formData.objeto,
    ra: formData.ra,
    dec: formData.dec,
    magnitud: formData.magnitud,
    fecha: fechaActual,
    id: serieID,
    certificado: selectedCertificate
  });
  localStorage.setItem("clientes", JSON.stringify(clientes));
  actualizarListaClientes();
  
  // Guardar datos para descarga
  formData.fecha = fechaActual;
  formData.serieID = serieID;

  const data = new URLSearchParams({
    id: serieID,
    nombre: formData.nombre,
    objeto: formData.objeto,
    nuevo_nombre: formData.nuevoNombre,
    ra: formData.ra,
    dec: "'"+formData.dec,
    mag: formData.magnitud,
    fecha: fechaActual,
    tipo: selectedCertificate
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
  const t = translations[currentLanguage];
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
        <span class="text-yellow-300">ID: ${formData.serieID}</span>
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
    const pdfUrl = `assets/certificados/CERTIFICADO-${selectedCertificate}.pdf`;
    let pdfDoc;
    
    try {
      const existingPdfBytes = await fetch(pdfUrl).then(res => {
        if (!res.ok) throw new Error('PDF no encontrado');
        return res.arrayBuffer();
      });
      pdfDoc = await PDFDocument.load(existingPdfBytes);
    } catch (e) {
      // Si no se puede cargar el PDF, crear uno nuevo
      console.log('Creando PDF desde cero...');
      pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([842, 595]); // A4 horizontal
      
      // Fondo
      page.drawRectangle({
        x: 0, y: 0,
        width: 842, height: 595,
        color: rgb(0.04, 0.08, 0.15)
      });
      
      // Borde
      page.drawRectangle({
        x: 20, y: 20,
        width: 802, height: 555,
        borderColor: rgb(0, 0.83, 1),
        borderWidth: 2
      });
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
    page.drawText(formData.objeto, {
      x: 428,
      y: height - 235,
      size: 16,
      font: fontBold,
      color: blackColor,
    });
    
    // Coordenadas (después de "con las siguientes coordenadas")
    const coordenadas = `RA: ${formData.ra}  |  Dec: ${formData.dec}`;
    page.drawText(coordenadas, {
      x: 393,
      y: height - 290,
      size: 12,
      font: font,
      color: blackColor,
    });
    
    // Magnitud (después de "y magnitud aparente")
    page.drawText(formData.magnitud || 'N/A', {
      x: 363,
      y: height - 348,
      size: 12,
      font: font,
      color: blackColor,
    });
    
    // Nuevo nombre / renombrada como (después de "ha sido renombrada como")
    page.drawText(`"${formData.nuevoNombre}"`, {
      x: 516,
      y: height - 406,
      size: 18,
      font: fontBold,
      color: blackColor,
    });
    
    // Fecha (parte inferior izquierda)
    page.drawText(formData.fecha, {
      x: 348,
      y: height - 502,
      size: 11,
      font: font,
      color: blackColor,
    });
    
    // Clave de registro (parte inferior derecha)
    page.drawText(formData.serieID, {
      x: 636,
      y: height - 502,
      size: 11,
      font: font,
      color: blackColor,
    });
    
    // Descargar
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificado_${formData.nuevoNombre.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Limpiar formulario
    document.getElementById('registroForm').reset();
    selectedCertificate = null;
    formData = {};
    
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
    ${formData.objeto}
    
    Con coordenadas:
    RA: ${formData.ra}
    Dec: ${formData.dec}
    
    Magnitud aparente: ${formData.magnitud}
    
    Ha sido renombrada como:
    "${formData.nuevoNombre}"
    
    Fecha: ${formData.fecha}
    Clave de registro: ${formData.serieID}
    
    TuPedazoDeCosmos.com
  `;
  
  const win = window.open('', '_blank');
  win.document.write(`<pre style="font-family: monospace; padding: 40px;">${contenido}</pre>`);
  win.print();
}

// ==================== FUNCIONES AUXILIARES ====================
function rastrearPedido() {
  const input = document.getElementById('trackingInput');
  //const result = document.getElementById('trackingResult');
  const searchId = input.value.trim().toUpperCase();
  
  /*if (!searchId) {
    result.innerHTML = '<p class="text-yellow-400">Ingresa un número de serie.</p>';
    result.classList.remove('hidden');
    result.style.background = 'rgba(234, 179, 8, 0.2)';
    return;
  }*/
  
  fetch(`${"https://script.google.com/macros/s/AKfycbxIrdP_fXuSI2iJlBLTRlYPB1sBnhbf7zwv45lQVmaMGaWsbwVgyB828rrcv4nVT_x5QQ/exec"}?id=${searchId}`)
    .then(res => res.json())
    .then(data => {
      regenCertificado(data, searchId);
    })
    .catch(console.error);
  
  
  /*if (data.length) {
    const cliente = data[0];
    result.innerHTML = `
      <div class="text-green-400 mb-2"><i class="fas fa-check-circle mr-2"></i>¡Encontrado!</div>
      <p><strong>Cliente:</strong> ${cliente.nombre}</p>
      <p><strong>Cliente:</strong> ${cliente.objeto}</p>
      <p><strong>Estrella:</strong> ${cliente.nuevo_nombre}</p>
      <p><strong>Fecha:</strong> ${cliente.fecha}</p>
    `;
    result.style.background = 'rgba(34, 197, 94, 0.2)';
  } else {
    result.innerHTML = '<p class="text-red-400">No se encontró ese registro.</p>';
    result.style.background = 'rgba(239, 68, 68, 0.2)';
  }
  result.classList.remove('hidden');*/
}

let cliente_actual = null;

function regenCertificado(data, sid) {
  const result = document.getElementById('trackingResult');
  const pdfButton = document.getElementById("pdfButton");
  
  pdfButton.style.display = "none";

  if (!sid) {
    result.innerHTML = '<p class="text-yellow-400">Ingresa un número de serie.</p>';
    result.classList.remove('hidden');
    result.style.background = 'rgba(234, 179, 8, 0.2)';
    return;
  }

  if (data.length) {
    cliente_actual = data[0];
    result.innerHTML = `
      <div class="text-green-400 mb-2"><i class="fas fa-check-circle mr-2"></i>¡Encontrado!</div>
      <p><strong>Cliente:</strong> ${cliente_actual.nombre}</p>
      <p><strong>Objeto:</strong> ${cliente_actual.objeto}</p>
      <p><strong>Estrella:</strong> ${cliente_actual.nuevo_nombre}</p>
      <p><strong>Fecha:</strong> ${cliente_actual.fecha}</p>
    `;
    pdfButton.style.display = "inline-block";
    result.style.background = 'rgba(34, 197, 94, 0.2)';
  } else {
    result.innerHTML = '<p class="text-red-400">No se encontró ese registro.</p>';
    cliente_actual = null;
    pdfButton.style.display = "none";
    result.style.background = 'rgba(239, 68, 68, 0.2)';
  }
  result.classList.remove('hidden');
}

async function regenerarPDF() {
  const { PDFDocument, StandardFonts, rgb } = PDFLib;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText("User Information", {
    x: 50,
    y: 750,
    size: 18,
    font,
  });

  page.drawText(`ID: ${cliente_actual.id}`, {
    x: 50,
    y: 720,
    size: 12,
    font,
  });

  page.drawText(`Objeto: ${cliente_actual.objeto}`, {
    x: 50,
    y: 700,
    size: 12,
    font,
  });

  page.drawText(`Nuevo Nombre: ${cliente_actual.nuevo_nombre}`, {
    x: 50,
    y: 680,
    size: 12,
    font,
  });

  // Generate PDF bytes
  const pdfBytes = await pdfDoc.save();

  // Convert to Blob
  const blob = new Blob([pdfBytes], { type: "application/pdf" });

  // Create object URL
  const url = URL.createObjectURL(blob);

  // Open in new tab
  window.open(url, "_blank");
}

function cargarListaPedidos() {
  const container = document.getElementById('pedidosList');
  if (!container) return;
  
  if (clientes.length === 0) {
    container.innerHTML = '<p class="text-gray-400">No hay pedidos registrados.</p>';
    return;
  }
  
  container.innerHTML = clientes.map(c => `
    <div class="nasa-card p-3 rounded-lg">
      <p class="text-blue-300 font-semibold">${c.nuevoNombre}</p>
      <p class="text-sm text-gray-400">Por: ${c.nombre} | ${c.fecha}</p>
      <p class="text-xs text-gray-500">ID: ${c.id}</p>
    </div>
  `).join('');
}

function actualizarListaClientes() {
  const lista = document.getElementById("listaClientes");
  lista.innerHTML = "";
  
  if (clientes.length === 0) {
    lista.innerHTML = '<li class="text-gray-500 italic">Aún no hay registros. ¡Sé el primero!</li>';
    return;
  }
  
  clientes.forEach(c => {
    const item = document.createElement("li");
    item.innerHTML = `<span class="text-blue-300">${c.nombre}</span> registró '<span class="text-yellow-300">${c.nuevoNombre}</span>' el ${c.fecha}`;
    lista.appendChild(item);
  });
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', function() {
  console.log('Página cargada');
  applyTranslations();
  actualizarListaClientes();
});
