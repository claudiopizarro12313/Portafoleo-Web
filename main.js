// ===== CONFIGURACIÓN =====
// Escribe tu número de WhatsApp con código de país, solo dígitos, sin + ni espacios.
// Ejemplo de Chile: "56912345678"
// Mientras esté vacío, los botones de WhatsApp quedan ocultos.
const WHATSAPP_NUMERO = "+56969069828";

// Correo que recibe los mensajes del formulario
const CORREO = "claudiopizarro440@gmail.com";

// ===== IDIOMA =====
const langBtn = document.getElementById('lang-btn');
let currentLang = 'es';

const MENSAJES_WHATSAPP = {
    es: 'Hola Claudio, vi tu portafolio y me gustaría cotizar un proyecto.',
    en: 'Hi Claudio, I saw your portfolio and I would like a quote for a project.'
};

const TEXTOS_FORMULARIO = {
    es: { asunto: 'Consulta de', sufijo: 'desde tu portafolio', estado: 'Abriendo Gmail…' },
    en: { asunto: 'Inquiry from', sufijo: 'via your portfolio', estado: 'Opening Gmail…' }
};

langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    langBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';
    updateLanguage(currentLang);
});

function updateLanguage(lang) {
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll('[data-es][data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (element.children.length > 0 && element.querySelector('i')) {
            const icon = element.querySelector('i').outerHTML;
            element.innerHTML = `${icon} ${text}`;
        } else {
            element.textContent = text;
        }
    });
    actualizarWhatsApp();
}

// ===== WHATSAPP =====
function actualizarWhatsApp() {
    document.querySelectorAll('.wa').forEach(enlace => {
        if (!WHATSAPP_NUMERO) {
            enlace.hidden = true;
            return;
        }
        enlace.hidden = false;
        enlace.href = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(MENSAJES_WHATSAPP[currentLang])}`;
    });
}

// ===== FORMULARIO: abre Gmail con el mensaje listo para enviar =====
const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const t = TEXTOS_FORMULARIO[currentLang];
    const nombre = document.getElementById('nombre').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    const url = 'https://mail.google.com/mail/?view=cm&fs=1' +
        `&to=${encodeURIComponent(CORREO)}` +
        `&su=${encodeURIComponent(`${t.asunto} ${nombre} ${t.sufijo}`)}` +
        `&body=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank', 'noopener');
    document.getElementById('form-estado').textContent = t.estado;
});

actualizarWhatsApp();
