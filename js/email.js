export function sendEmail() {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      nombre: document.getElementById("nombre").value.trim(),
      email: document.getElementById("email").value.trim(),
      mensaje: document.getElementById("mensaje").value
      // name: form.nombre.value.trim(),
      // email: form.email.value.trim(),
      // message: form.message.value
    };

    const errors = validateContactForm(formData);

    // Clear previous error styles
    document.querySelectorAll(".input-error")
      .forEach(el => el.classList.remove("input-error"));

    if (Object.keys(errors).length > 0) {
      highlightErrors(errors);
      showFormMessage("Por favor, completa todos los campos");
      return;
    }

    try {
      await sendContactEmail(formData);
      showFormMessage("¡Mensaje enviado!", false);
      form.reset();
    } catch (error) {
      showFormMessage("No se pudo mandar mensaje.");
      console.error(error);
    }

  });
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

function showFormMessage(text, isError = true) {
  const messageDiv = document.getElementById("formMessageContact");

  // messageDiv.textContent = text;
  if (!isError) {
    messageDiv.style.color = "green";
    messageDiv.style.background = 'rgba(34, 197, 94, 0.2)';
    messageDiv.innerHTML = `<div class="mb-2"><i class="fas fa-check-circle mr-2"></i>${text}</div>`;
  }
  else {
    messageDiv.style.color = "red";
    messageDiv.style.background = 'rgba(239, 68, 68, 0.2)';
    messageDiv.innerHTML = `<div class="mb-2">${text}</div>`;
  }
  messageDiv.classList.remove("hidden");

  setTimeout(() => {
    messageDiv.textContent = "";
    messageDiv.classList.add("hidden");
  }, 4000);
}

function highlightErrors(errors) {
  console.log(Object.keys(errors));
  Object.keys(errors).forEach(field => {
    document.getElementById(field).classList.add("input-error");
  });
}

async function sendContactEmail(data) {
  const params = new URLSearchParams(data);
  console.log(params.get("nombre"));
  console.log(params.get("email"));

  const response = await fetch("https://script.google.com/macros/s/AKfycbxIrdP_fXuSI2iJlBLTRlYPB1sBnhbf7zwv45lQVmaMGaWsbwVgyB828rrcv4nVT_x5QQ/exec?action=sendEmail", {
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