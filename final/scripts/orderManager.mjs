// orderManager.mjs - Handle order/booking operations and persistence

const STORAGE_KEY = 'hh_orders';

export function addToOrder(item) {
  try {
    const orders = getOrders();
    
    // Check if item already in order
    const existingIndex = orders.findIndex(o => o.id === item.id);
    
    if (existingIndex > -1) {
      // Increment quantity
      orders[existingIndex].quantity++;
    } else {
      // Add new order with quantity
      orders.push({
        ...item,
        quantity: 1,
        addedAt: new Date().toISOString(),
        orderId: crypto.getRandomValues(new Uint8Array(4)).join('')
      });
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    return true;
  } catch (error) {
    console.error('Error adding to order:', error);
    return false;
  }
}

export function removeFromOrder(itemId) {
  try {
    const orders = getOrders();
    const filtered = orders.filter(o => o.id !== itemId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing from order:', error);
    return false;
  }
}

export function updateOrderQuantity(itemId, quantity) {
  try {
    const orders = getOrders();
    const order = orders.find(o => o.id === itemId);
    
    if (order) {
      if (quantity <= 0) {
        return removeFromOrder(itemId);
      }
      order.quantity = quantity;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating order quantity:', error);
    return false;
  }
}

export function getOrders() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
}

export function clearOrders() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing orders:', error);
    return false;
  }
}

export function getOrderTotal() {
  const orders = getOrders();
  return orders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
}

export function getOrderCount() {
  const orders = getOrders();
  return orders.reduce((count, order) => count + order.quantity, 0);
}

export function getOrderSummary() {
  const orders = getOrders();
  const total = getOrderTotal();
  const count = getOrderCount();
  
  return {
    items: orders,
    itemCount: orders.length,
    totalQuantity: count,
    total: total.toFixed(2)
  };
}
