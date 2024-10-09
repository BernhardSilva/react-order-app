import React, { useState } from 'react';
import { orders, users, menu } from '../App';

const OwnerDashboard: React.FC = () => {
  const [newItem, setNewItem] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState('');

  const addOrder = () => {
    if (newItem.trim()) {
      const newOrder = {
        id: orders.value.length + 1,
        status: 'pending',
        items: [newItem.trim()],
        assignedTo: null,
      };
      orders.value = [...orders.value, newOrder];
      setNewItem('');
    }
  };

  const assignDelivery = (orderId: number) => {
    if (selectedDelivery) {
      orders.value = orders.value.map(order =>
        order.id === orderId ? { ...order, assignedTo: selectedDelivery } : order
      );
      setSelectedDelivery('');
    }
  };

  const deliveryUsers = users.value.filter(user => user.role === 'delivery');

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Owner Dashboard</h2>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h3 className="text-xl font-semibold mb-2">Add New Order</h3>
        <div className="flex mb-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Enter item name"
            className="flex-grow border rounded-l px-2 py-1"
          />
          <button
            onClick={addOrder}
            className="bg-blue-500 text-white px-4 py-1 rounded-r"
          >
            Add Order
          </button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-2">All Orders</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Items</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Assigned To</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.value.map(order => (
              <tr key={order.id} className="border-b">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.items.join(', ')}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">{order.assignedTo || 'Unassigned'}</td>
                <td className="p-2">
                  {order.status === 'ready_for_delivery' && !order.assignedTo && (
                    <div className="flex items-center">
                      <select
                        value={selectedDelivery}
                        onChange={(e) => setSelectedDelivery(e.target.value)}
                        className="border rounded px-2 py-1 mr-2"
                      >
                        <option value="">Select Delivery</option>
                        {deliveryUsers.map(user => (
                          <option key={user.id} value={user.username}>{user.name}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => assignDelivery(order.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Assign
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerDashboard;