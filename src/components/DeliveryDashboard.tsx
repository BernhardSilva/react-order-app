import React from 'react';
import { orders, currentUser } from '../App';

const DeliveryDashboard: React.FC = () => {
  const user = currentUser.value;
  const assignedOrders = orders.value.filter(order => 
    order.assignedTo === user.username && order.status === 'ready_for_delivery'
  );

  const handleDelivered = (orderId: number) => {
    orders.value = orders.value.map(order =>
      order.id === orderId ? { ...order, status: 'delivered' } : order
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Delivery Dashboard</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-2">Your Assigned Orders</h3>
        {assignedOrders.length === 0 ? (
          <p>No orders assigned for delivery.</p>
        ) : (
          <ul>
            {assignedOrders.map(order => (
              <li key={order.id} className="mb-2 p-2 bg-gray-100 rounded">
                <span className="font-medium">Order #{order.id}</span>: {order.items.join(', ')}
                <button
                  className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelivered(order.id)}
                >
                  Mark as Delivered
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;