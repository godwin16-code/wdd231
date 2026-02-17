import { initializeApp, displayFavorites } from './app.mjs';

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  displayFavorites();
});

// Update favorites display when storage changes
window.addEventListener('storage', () => {
  displayFavorites();
});
