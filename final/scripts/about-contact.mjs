import { setupNavigation } from './navigation.mjs';
import * as themeManager from './themeManager.mjs';

document.addEventListener('DOMContentLoaded', () => {
  themeManager.initializeTheme();
  setupNavigation();
});
