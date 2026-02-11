// themeManager.mjs - Dark mode management

const STORAGE_KEY = 'hh_theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

export function initializeTheme() {
  // Check localStorage for saved theme
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  
  // Check system preference if no saved theme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const theme = savedTheme || (prefersDark ? DARK_THEME : LIGHT_THEME);
  
  setTheme(theme);
  setupThemeToggle();
}

export function setTheme(theme) {
  if (theme === DARK_THEME) {
    document.documentElement.setAttribute('data-theme', DARK_THEME);
    localStorage.setItem(STORAGE_KEY, DARK_THEME);
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem(STORAGE_KEY, LIGHT_THEME);
  }
  
  updateThemeButton();
}

export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  setTheme(newTheme);
}

export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
}

function updateThemeButton() {
  const button = document.getElementById('theme-toggle');
  if (button) {
    const currentTheme = getCurrentTheme();
    button.textContent = currentTheme === DARK_THEME ? '☀️' : '🌙';
    button.title = currentTheme === DARK_THEME ? 'Switch to light mode' : 'Switch to dark mode';
  }
}

function setupThemeToggle() {
  const button = document.getElementById('theme-toggle');
  if (button) {
    button.addEventListener('click', toggleTheme);
  }
}
