// --- INICIO SCRIPT DE FORMULARIO (form.js) ---

// Las variables 'translations' y 'currentLanguage' se cargan desde 'translations.js' y 'site.js'

// Inicializa EmailJS (asegúrate de que tu clave pública esté correcta)
emailjs.init('B2i4b0UQcAco5iAUz');

// Referencias a los elementos del formulario
const btn = document.getElementById('button');
const form = document.getElementById('form');
const successMsgDiv = document.getElementById('form-success-message');
let originalBtnText = btn.textContent; // Texto original del botón

/*
 * 1. Función Callback de reCAPTCHA
 * Google llama a esto después de grecaptcha.execute() si la validación es exitosa.
 */
function onSubmitForm(token) {
   
   // Actualiza el texto del botón (por si cambió el idioma mientras se escribía)
   originalBtnText = document.getElementById('button').textContent;
   btn.textContent = 'Enviando...'; 
   btn.disabled = true; 

   const serviceID = 'default_service';
   const templateID = 'template_ygh40cq';

   // EmailJS envía el formulario. El token de reCAPTCHA se incluye automáticamente.
   emailjs.sendForm(serviceID, templateID, form)
    .then(() => {
      // --- ÉXITO ---
      btn.textContent = originalBtnText; 
      btn.disabled = false; 
      
      // 1. Prepara y muestra el mensaje de éxito (fade-in)
      successMsgDiv.textContent = translations[currentLanguage].form_alert_success;
      successMsgDiv.classList.remove('hidden');
      setTimeout(() => { // Pequeño delay para permitir que 'hidden' se quite ANTES de la transición
        successMsgDiv.classList.remove('opacity-0');
      }, 10);
      
      grecaptcha.reset(); // Resetea el reCAPTCHA
      form.reset();       // Limpia el formulario
      
      // 2. Inicia el desvanecimiento (fade-out) después de 5 segundos
      setTimeout(() => {
        successMsgDiv.classList.add('opacity-0');
      }, 5000); // 5000ms = 5 segundos (como solicitaste)
      
      // 3. Oculta el div completamente después de que termine la animación de fade-out
      // (5000ms de espera + 500ms de transición = 5500ms)
      setTimeout(() => {
        successMsgDiv.classList.add('hidden');
        successMsgDiv.textContent = ''; // Limpia el texto
      }, 5500);
      
    }, (err) => {
      // --- ERROR ---
      btn.textContent = originalBtnText; 
      btn.disabled = false; 
      
      // Los errores (ej. reCAPTCHA inválido) se siguen mostrando como alerta
      alert(translations[currentLanguage].form_alert_error + JSON.stringify(err));
      
      grecaptcha.reset(); // Resetea aunque falle
    });
}

/*
 * 2. Event Listener del Formulario
 * Captura el clic en "Enviar"
 */
form.addEventListener('submit', function(event) {
   event.preventDefault(); // Siempre previene el envío normal
   
   // Oculta cualquier mensaje de éxito anterior al intentar un nuevo envío
   successMsgDiv.classList.add('opacity-0');
   successMsgDiv.classList.add('hidden');
   successMsgDiv.textContent = '';
   
   // Llama a Google para que valide al usuario
   grecaptcha.execute();
});

// --- FIN SCRIPT DE FORMULARIO ---
