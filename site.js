// --- INICIO SCRIPT DE PRESENTACIÓN (site.js) ---

// La variable 'translations' se carga desde 'translations.js'

let currentLanguage = 'es'; // Default language

// Función para cambiar el idioma
function changeLanguage(lang) {
    if (!translations[lang]) return; // Salir si el idioma no existe

    currentLanguage = lang;
    document.documentElement.lang = lang; // Actualizar el atributo lang del HTML

    // --- (NUEVO) Actualización de Metadatos (SEO) ---
    const metaTitle = document.getElementById('page-title');
    const metaDescription = document.getElementById('page-description');
    
    if (metaTitle && translations[lang].meta_title) {
        document.title = translations[lang].meta_title; 
    }
    if (metaDescription && translations[lang].meta_description) {
        metaDescription.setAttribute('content', translations[lang].meta_description);
    }
    // --- Fin de Actualización ---

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

// --- (NUEVO) Lógica del Menú Móvil ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mainMenu = document.getElementById('main-menu');
const menuOpenIcon = document.getElementById('menu-open-icon');
const menuCloseIcon = document.getElementById('menu-close-icon');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        mainMenu.classList.toggle('hidden');
        mainMenu.classList.toggle('flex'); // Asegura que sea flex al mostrarse
        menuOpenIcon.classList.toggle('hidden');
        menuCloseIcon.classList.toggle('hidden');
    });
}

// (NUEVO) Cierra el menú móvil al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        // Solo cierra si el menú está visible en móvil
        if (!mainMenu.classList.contains('md:flex')) {
            mainMenu.classList.add('hidden');
            mainMenu.classList.remove('flex');
            menuOpenIcon.classList.remove('hidden');
            menuCloseIcon.classList.add('hidden');
        }
    });
});
// --- Fin Lógica Menú Móvil ---

// --- Configuración Inicial del Idioma al Cargar ---
changeLanguage(currentLanguage); // Establecer el idioma por defecto

// --- FIN SCRIPT DE PRESENTACIÓN ---
