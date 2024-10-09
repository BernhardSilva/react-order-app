import React from 'react';
import { orders, menu } from '../App';

const AnalyticsDashboard: React.FC = () => {
  const totalOrders = orders.value.length;
  const completedOrders = orders.value.filter(order => order.status === 'delivered').length;
  const completionRate = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;

  const itemCounts = orders.value.reduce((acc, order) => {
    order.items.forEach(item => {
      acc[item] = (acc[item] || 0) + 1;
    });
    return acc;
  }, {});

  const mostPopularItem = Object.entries(itemCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];

  const averageOrderValue = orders.value.reduce((total, order) => {
    const orderTotal = order.items.reduce((sum, item) => {
      const menuItem = menu.value.find(m => m.name === item);
      return sum + (menuItem ? menuItem.price : 0);
    }, 0);
    return total + orderTotal;
  }, 0) / totalOrders;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Order Completion Rate</h3>
          <p className="text-3xl font-bold">{completionRate.toFixed(2)}%</p>
          <p>({completedOrders} out of {totalOrders} orders)</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Most Popular Item</h3>
          <p className="text-3xl font-bold">{mostPopularItem}</p>
          <p>Ordered {itemCounts[mostPopularItem]} times</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Average Order Value</h3>
          <p className="text-3xl font-bold">${averageOrderValue.toFixed(2)}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold">${(averageOrderValue * totalOrders).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;