import * as orderManager from './orderManager.mjs';
import * as domUtils from './domUtils.mjs';
import * as themeManager from './themeManager.mjs';

// Initialize orders page
function initializeOrdersPage() {
  themeManager.initializeTheme();
  setupNavigationListeners();
  displayOrders();
  setupActionListeners();
  updateOrderSummary();
}

function setupNavigationListeners() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav ul');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      domUtils.toggleHamburger(nav);
    });
  }
  
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav) domUtils.closeNav(nav);
    });
  });
}

function displayOrders() {
  const container = document.querySelector('[data-orders-container]');
  const orders = orderManager.getOrders();
  
  if (!container) return;
  
  if (orders.length === 0) {
    container.innerHTML = `
      <div class="empty-orders">
        <p>No items in your order yet.</p>
        <p><a href="menu.html" class="btn btn-primary">Browse Menu</a></p>
      </div>
    `;
    document.getElementById('proceed-to-reservation').style.display = 'none';
    document.getElementById('clear-orders').style.display = 'none';
    return;
  }
  
  const html = orders.map(item => createOrderItemHTML(item)).join('');
  container.innerHTML = html;
  
  // Setup event listeners for quantity controls and delete buttons
  setupOrderItemListeners();
  
  // Show action buttons
  document.getElementById('proceed-to-reservation').style.display = 'inline-block';
  document.getElementById('clear-orders').style.display = 'inline-block';
}

function createOrderItemHTML(item) {
  const price = parseFloat(item.price).toFixed(2);
  const itemTotal = (parseFloat(item.price) * item.quantity).toFixed(2);
  
  return `
    <div class="order-item" data-order-id="${item.orderId}">
      <div class="order-item-image">
        <img src="images/${item.image}" 
             alt="${item.name}" 
             onerror="this.onerror=null;this.src='images/menu-placeholder.svg'">
      </div>
      <div class="order-item-details">
        <h3>${item.name}</h3>
        <p class="order-item-price">$${price}</p>
        <p class="order-item-category">${item.category}</p>
      </div>
      <div class="order-item-quantity">
        <button class="qty-btn minus" data-order-id="${item.orderId}">−</button>
        <input type="number" class="qty-input" value="${item.quantity}" 
               min="1" data-order-id="${item.orderId}">
        <button class="qty-btn plus" data-order-id="${item.orderId}">+</button>
      </div>
      <div class="order-item-total">
        <span>$${itemTotal}</span>
      </div>
      <button class="btn-remove" data-order-id="${item.orderId}" 
              aria-label="Remove ${item.name}">×</button>
    </div>
  `;
}

function setupOrderItemListeners() {
  // Quantity decrease buttons
  document.querySelectorAll('.qty-btn.minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const orderId = e.target.dataset.orderId;
      const item = orderManager.getOrders().find(o => o.orderId === orderId);
      if (item && item.quantity > 1) {
        orderManager.updateOrderQuantity(orderId, item.quantity - 1);
        displayOrders();
        updateOrderSummary();
      }
    });
  });
  
  // Quantity increase buttons
  document.querySelectorAll('.qty-btn.plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const orderId = e.target.dataset.orderId;
      const item = orderManager.getOrders().find(o => o.orderId === orderId);
      if (item) {
        orderManager.updateOrderQuantity(orderId, item.quantity + 1);
        displayOrders();
        updateOrderSummary();
      }
    });
  });
  
  // Quantity input fields
  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const orderId = e.target.dataset.orderId;
      const qty = Math.max(1, parseInt(e.target.value) || 1);
      orderManager.updateOrderQuantity(orderId, qty);
      displayOrders();
      updateOrderSummary();
    });
  });
  
  // Remove buttons
  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const orderId = e.target.dataset.orderId;
      const item = orderManager.getOrders().find(o => o.orderId === orderId);
      if (item && confirm(`Remove ${item.name} from order?`)) {
        orderManager.removeFromOrder(orderId);
        displayOrders();
        updateOrderSummary();
      }
    });
  });
}

function updateOrderSummary() {
  const summary = orderManager.getOrderSummary();
  
  document.querySelector('[data-item-count]').textContent = summary.itemCount;
  document.querySelector('[data-total-quantity]').textContent = summary.totalQuantity;
  document.querySelector('[data-order-total]').textContent = `$${summary.total.toFixed(2)}`;
}

function setupActionListeners() {
  const proceedBtn = document.getElementById('proceed-to-reservation');
  const clearBtn = document.getElementById('clear-orders');
  
  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      window.location.href = 'reservation.html';
    });
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear all items from your order?')) {
        orderManager.clearOrders();
        displayOrders();
        updateOrderSummary();
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeOrdersPage);
