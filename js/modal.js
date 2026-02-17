import { appVariables } from "./variables.js";
import { rastrearPedido, regenerarPDF} from "./regenerarPDF.js"
import { sendEmail } from "./email.js";

// ==================== FUNCIONES DE MODAL ====================
export function openModal(section) {
  console.log('Abriendo modal:', section);
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const t = appVariables.translations[appVariables.currentLanguage];
  
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
          <button class="nasa-btn" id="searchPDF"><i class="fas fa-search"></i></button>
        </div>
        <div id="trackingResult" class="mt-4 p-4 rounded-lg hidden"></div>
        <button class="nasa-btn" id="pdfButton" style="display:none; margin:15px auto;">
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
        <form id="contactForm" class="space-y-4">
          <input id="nombre" type="text" class="nasa-input" placeholder="Tu nombre">
          <input id="email" type="email" class="nasa-input" placeholder="Tu correo">
          <textarea id="mensaje" class="nasa-input" rows="4" placeholder="Tu mensaje..."></textarea>
          <button type="submit" class="nasa-btn w-full" id="sendContact">
            <i class="fas fa-paper-plane mr-2"></i>Enviar
          </button>
        </form>
        <div id="formMessageContact" class="mt-4 p-4 rounded-lg hidden"></div>
      `;
      break;
  }
  
  modalBody.innerHTML = content;
  modal.classList.add('active');

  document.body.style.overflow = 'hidden';

  if (section === 'rastrear') {
    document.getElementById("searchPDF")
      .addEventListener("click", () => {
        rastrearPedido();
    });

    document.getElementById("pdfButton")
      .addEventListener("click", () => {
        regenerarPDF();
    });
  }

  if (section === 'contacto') {
    document.getElementById("sendContact")
      .addEventListener("click", () => {
        if (sendEmail()) { closeModal(); }
    });
  }
}

export function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

export function closeModalOutside(event) {
  if (event.target.id === 'modal') closeModal();
}

function cargarListaPedidos() {
  const container = document.getElementById('pedidosList');
  if (!container) return;
  
  if (appVariables.clientes.length === 0) {
    container.innerHTML = '<p class="text-gray-400">No hay pedidos registrados.</p>';
    return;
  }

  const firstFive = appVariables.clientes.slice(-3)
  
  container.innerHTML = firstFive.map(c => `
    <div class="nasa-card p-3 rounded-lg">
      <p class="text-blue-300 font-semibold">${c.nuevoNombre}</p>
      <p class="text-sm text-gray-400">Por: ${c.nombre} | ${c.fecha}</p>
      <p class="text-xs text-gray-500">ID: ${c.objeto}</p>
    </div>
  `).join('');
}