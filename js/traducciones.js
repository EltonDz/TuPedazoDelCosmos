import { appVariables } from "./variables.js";
import { mostrarPrimerosReg } from "./lista-recientes.js"

// ==================== FUNCIONES DE IDIOMA ====================
export function changeLanguage(lang) {
  appVariables.currentLanguage = lang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  applyTranslations();
  console.log('Idioma cambiado a:', lang);
  
  mostrarPrimerosReg();
}

export function applyTranslations() {
  const t = appVariables.translations[appVariables.currentLanguage];
  
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (t[key]) el.textContent = t[key];
  });

  document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
    const key = el.getAttribute('data-translate-placeholder');
    if (t[key]) el.placeholder = t[key];
  });
}