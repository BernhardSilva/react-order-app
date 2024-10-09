import React from 'react';
import { orders } from '../App';

const KitchenDashboard: React.FC = () => {
  const pendingOrders = orders.value.filter(order => 
    order.status === 'pending' || order.status === 'in_progress'
  );

  const handleStatusUpdate = (orderId: number, newStatus: string) => {
    orders.value = orders.value.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Kitchen Dashboard</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-2">Pending Orders</h3>
        {pendingOrders.length === 0 ? (
          <p>No pending orders.</p>
        ) : (
          <ul>
            {pendingOrders.map(order => (
              <li key={order.id} className="mb-2 p-2 bg-gray-100 rounded">
                <span className="font-medium">Order #{order.id}</span>: {order.items.join(', ')}
                <div className="mt-2">
                  <button
                    className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleStatusUpdate(order.id, 'in_progress')}
                  >
                    Start Preparing
                  </button>
                  <button
                    className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleStatusUpdate(order.id, 'ready_for_delivery')}
                  >
                    Ready for Delivery
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                  >
                    Cancel Order
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default KitchenDashboard;