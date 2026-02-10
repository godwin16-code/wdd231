// app.mjs - Main application module

import * as menuService from './menuService.mjs';
import * as domUtils from './domUtils.mjs';
import * as storage from './storageManager.mjs';

let allMenuItems = [];
let currentFilter = 'all';

export async function initializeApp() {
  // Setup event listeners
  setupNavigationListeners();
  setupFilterListeners();
  
  // Load menu data
  await loadMenuItems();
  
  // Track visit
  const visitCount = storage.incrementVisitCount();
  console.log(`Visit #${visitCount}`);
}

function setupNavigationListeners() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav ul');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      domUtils.toggleHamburger(nav);
    });
  }
  
  // Close menu when link is clicked
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav) domUtils.closeNav(nav);
    });
  });
}

function setupFilterListeners() {
  const categoryFilters = document.querySelectorAll('[data-filter-category]');
  const dietFilters = document.querySelectorAll('[data-filter-diet]');
  const sortOptions = document.querySelector('[data-sort-menu]');
  
  categoryFilters.forEach(filter => {
    filter.addEventListener('click', (e) => {
      const category = e.target.dataset.filterCategory;
      applyFilters(category, 'all');
    });
  });
  
  dietFilters.forEach(filter => {
    filter.addEventListener('click', (e) => {
      const diet = e.target.dataset.filterDiet;
      applyFilters(currentFilter, diet);
    });
  });
  
  if (sortOptions) {
    sortOptions.addEventListener('change', (e) => {
      renderMenuItems(allMenuItems, e.target.value);
    });
  }
}

async function loadMenuItems() {
  const container = document.querySelector('[data-menu-container]');
  
  if (!container) {
    console.error('Menu container not found');
    return;
  }
  
  try {
    domUtils.showLoading(container);
    allMenuItems = await menuService.getMenuData();
    renderMenuItems(allMenuItems);
    setupMenuCardListeners();
  } catch (error) {
    console.error('Failed to load menu:', error);
    domUtils.showError(container, 'Failed to load menu items');
  }
}

function renderMenuItems(items, sortBy = 'name') {
  const container = document.querySelector('[data-menu-container]');
  
  if (!container) return;
  
  // Apply sort
  let sorted = [...items];
  if (sortBy === 'price-asc') {
    sorted = menuService.sortMenuByPrice(items, 'asc');
  } else if (sortBy === 'price-desc') {
    sorted = menuService.sortMenuByPrice(items, 'desc');
  }
  
  domUtils.clearContainer(container);
  
  const html = sorted.map(item => domUtils.renderMenuCard(item)).join('');
  container.innerHTML = html;
}

function applyFilters(category, diet) {
  currentFilter = category;
  
  try {
    let filtered = menuService.filterMenuByCategory(allMenuItems, category);
    filtered = menuService.filterMenuByDiet(filtered, diet);
    renderMenuItems(filtered);
    setupMenuCardListeners();
  } catch (error) {
    console.error('Error applying filters:', error);
  }
}

function setupMenuCardListeners() {
  const detailButtons = document.querySelectorAll('.view-details');
  
  detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const itemId = parseInt(e.target.dataset.id);
      const item = allMenuItems.find(m => m.id === itemId);
      
      if (item) {
        showMenuItemModal(item);
      }
    });
  });
}

function showMenuItemModal(item) {
  const modal = document.querySelector('[data-modal]');
  const modalContent = document.querySelector('.modal-content');
  
  if (!modal || !modalContent) return;
  
  // Set z-index to ensure modal is on top
  modal.style.zIndex = '1000';
  
  // Generate modal content
  const content = domUtils.renderModal(item);
  modalContent.innerHTML = content;
  
  // Show modal
  domUtils.openModal(modal);
  
  // Setup close listeners
  const closeBtn = modalContent.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      domUtils.closeModal(modal);
    });
  }
  
  // Setup favorite button
  const favBtn = modalContent.querySelector('#add-to-favorites');
  if (favBtn) {
    const isFavorited = storage.isFavorited(item.id);
    favBtn.textContent = isFavorited ? '♥ Remove from Favorites' : '♥ Add to Favorites';
    favBtn.style.backgroundColor = isFavorited ? '#c44' : 'var(--primary-color)';
    
    favBtn.addEventListener('click', () => {
      const wasAdded = storage.saveFavorite(item);
      if (wasAdded) {
        favBtn.textContent = '♥ Remove from Favorites';
        favBtn.style.backgroundColor = '#c44';
        alert('Added to favorites!');
      } else {
        storage.removeFavorite(item.id);
        favBtn.textContent = '♥ Add to Favorites';
        favBtn.style.backgroundColor = 'var(--primary-color)';
        alert('Removed from favorites!');
      }
    });
  }
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      domUtils.closeModal(modal);
    }
  });
}

export function displayFavorites() {
  const container = document.querySelector('[data-favorites-container]');
  if (!container) return;
  
  const favorites = storage.getFavorites();
  container.innerHTML = domUtils.createReservationSummary(favorites);
}
