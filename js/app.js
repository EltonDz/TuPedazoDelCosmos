// ==================== METODOS ====================
import { mostrarPrimerosReg } from "./lista-recientes.js";
import { changeLanguage, applyTranslations } from "./traducciones.js";
import { openModal, closeModal, closeModalOutside } from "./modal.js"
import { validarYMostrarCertificados } from "./sel-certificado.js";


// ==================== TRADUCCIONES ====================
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
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("validarCertificado")
    .addEventListener("click", () => {
      validarYMostrarCertificados();
    });
});

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', function() {
  console.log('Página cargada');
  applyTranslations();
  // actualizarListaClientes();
  mostrarPrimerosReg();
});
