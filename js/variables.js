export const appVariables = {
  selectedCertificate: null, // certificado seleccionado en proceso de compra
  formData: {}, // datos de formulario actual
  clientes: JSON.parse(localStorage.getItem("clientes")) || [], // lista de clientes
  currentLanguage: localStorage.getItem('language') || 'es', // definicion de lenguaje por defecto
  cliente_actual: null, // datos de cliente para regeneracion de certificado
  delay: 5000, // retraso para despliegue de mensajes

  translations: {
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
      error_certificado: "Por favor, selecciona un certificado primero",

      nombre_placeholder: "Tu nombre"
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
      error_certificado: "Please select a certificate first",

      nombre_placeholder: "Your name"
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
      error_certificado: "Por favor, selecione um certificado primeiro",

      nombre_placeholder: "Seu nome"
    }
  }
}