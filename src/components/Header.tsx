import React from 'react';
import { Link } from 'react-router-dom';
import { currentUser } from '../App';
import { Utensils, Truck, User, Menu, BarChart2, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const user = currentUser.value;

  const handleLogout = () => {
    currentUser.value = null;
  };

  if (!user) return null;

  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex justify-between items-center">
        <li className="font-bold text-xl">Restaurant Order Management</li>
        <div className="flex space-x-4">
          {(user.role === 'delivery' || user.role === 'owner') && (
            <li>
              <Link to="/delivery" className="flex items-center">
                <Truck className="mr-2" /> Delivery
              </Link>
            </li>
          )}
          {(user.role === 'kitchen' || user.role === 'owner') && (
            <li>
              <Link to="/kitchen" className="flex items-center">
                <Utensils className="mr-2" /> Kitchen
              </Link>
            </li>
          )}
          {user.role === 'owner' && (
            <>
              <li>
                <Link to="/owner" className="flex items-center">
                  <User className="mr-2" /> Owner
                </Link>
              </li>
              <li>
                <Link to="/menu" className="flex items-center">
                  <Menu className="mr-2" /> Menu
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="flex items-center">
                  <BarChart2 className="mr-2" /> Analytics
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/profile" className="flex items-center">
              <User className="mr-2" /> Profile
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="flex items-center">
              <LogOut className="mr-2" /> Logout
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Header;