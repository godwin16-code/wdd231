// domUtils.mjs - DOM manipulation and rendering utilities

export function renderMenuCard(item) {
  return `
    <div class="menu-card" data-id="${item.id}">
      <div class="menu-card-image">
        <picture>
          <img src="images/${item.image || 'menu-placeholder.svg'}" alt="${item.name} image" loading="lazy" class="menu-card-image-el" onerror="this.onerror=null;this.src='images/menu-placeholder.svg'">
        </picture>
      </div>
      <div class="menu-card-header">${item.name}</div>
      <div class="menu-card-body">
        <h3 class="sr-only">${item.name}</h3>
        <p>${item.description}</p>
        <div class="menu-card-info">
          <strong>Category:</strong> ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}
        </div>
        <div class="menu-card-info">
          <strong>From:</strong> ${item.farmPartner}
        </div>
        <div class="menu-card-price">$${item.price.toFixed(2)}</div>
        <div class="menu-card-footer">
          <div>
            ${item.vegetarian ? '<span class="menu-badge">Vegetarian</span>' : ''}
            ${item.seasonal ? '<span class="menu-badge">Seasonal</span>' : ''}
          </div>
          <button class="btn btn-small view-details" data-id="${item.id}">Details</button>
        </div>
      </div>
    </div>
  `;
}

export function renderModal(item) {
  return `
    <div style="display:block; text-align:center; margin-bottom:1rem;">
      <picture style="display:block; margin:0 auto 1rem; max-width:400px;">
        <img src="images/${item.image || 'menu-placeholder.svg'}" alt="${item.name} image" loading="lazy" style="width:100%; height:auto; border-radius:8px;" onerror="this.onerror=null;this.src='images/menu-placeholder.svg'">
      </picture>
    </div>
    <div class="modal-header">
      <h2>${item.name}</h2>
      <button class="modal-close" aria-label="Close modal">×</button>
    </div>
    <div class="modal-body">
      <p><strong>Description:</strong> ${item.description}</p>
      <p><strong>Category:</strong> ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
      <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
      <p><strong>Farm Partner:</strong> ${item.farmPartner}</p>
      <p><strong>Seasonal:</strong> ${item.seasonal ? 'Yes' : 'No'}</p>
      <p><strong>Vegetarian:</strong> ${item.vegetarian ? 'Yes' : 'No'}</p>
      <button class="btn" id="add-to-favorites">♥ Add to Favorites</button>
    </div>
  `;
}

export function clearContainer(container) {
  if (container) {
    container.innerHTML = '';
  }
}

export function showLoading(container) {
  clearContainer(container);
  container.innerHTML = '<div class="loading">Loading menu items</div>';
}

export function showError(container, message) {
  clearContainer(container);
  container.innerHTML = `<div style="color: #c44; padding: 2rem; text-align: center;">Error: ${message}</div>`;
}

export function toggleHamburger(nav) {
  nav.classList.toggle('show');
}

export function closeNav(nav) {
  nav.classList.remove('show');
}

export function openModal(modal) {
  modal.classList.add('show');
}

export function closeModal(modal) {
  modal.classList.remove('show');
}

export function createReservationSummary(favoritesData) {
  const favorites = favoritesData || [];
  if (favorites.length === 0) {
    return '<p>No favorite items saved yet.</p>';
  }
  
  return `
    <div>
      <h3>Your Favorite Items:</h3>
      <ul>
        ${favorites.map(fav => `
          <li>
            <strong>${fav.name}</strong> - $${fav.price.toFixed(2)}
            <br><small>${fav.description}</small>
          </li>
        `).join('')}
      </ul>
      <p style="margin-top: 1rem; font-weight: bold;">
        Total Items: ${favorites.length}
      </p>
    </div>
  `;
}
