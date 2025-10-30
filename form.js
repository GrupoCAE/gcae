// --- INICIO SCRIPT DE FORMULARIO (form.js) ---

// Las variables 'translations' y 'currentLanguage' se cargan desde 'translations.js' y 'site.js'

// Inicializa EmailJS (asegúrate de que tu clave pública esté correcta)
emailjs.init('B2i4b0UQcAco5iAUz');

// Referencias a los elementos del formulario
const btn = document.getElementById('button');
const form = document.getElementById('form');
const successMsgDiv = document.getElementById('form-success-message');
const errorMsgDiv = document.getElementById('form-error-message'); // <-- (NUEVO)
let originalBtnText = btn.textContent; // Texto original del botón

/*
 * 1. Función Callback de reCAPTCHA
 */
function onSubmitForm(token) {
   
   originalBtnText = document.getElementById('button').textContent;
   btn.textContent = 'Enviando...'; 
   btn.disabled = true; 

   const serviceID = 'default_service';
   const templateID = 'template_ygh40cq';

   emailjs.sendForm(serviceID, templateID, form)
    .then(() => {
      // --- ÉXITO ---
      btn.textContent = originalBtnText; 
      btn.disabled = false; 
      
      // Muestra el mensaje de éxito
      successMsgDiv.textContent = translations[currentLanguage].form_alert_success;
      successMsgDiv.classList.remove('hidden');
      setTimeout(() => { successMsgDiv.classList.remove('opacity-0'); }, 10);
      
      grecaptcha.reset(); 
      form.reset();       
      
      // Oculta después de 4 seg (animación de 0.5s)
      setTimeout(() => { successMsgDiv.classList.add('opacity-0'); }, 4000); // 4 seg espera
      setTimeout(() => { successMsgDiv.classList.add('hidden'); }, 4500); // 4.5 seg oculta
      
    }, (err) => {
      // --- ERROR (MODIFICADO) ---
      btn.textContent = originalBtnText; 
      btn.disabled = false; 
      
      // (NUEVO) Muestra el error en el div de error
      errorMsgDiv.textContent = translations[currentLanguage].form_alert_error + (err.text || JSON.stringify(err));
      errorMsgDiv.classList.remove('hidden');
      setTimeout(() => { errorMsgDiv.classList.remove('opacity-0'); }, 10);

      grecaptcha.reset(); // Resetea aunque falle
    });
}

/*
 * 2. Event Listener del Formulario
 */
form.addEventListener('submit', function(event) {
   event.preventDefault(); // Siempre previene el envío normal
   
   // (MODIFICADO) Oculta ambos mensajes al intentar un nuevo envío
   successMsgDiv.classList.add('opacity-0', 'hidden');
   successMsgDiv.textContent = '';
   errorMsgDiv.classList.add('opacity-0', 'hidden'); // <-- (NUEVO)
   errorMsgDiv.textContent = '';                     // <-- (NUEVO)
   
   grecaptcha.execute();
});

// --- FIN SCRIPT DE FORMULARIO ---
