// --- INICIO SCRIPT DE PRESENTACIÓN (site.js) ---

// La variable 'translations' se carga desde 'translations.js' (que debe cargarse ANTES que este script)

let currentLanguage = 'es'; // Default language

// Función para cambiar el idioma
function changeLanguage(lang) {
    if (!translations[lang]) return; // Salir si el idioma no existe

    currentLanguage = lang;
    document.documentElement.lang = lang; // Actualizar el atributo lang del HTML

    // Actualizar todo el texto basado en data-lang-key
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Actualizar estilos de los botones de idioma
    const esButton = document.getElementById('lang-es');
    const enButton = document.getElementById('lang-en');
    if (lang === 'es') {
        esButton.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
        esButton.classList.add('bg-blue-600', 'text-white');
        enButton.classList.remove('bg-blue-600', 'text-white');
        enButton.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
    } else {
        enButton.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
        enButton.classList.add('bg-blue-600', 'text-white');
        esButton.classList.remove('bg-blue-600', 'text-white');
        esButton.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
    }
}

// --- Lógica del Botón "Volver Arriba" ---
const backToTopButton = document.getElementById('back-to-top');
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
};

// --- Lógica del Año en el Footer ---
document.getElementById('current-year').textContent = new Date().getFullYear();

// --- Configuración Inicial del Idioma al Cargar ---
changeLanguage(currentLanguage); // Establecer el idioma por defecto

// --- FIN SCRIPT DE PRESENTACIÓN ---
