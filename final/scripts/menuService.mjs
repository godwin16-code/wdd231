// menuService.mjs - Handles menu data fetching and processing

export async function getMenuData() {
  try {
    // Resolve JSON path relative to this module file so it works when imported
    const url = new URL('../data/menu.json', import.meta.url);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.menu;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    throw error;
  }
}

export function filterMenuByCategory(items, category) {
  if (category === 'all') return items;
  return items.filter(item => item.category === category);
}

export function filterMenuByDiet(items, dietType) {
  if (dietType === 'all') return items;
  if (dietType === 'vegetarian') return items.filter(item => item.vegetarian);
  if (dietType === 'seasonal') return items.filter(item => item.seasonal);
  return items;
}

export function sortMenuByPrice(items, order = 'asc') {
  const sorted = [...items];
  return sorted.sort((a, b) => {
    return order === 'asc' ? a.price - b.price : b.price - a.price;
  });
}

export function getUniqueCategories(items) {
  return [...new Set(items.map(item => item.category))];
}

export function getUniqueFarmPartners(items) {
  return [...new Set(items.map(item => item.farmPartner))].sort();
}
export function searchMenuItems(items, searchTerm) {
  if (!searchTerm || searchTerm.trim() === '') return items;
  
  const term = searchTerm.toLowerCase();
  return items.filter(item => {
    return (
      item.name.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.farmPartner.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  });
}

export function filterByPriceRange(items, minPrice, maxPrice) {
  return items.filter(item => {
    const price = parseFloat(item.price);
    return price >= minPrice && price <= maxPrice;
  });
}