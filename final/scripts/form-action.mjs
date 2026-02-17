import { displaySubmittedData } from './formHandler.js';
import * as themeManager from './themeManager.mjs';
import { setupNavigation } from './navigation.mjs';

document.addEventListener('DOMContentLoaded', () => {
  themeManager.initializeTheme();
  const params = new URLSearchParams(window.location.search);
  displaySubmittedData(params);
  setupNavigation();
});
