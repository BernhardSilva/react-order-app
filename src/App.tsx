import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { signal } from '@preact/signals-react';
import Header from './components/Header';
import Login from './components/Login';
import DeliveryDashboard from './components/DeliveryDashboard';
import KitchenDashboard from './components/KitchenDashboard';
import OwnerDashboard from './components/OwnerDashboard';
import UserProfile from './components/UserProfile';
import MenuManagement from './components/MenuManagement';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { fetchDummyData } from './data/dummyData';

export const currentUser = signal(null);
export const orders = signal([]);
export const menu = signal([]);
export const users = signal([]);

const PrivateRoute = ({ children, allowedRoles }) => {
  const user = currentUser.value;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles.includes(user.role)) return children;
  return <Navigate to="/" replace />;
};

function App() {
  useEffect(() => {
    const loadDummyData = async () => {
      const data = await fetchDummyData();
      orders.value = data.orders;
      menu.value = data.menu;
      users.value = data.users;
    };

    loadDummyData();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/delivery" element={
              <PrivateRoute allowedRoles={['delivery', 'owner']}>
                <DeliveryDashboard />
              </PrivateRoute>
            } />
            <Route path="/kitchen" element={
              <PrivateRoute allowedRoles={['kitchen', 'owner']}>
                <KitchenDashboard />
              </PrivateRoute>
            } />
            <Route path="/owner" element={
              <PrivateRoute allowedRoles={['owner']}>
                <OwnerDashboard />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute allowedRoles={['delivery', 'kitchen', 'owner']}>
                <UserProfile />
              </PrivateRoute>
            } />
            <Route path="/menu" element={
              <PrivateRoute allowedRoles={['owner']}>
                <MenuManagement />
              </PrivateRoute>
            } />
            <Route path="/analytics" element={
              <PrivateRoute allowedRoles={['owner']}>
                <AnalyticsDashboard />
              </PrivateRoute>
            } />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;