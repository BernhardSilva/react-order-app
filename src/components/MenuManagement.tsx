import React, { useState } from 'react';
import { menu } from '../App';

const MenuManagement: React.FC = () => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const addMenuItem = () => {
    if (newItemName && newItemPrice) {
      const newItem = {
        id: menu.value.length + 1,
        name: newItemName,
        price: parseFloat(newItemPrice),
      };
      menu.value = [...menu.value, newItem];
      setNewItemName('');
      setNewItemPrice('');
    }
  };

  const removeMenuItem = (id: number) => {
    menu.value = menu.value.filter(item => item.id !== id);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Menu Management</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Add New Menu Item</h3>
        <div className="flex mb-2">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Item name"
            className="flex-grow border rounded-l px-2 py-1 mr-2"
          />
          <input
            type="number"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
            placeholder="Price"
            className="w-24 border rounded px-2 py-1 mr-2"
          />
          <button
            onClick={addMenuItem}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Add Item
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Current Menu</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menu.value.map(item => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2">${item.price.toFixed(2)}</td>
                <td className="p-2">
                  <button
                    onClick={() => removeMenuItem(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuManagement;