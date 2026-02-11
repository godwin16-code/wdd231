// app.mjs - Main application module

import * as menuService from './menuService.mjs';
import * as domUtils from './domUtils.mjs';
import * as storage from './storageManager.mjs';
import * as orderManager from './orderManager.mjs';
import * as themeManager from './themeManager.mjs';
import * as testimonialsModule from './testimonials.mjs';

let allMenuItems = [];
let currentFilter = 'all';
let currentDietFilter = 'all';
let currentSearchTerm = '';
let currentPriceMin = 0;
let currentPriceMax = 50;

// Testimonials carousel state
let currentTestimonialIndex = 0;
let testimonialAutoplayInterval = null;

export async function initializeApp() {
  // Initialize theme (dark/light mode)
  themeManager.initializeTheme();
  
  // Setup event listeners
  setupNavigationListeners();
  setupFilterListeners();
  setupTestimonials();
  
  // Load menu data
  await loadMenuItems();
  
  // Update order counter
  updateOrderCounter();
  
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
  const searchInput = document.getElementById('menu-search');
  const priceMinInput = document.getElementById('price-min');
  const priceMaxInput = document.getElementById('price-max');
  
  categoryFilters.forEach(filter => {
    filter.addEventListener('click', (e) => {
      const category = e.target.dataset.filterCategory;
      currentFilter = category;
      applyAllFilters();
    });
  });
  
  dietFilters.forEach(filter => {
    filter.addEventListener('click', (e) => {
      const diet = e.target.dataset.filterDiet;
      currentDietFilter = diet;
      applyAllFilters();
    });
  });
  
  if (sortOptions) {
    sortOptions.addEventListener('change', (e) => {
      const filtered = getFilteredItems();
      renderMenuItems(filtered, e.target.value);
    });
  }
  
  // Search handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value;
      applyAllFilters();
    });
  }
  
  // Price range handlers
  if (priceMinInput && priceMaxInput) {
    priceMinInput.addEventListener('input', (e) => {
      currentPriceMin = parseFloat(e.target.value);
      document.getElementById('price-min-display').textContent = currentPriceMin;
      applyAllFilters();
    });
    
    priceMaxInput.addEventListener('input', (e) => {
      currentPriceMax = parseFloat(e.target.value);
      document.getElementById('price-max-display').textContent = currentPriceMax;
      applyAllFilters();
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

function getFilteredItems() {
  let filtered = allMenuItems;
  
  // Apply category filter
  filtered = menuService.filterMenuByCategory(filtered, currentFilter);
  
  // Apply diet filter
  filtered = menuService.filterMenuByDiet(filtered, currentDietFilter);
  
  // Apply search filter
  filtered = menuService.searchMenuItems(filtered, currentSearchTerm);
  
  // Apply price filter
  filtered = menuService.filterByPriceRange(filtered, currentPriceMin, currentPriceMax);
  
  return filtered;
}

function applyAllFilters() {
  try {
    const filtered = getFilteredItems();
    renderMenuItems(filtered);
    setupMenuCardListeners();
  } catch (error) {
    console.error('Error applying filters:', error);
  }
}

function applyFilters(category, diet) {
  currentFilter = category;
  currentDietFilter = diet;
  applyAllFilters();
}

function setupMenuCardListeners() {
  const detailButtons = document.querySelectorAll('.view-details');
  const bookButtons = document.querySelectorAll('.book-item');
  
  detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const itemId = parseInt(e.target.dataset.id);
      const item = allMenuItems.find(m => m.id === itemId);
      
      if (item) {
        showMenuItemModal(item);
      }
    });
  });
  
  bookButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const itemId = parseInt(e.target.dataset.id);
      const item = allMenuItems.find(m => m.id === itemId);
      
      if (item) {
        orderManager.addToOrder(item);
        updateOrderCounter();
        showBookingToast(`${item.name} added to order!`);
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

function updateOrderCounter() {
  const orderCount = orderManager.getOrderCount();
  let badge = document.querySelector('[data-order-badge]');
  
  if (!badge) {
    // Create badge if it doesn't exist
    const nav = document.querySelector('nav');
    if (nav) {
      badge = document.createElement('span');
      badge.setAttribute('data-order-badge', '');
      badge.className = 'order-badge';
      nav.appendChild(badge);
    }
  }
  
  if (badge) {
    if (orderCount > 0) {
      badge.textContent = orderCount;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }
}

function showBookingToast(message) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast notification';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

export function displayFavorites() {
  const container = document.querySelector('[data-favorites-container]');
  if (!container) return;
  
  const favorites = storage.getFavorites();
  container.innerHTML = domUtils.createReservationSummary(favorites);
}
function initializeTestimonials() {
  const testimonials = testimonialsModule.getTestimonials();
  
  if (testimonials.length === 0) return;
  
  // Initialize dots
  const dotsContainer = document.getElementById('testimonial-dots');
  if (dotsContainer) {
    dotsContainer.innerHTML = testimonials
      .map((_, index) => `<button class="dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to testimonial ${index + 1}"></button>`)
      .join('');
    
    // Add dot click listeners
    dotsContainer.querySelectorAll('.dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        currentTestimonialIndex = parseInt(e.target.dataset.index);
        displayTestimonial(currentTestimonialIndex);
        resetAutoplay();
      });
    });
  }
  
  // Setup navigation buttons
  const prevBtn = document.querySelector('.prev-testimonial');
  const nextBtn = document.querySelector('.next-testimonial');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
      displayTestimonial(currentTestimonialIndex);
      resetAutoplay();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      displayTestimonial(currentTestimonialIndex);
      resetAutoplay();
    });
  }
  
  // Display first testimonial
  displayTestimonial(0);
  
  // Start autoplay
  startAutoplay();
}

function displayTestimonial(index) {
  const testimonials = testimonialsModule.getTestimonials();
  const testimonial = testimonials[index];
  
  if (!testimonial) return;
  
  // Update content
  const ratingEl = document.getElementById('testimonial-rating');
  const textEl = document.getElementById('testimonial-text');
  const authorEl = document.getElementById('testimonial-author');
  const titleEl = document.getElementById('testimonial-title');
  
  if (ratingEl) ratingEl.textContent = '★'.repeat(testimonial.rating);
  if (textEl) textEl.textContent = `"${testimonial.text}"`;
  if (authorEl) authorEl.textContent = `— ${testimonial.name}`;
  if (titleEl) titleEl.textContent = testimonial.title;
  
  // Update active dot
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function startAutoplay() {
  const testimonials = testimonialsModule.getTestimonials();
  if (testimonials.length <= 1) return;
  
  testimonialAutoplayInterval = setInterval(() => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    displayTestimonial(currentTestimonialIndex);
  }, 5000); // Change every 5 seconds
}

function resetAutoplay() {
  if (testimonialAutoplayInterval) {
    clearInterval(testimonialAutoplayInterval);
  }
  startAutoplay();
}

export function setupTestimonials() {
  // Check if we're on a page with testimonials
  if (document.getElementById('testimonial-content')) {
    initializeTestimonials();
  }
}