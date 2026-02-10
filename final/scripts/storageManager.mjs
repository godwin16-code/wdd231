// storageManager.mjs - Handle local storage operations

const STORAGE_KEYS = {
  FAVORITES: 'hh_favorites',
  USER_PREFS: 'hh_preferences',
  VISIT_COUNT: 'hh_visits'
};

export function saveFavorite(item) {
  try {
    const favorites = getFavorites();
    
    // Check if item already exists
    const exists = favorites.some(fav => fav.id === item.id);
    if (!exists) {
      favorites.push(item);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving favorite:', error);
    return false;
  }
}

export function removeFavorite(itemId) {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter(item => item.id !== itemId);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return false;
  }
}

export function getFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
}

export function isFavorited(itemId) {
  const favorites = getFavorites();
  return favorites.some(fav => fav.id === itemId);
}

export function clearFavorites() {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([]));
    return true;
  } catch (error) {
    console.error('Error clearing favorites:', error);
    return false;
  }
}

export function saveUserPreferences(prefs) {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PREFS, JSON.stringify(prefs));
    return true;
  } catch (error) {
    console.error('Error saving preferences:', error);
    return false;
  }
}

export function getUserPreferences() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFS);
    return stored ? JSON.parse(stored) : {
      dietaryRestriction: 'all',
      sortBy: 'name'
    };
  } catch (error) {
    console.error('Error getting preferences:', error);
    return {
      dietaryRestriction: 'all',
      sortBy: 'name'
    };
  }
}

export function incrementVisitCount() {
  try {
    let count = parseInt(localStorage.getItem(STORAGE_KEYS.VISIT_COUNT) || 0);
    count++;
    localStorage.setItem(STORAGE_KEYS.VISIT_COUNT, count.toString());
    return count;
  } catch (error) {
    console.error('Error incrementing visit count:', error);
    return 1;
  }
}

export function getVisitCount() {
  try {
    return parseInt(localStorage.getItem(STORAGE_KEYS.VISIT_COUNT) || 0);
  } catch (error) {
    console.error('Error getting visit count:', error);
    return 0;
  }
}
