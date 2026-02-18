import { applyTranslations } from "./traducciones.js"
import { appVariables } from "./variables.js";

// ==================== CARGAR LISTA DE CERTIFICADOS RECIENTES ====================
export function mostrarPrimerosReg() {
  fetch("https://script.google.com/macros/s/AKfycbxIrdP_fXuSI2iJlBLTRlYPB1sBnhbf7zwv45lQVmaMGaWsbwVgyB828rrcv4nVT_x5QQ/exec?action=getFirst10")
    .then(response => response.json())
    .then(datos => {
      actualizarListaClientes(datos);
    })
    .catch(error => console.error(error));
}

function actualizarListaClientes(datos) {
  const lista = document.getElementById("listaClientes");
  lista.innerHTML = "";
  
  if (datos.length === 0) {
    lista.innerHTML = '<li class="text-gray-500 italic" data-translate="lista-recientes-vacio">Aún no hay registros. ¡Sé el primero!</li>';
    return;
  }
  
  datos.forEach(c => {
    let fecha = new Date(c[7]);

    fecha = fecha.toLocaleDateString(appVariables.currentLanguage, {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const item = document.createElement("li");
    item.innerHTML = `<span class="text-blue-300">${c[1]}</span> <span data-translate="lista_recientes_reg">registró</span> '<span class="text-yellow-300">${c[3]}</span>' <span data-translate="lista_recientes_el">el</span> ${fecha}`;
    lista.appendChild(item);
  });
  applyTranslations();
}