import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useAuth();

  // If auth is still loading, show a loading placeholder (though AuthProvider handles this before children mount)
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-200">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-sm font-medium tracking-wide">Securing connection...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but role is not allowed, redirect to their role's home page
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    console.warn(`Access denied for role: ${currentUser.role}. Authorized roles: ${allowedRoles.join(', ')}`);
    
    // Redirect to their respective dashboards
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

export default ProtectedRoute;
