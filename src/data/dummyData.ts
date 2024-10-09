export const dummyOrders = [
  { id: 1, status: 'pending', items: ['Pizza', 'Coke'], assignedTo: null },
  { id: 2, status: 'in_progress', items: ['Burger', 'Fries'], assignedTo: 'delivery1' },
  { id: 3, status: 'ready_for_delivery', items: ['Salad', 'Water'], assignedTo: null },
  { id: 4, status: 'delivered', items: ['Pasta', 'Wine'], assignedTo: 'delivery1' },
];

export const dummyMenu = [
  { id: 1, name: 'Pizza', price: 10 },
  { id: 2, name: 'Burger', price: 8 },
  { id: 3, name: 'Coke', price: 2 },
  { id: 4, name: 'Fries', price: 3 },
  { id: 5, name: 'Salad', price: 6 },
  { id: 6, name: 'Pasta', price: 9 },
  { id: 7, name: 'Water', price: 1 },
  { id: 8, name: 'Wine', price: 12 },
];

export const dummyUsers = [
  { id: 1, username: 'admin', password: 'admin', role: 'owner', name: 'Restaurant Owner' },
  { id: 2, username: 'kitchen1', password: 'kitchen1', role: 'kitchen', name: 'Chef John' },
  { id: 3, username: 'delivery1', password: 'delivery1', role: 'delivery', name: 'Delivery Guy Mike' },
];

export const fetchDummyData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        orders: dummyOrders,
        menu: dummyMenu,
        users: dummyUsers,
      });
    }, 1000); // Simulate a 1-second delay
  });
};