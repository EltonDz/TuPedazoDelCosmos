import { appVariables } from "./variables.js";
import { applyTranslations } from "./traducciones.js"

// ==================== FUNCIONES DE MODAL ====================
export function sendEmail() {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      nombre: document.getElementById("nombre").value.trim(),
      email: document.getElementById("email").value.trim(),
      mensaje: document.getElementById("mensaje").value
    };

    const errors = validateContactForm(formData);

    // Clear previous error styles
    document.querySelectorAll(".input-error")
      .forEach(el => el.classList.remove("input-error"));

    if (Object.keys(errors).length > 0) {
      highlightErrors(errors);
      showFormMessage("email_completa_campos", true, false);
      return false;
    }

    try {
      await sendContactEmail(formData);
      showFormMessage("email_mensaje_enviado", false, false);
      form.reset();
      return true;
    } catch (error) {
      showFormMessage("email_no_mensaje");
      console.error(error);
      return false;
    }

  });
  applyTranslations();
}

function validateContactForm({nombre,email,mensaje}) {
  const errors = {};

  if (!nombre.trim()) {
    errors.nombre = "Nombre es campo requerido";
  }

  if (!email.trim()) {
    errors.email = "Email es campo requerido";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Formato de email incorrecto";
  }

  if (!mensaje.trim()) {
    errors.mensaje = "Mensaje es un campo requerido";
  }

  return errors;
}

function showFormMessage(id, isError = true, errorMensaje = true) {
  const messageDiv = document.getElementById("formMessageContact");

  if (!isError) {
    messageDiv.style.color = "green";
    messageDiv.style.background = 'rgba(34, 197, 94, 0.2)';
    messageDiv.innerHTML = `<div class="mb-2"><i class="fas fa-check-circle mr-2"></i><span data-translate=${id}>¡Mensaje enviado!</span></div>`;
  }
  else {
    messageDiv.style.color = "red";
    messageDiv.style.background = 'rgba(239, 68, 68, 0.2)';
    if (!errorMensaje) {
      messageDiv.innerHTML = `<div class="mb-2" data-translate=${id}>Por favor, completa los campos requeridos.</div>`;
    }
    else {
      messageDiv.innerHTML = `<div class="mb-2" data-translate=${id}>Error al enviar mensaje.</div>`;
    }
  }
  messageDiv.classList.remove("hidden");

  setTimeout(() => {
    messageDiv.textContent = "";
    messageDiv.classList.add("hidden");
  }, appVariables.delay);
  applyTranslations();
}

function highlightErrors(errors) {
  Object.keys(errors).forEach(field => {
    document.getElementById(field).classList.add("input-error");
  });
}

async function sendContactEmail(data) {
  const params = new URLSearchParams(data);

  await fetch("https://script.google.com/macros/s/AKfycbxIrdP_fXuSI2iJlBLTRlYPB1sBnhbf7zwv45lQVmaMGaWsbwVgyB828rrcv4nVT_x5QQ/exec?action=sendEmail", {
    method: "POST",
    body: params,
  })
  .then(res => res.text())
  .then(result => {
    console.log("Saved:", result);
  })  
  .catch(err => console.error(err));

  return;
}