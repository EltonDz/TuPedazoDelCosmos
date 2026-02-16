// ==================== CARGAR LISTA DE CERTIFICADOS RECIENTES ====================
// document.addEventListener("DOMContentLoaded", function () {
//   mostrarPrimerosReg();
// });

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
    lista.innerHTML = '<li class="text-gray-500 italic">Aún no hay registros. ¡Sé el primero!</li>';
    return;
  }
  
  datos.forEach(c => {
    let fecha = new Date(c[7]);

    fecha = fecha.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const item = document.createElement("li");
    item.innerHTML = `<span class="text-blue-300">${c[1]}</span> registró '<span class="text-yellow-300">${c[3]}</span>' el ${fecha}`;
    lista.appendChild(item);
  });
}