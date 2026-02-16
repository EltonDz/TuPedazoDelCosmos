import { appVariables } from "./variables.js";

// ==================== FUNCIONES DE IDIOMA ====================
export function changeLanguage(lang) {
  appVariables.currentLanguage = lang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  applyTranslations();
  console.log('Idioma cambiado a:', lang);
}

export function applyTranslations() {
  const t = appVariables.translations[appVariables.currentLanguage];
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (t[key]) el.textContent = t[key];
  });
}