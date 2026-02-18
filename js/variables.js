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
      boton_validar: "Continuar - Elegir Certificado",
      boton_email_enviar: "Enviar",
      boton_regenerarPDF: "Regenerar Certificado",
      lista_recientes_reg: "registró",
      lista_recientes_el: "el",
      lista_recientes_vacio: "Aún no hay registros. ¡Sé el primero!",
      lista_pedidos_no: "No hay pedidos registrados.",
      lista_pedidos_por: "Por",
      lista_pedidos_obj: "Objeto",
      faq_oficial: "¿Es oficial el registro?",
      faq_oficial_res: "El registro es simbólico y conmemorativo. La Unión Astronómica Internacional (IAU) es el único organismo que asigna nombres oficiales a los cuerpos celestes. Nuestro servicio ofrece una forma única y personal de conectar con el cosmos.",
      faq_recibo: "¿Qué recibo al comprar?",
      faq_recibo_res: "Recibirás un certificado PDF descargable con el nombre de tu estrella, coordenadas celestes (RA y Dec), fecha de registro y un número de serie único.",
      faq_regalar: "¿Puedo regalar una estrella?",
      faq_regalar_res: "¡Por supuesto! Es un regalo perfecto para cumpleaños, aniversarios, San Valentín o cualquier ocasión especial. Solo ingresa el nombre de la persona a quien deseas obsequiarle su pedazo de cosmos.",
      faq_coord: "¿Cómo encuentro las coordenadas?",
      faq_coord_res: "Usa el visor Stellarium en nuestra página principal. Haz clic en cualquier estrella u objeto y verás su información en la esquina superior izquierda, incluyendo RA (Ascensión Recta) y Dec (Declinación).",
      faq_estrella: "¿Puedo ver mi estrella desde la Tierra?",
      faq_estrella_res: "Depende del objeto que elijas. Muchas estrellas son visibles a simple vista o con telescopios pequeños. El visor Stellarium te mostrará la ubicación exacta en el cielo según tu ubicación geográfica.",
      rastrear_id: "Ingresa tu número de serie:",
      rastrear_amarillo: "Ingresa tu número de serie.",
      rastrear_encontrado: "¡Encontrado!",
      rastrear_no_encontrado: "No se encontró ese registro.",
      rastrear_cliente_enc: "Cliente",
      rastrear_objeto_enc: "Objeto",
      rastrear_estrella_enc: "Estrella",
      rastrear_fecha_enc: "Fecha",
      email_mensaje_enviado: "¡Mensaje enviado!",
      email_completa_campos: "Por favor, completa los campos requeridos.",
      email_no_mensaje: "Error al enviar mensaje.",

      nombre_placeholder: "Tu nombre",
      objeto_placeholder: "Nombre del objeto (estrella original)",
      mag_placeholder: "Magnitud aparente (ej. 4.5)",
      nuevo_nombre_placeholder: "Renombra tu estrella",
      nombre_email_placeholder: "Tu nombre",
      correo_email_placeholder: "Tu correo",
      mensaje_email_placeholder: "Tu mensaje...",
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
      boton_validar: "Continue - Choose Certificate",
      boton_email_enviar: "Send",
      boton_regenerarPDF: "Regenerate Certificate",
      lista_recientes_reg: "registered",
      lista_recientes_el: "on",
      lista_recientes_vacio: "No purchases yet. Be the first one!",
      lista_pedidos_no: "No registered orders.",
      lista_pedidos_por: "By",
      lista_pedidos_obj: "Object",
      faq_oficial: "Is the registration official?",
      faq_oficial_res: "The registration is symbolic and commemorative. The International Astronomical Union (IAU) is the only organization that assigns official names to celestial bodies. Our service offers a unique and personal way to connect with the cosmos.",
      faq_recibo: "What do I receive after purchasing?",
      faq_recibo_res: "You will receive a downloadable PDF certificate with your star’s name, celestial coordinates (RA and Dec), registration date, and a unique serial number.",
      faq_regalar: "Can I gift a star?",
      faq_regalar_res: "Of course! It’s a perfect gift for birthdays, anniversaries, Valentine’s Day, or any special occasion. Simply enter the name of the person to whom you would like to gift their piece of the cosmos.",
      faq_coord: "How do I find the coordinates?",
      faq_coord_res: "Use the Stellarium viewer on our main page. Click on any star or object and you will see its information in the upper left corner, including RA (Right Ascension) and Dec (Declination).",
      faq_estrella: "Can I see my star from Earth?",
      faq_estrella_res: "It depends on the object you choose. Many stars are visible to the naked eye or with small telescopes. The Stellarium viewer will show the exact location in the sky according to your geographic location.",
      rastrear_id: "Enter your serial number:",
      rastrear_amarillo: "Enter your serial number.",
      rastrear_encontrado: "Found!",
      rastrear_no_encontrado: "That record was not found.",
      rastrear_cliente_enc: "Customer",
      rastrear_objeto_enc: "Object",
      rastrear_estrella_enc: "Star",
      rastrear_fecha_enc: "Date",
      email_mensaje_enviado: "Message sent!",
      email_completa_campos: "Please complete the required fields.",
      email_no_mensaje: "Error sending message.",

      nombre_placeholder: "Your name",
      objeto_placeholder: "Name of object (original star)",
      mag_placeholder: "Aparent magnitude (ex. 4.5)",
      nuevo_nombre_placeholder: "Rename your star",
      nombre_email_placeholder: "Your name",
      correo_email_placeholder: "Your email",
      mensaje_email_placeholder: "Your message...",
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
      boton_validar: "Continuar - Selecionar Certificado",
      boton_email_enviar: "Enviar",
      boton_regenerarPDF: "Regenerar Certificado",
      lista_recientes_reg: "gravou",
      lista_recientes_el: "em",
      lista_recientes_vacio: "Ainda não há compras. Seja o primeiro!",
      lista_pedidos_no: "Não há pedidos registrados.",
      lista_pedidos_por: "Por",
      lista_pedidos_obj: "Objeto",
      faq_oficial: "O registro é oficial?",
      faq_oficial_res: "O registro é simbólico e comemorativo. A União Astronômica Internacional (IAU) é o único organismo que atribui nomes oficiais aos corpos celestes. Nosso serviço oferece uma forma única e pessoal de se conectar com o cosmos.",
      faq_recibo: "O que recebo ao comprar?",
      faq_recibo_res: "Você receberá um certificado em PDF para download com o nome da sua estrela, coordenadas celestes (RA e Dec), data de registro e um número de série único.",
      faq_regalar: "Posso presentear uma estrela?",
      faq_regalar_res: "Claro! É um presente perfeito para aniversários, Dia dos Namorados ou qualquer ocasião especial. Basta inserir o nome da pessoa a quem você deseja presentear com seu pedaço do cosmos.",
      faq_coord: "Como encontro as coordenadas?",
      faq_coord_res: "Use o visualizador Stellarium em nossa página principal. Clique em qualquer estrela ou objeto e você verá suas informações no canto superior esquerdo, incluindo RA (Ascensão Reta) e Dec (Declinação).",
      faq_estrella: "Posso ver minha estrela da Terra?",
      faq_estrella_res: "Depende do objeto que você escolher. Muitas estrelas são visíveis a olho nu ou com pequenos telescópios. O visualizador Stellarium mostrará a localização exata no céu de acordo com sua localização geográfica.",
      rastrear_id: "Digite seu número de série:",
      rastrear_amarillo: "Digite seu número de série.",
      rastrear_encontrado: "Encontrado!",
      rastrear_no_encontrado: "Registro não encontrado.",
      rastrear_cliente_enc: "Cliente",
      rastrear_objeto_enc: "Objeto",
      rastrear_estrella_enc: "Estrela",
      rastrear_fecha_enc: "Data",
      email_mensaje_enviado: "Mensagem enviada!",
      email_completa_campos: "Por favor, preencha os campos obrigatórios.",
      email_no_mensaje: "Erro ao enviar mensagem.",

      nombre_placeholder: "Seu nome",
      objeto_placeholder: "Nome do objeto (estrela original)",
      mag_placeholder: "Magnitude aparente (ex. 4.5)",
      nuevo_nombre_placeholder: "Renomeie sua estrela",
      nombre_email_placeholder: "Seu nome",
      correo_email_placeholder: "Seu e-mail",
      mensaje_email_placeholder: "Sua mensagem...",
    }
  }
}