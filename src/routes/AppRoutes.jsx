import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import Pages
import Login from '../pages/Login';
import Register from '../pages/Register';

// Import Dashboards
import UserDashboard from '../pages/dashboards/UserDashboard';
import GarageDashboard from '../pages/dashboards/GarageDashboard';
import TowingDashboard from '../pages/dashboards/TowingDashboard';
import AdminDashboard from '../pages/dashboards/AdminDashboard';

// Import Layout
import MainLayout from '../layouts/MainLayout';

// Import Guard
import ProtectedRoute from './ProtectedRoute';

// Helper component to redirect authenticated users away from public auth pages
const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    switch (currentUser.role) {
      case 'ADMIN':
        return <Navigate to="/admin" replace />;
      case 'GARAGE_OWNER':
        return <Navigate to="/garage" replace />;
      case 'TOWING_OPERATOR':
        return <Navigate to="/towing" replace />;
      case 'USER':
      default:
        return <Navigate to="/user" replace />;
    }
  }

  return children;
};

// Helper component to handle routing at the root path '/'
const HomeRedirect = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  switch (currentUser.role) {
    case 'ADMIN':
      return <Navigate to="/admin" replace />;
    case 'GARAGE_OWNER':
      return <Navigate to="/garage" replace />;
    case 'TOWING_OPERATOR':
      return <Navigate to="/towing" replace />;
    case 'USER':
    default:
      return <Navigate to="/user" replace />;
  }
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root path redirect */}
      <Route path="/" element={<HomeRedirect />} />

      {/* Public Authentication Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Protected Dashboard Routes wrapped inside MainLayout */}
      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={['USER']}>
            <MainLayout>
              <UserDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/garage"
        element={
          <ProtectedRoute allowedRoles={['GARAGE_OWNER']}>
            <MainLayout>
              <GarageDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/towing"
        element={
          <ProtectedRoute allowedRoles={['TOWING_OPERATOR']}>
            <MainLayout>
              <TowingDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
