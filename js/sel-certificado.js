import { closeModal } from './modal.js';
import { appVariables } from './variables.js'
import { procesarCompraExitosa } from './generar-certificado.js';

// ==================== VALIDAR FORMULARIO Y MOSTRAR CERTIFICADOS ====================
export function validarYMostrarCertificados() {
  const form = document.getElementById('registroForm');

  const nombre = form.nombre.value.trim();
  const objeto = form.objeto.value.trim();
  const ra1 = form.ra1.value.trim();
  const ra2 = form.ra2.value.trim();
  const ra3 = form.ra3.value.trim();
  const dec1 = form.dec1.value.trim();
  const dec2 = form.dec2.value.trim();
  const dec3 = form.dec3.value.trim();

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
    let messageTimer;
    clearTimeout(messageTimer);

    messageDiv.textContent = appVariables.translations[appVariables.currentLanguage].error_campos;
    messageDiv.classList.remove("hidden");

    messageTimer = setTimeout(() => {
      messageDiv.classList.add("hidden");
    }, appVariables.delay);
    
    return;
  }

  messageDiv.textContent = "";

  const ra = `${ra1}h ${ra2}m ${ra3}s`
  const dec = `${dec1}º ${dec2}' ${dec3}"`
  
  appVariables.formData = { nombre, objeto, ra, dec, nuevoNombre, magnitud };
  mostrarSeleccionCertificados();
}

function mostrarSeleccionCertificados() {
  const t = appVariables.translations[appVariables.currentLanguage];
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
  
    <div class="certificate-grid" id="selDiv">
      ${[1,2,3,4].map(i => `
        <div class="certificate-option" id="cert-${i}">
          <img src="assets/imgs/cert-${i}.png" alt="Certificado ${i}">
          <div class="certificate-label">Estilo ${i}</div>
          <div class="certificate-check"><i class="fas fa-check"></i></div>
        </div>
      `).join('')}
    </div>
    
    <div class="flex justify-between mt-6">
      <button class="nasa-btn" id="volverForm">
        <i class="fas fa-arrow-left mr-2"></i>Volver
      </button>
      <button class="nasa-btn" id="continuarPag">
        Continuar al Pago<i class="fas fa-arrow-right ml-2"></i>
      </button>
    </div>

    <div id="messNotSelected" class="text-red-400 mt-4 p-4 rounded-lg hidden" style="background:rgba(239, 68, 68, 0.2)"></div>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  document.getElementById("volverForm")
        .addEventListener("click", () => {
          closeModal();
  });
  
  document.getElementById("cert-1")
        .addEventListener("click", () => {
          seleccionarCertificado(1);
  });
  document.getElementById("cert-2")
        .addEventListener("click", () => {
          seleccionarCertificado(2);
  });
  document.getElementById("cert-3")
        .addEventListener("click", () => {
          seleccionarCertificado(3);
  });
  document.getElementById("cert-4")
        .addEventListener("click", () => {
          seleccionarCertificado(4);
  });

  document.getElementById("continuarPag")
        .addEventListener("click", () => {
          continuarAlPago();
  });

  // document.getElementById("modal-body")
  //   .addEventListener("click", function (event) {
  //     if (event.target.tagName === "BUTTON") {
  //       const id = event.target.id;
  //       seleccionarCertificado(id);
  //     }
  //   });
}

function seleccionarCertificado(num) {
  document.querySelectorAll('.certificate-option').forEach(el => el.classList.remove('selected'));
  document.getElementById(`cert-${num}`).classList.add('selected');
  appVariables.selectedCertificate = num;
  console.log('Certificado seleccionado:', num);
}

function continuarAlPago() {
  if (!appVariables.selectedCertificate) {
    document.getElementById("messNotSelected").classList.remove("hidden")
    document.getElementById("messNotSelected").textContent = appVariables.translations[appVariables.currentLanguage].error_certificado;

    let messageTimer;
    clearTimeout(messageTimer);

    messageTimer = setTimeout(() => {
      document.getElementById("messNotSelected").classList.add("hidden");
    }, appVariables.delay);
    return;
  }
  mostrarPanelPago();
}

function mostrarPanelPago() {
  const t = appVariables.translations[appVariables.currentLanguage];
  const modalBody = document.getElementById('modal-body');
  
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
      <button class="text-gray-400 hover:text-white" id="mostrarSelCert">
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
  }, 100);
  // procesarCompraExitosa();

  document.getElementById("mostrarSelCert")
        .addEventListener("click", () => {
          mostrarSeleccionCertificados();
  });
}