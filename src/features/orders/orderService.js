const ORDER_KEY = "quickcart_orders";

export const getOrders = () => {
  const orders = localStorage.getItem(ORDER_KEY);
  return orders ? JSON.parse(orders) : [];
};

export const saveOrders = (orders) => {
  localStorage.setItem(
    ORDER_KEY,
    JSON.stringify(orders)
  );
};

export const clearOrders = () => {
  localStorage.removeItem(ORDER_KEY);
};