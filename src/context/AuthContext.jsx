import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Restructured pre-seeded accounts using the nested data model schemas
const PRE_SEEDED_USERS = [
  {
    email: 'admin@resqdrive.com',
    password: 'AdminPassword123',
    role: 'ADMIN',
    name: 'System Admin'
  },
  {
    email: 'user@resqdrive.com',
    password: 'UserPassword123',
    role: 'USER',
    name: 'John Doe',
    vehicleInfo: {
      vehicleNumber: 'AB-1234',
      vehicleType: 'Car',
      vehicleBrand: 'Toyota',
      vehicleModel: 'Corolla',
      insuranceProvider: 'Allianz Insurance',
      insuranceNumber: 'AZ-987654',
      emergencyContact: '0771112222'
    }
  },
  {
    email: 'garage@resqdrive.com',
    password: 'GaragePassword123',
    role: 'GARAGE_OWNER',
    name: 'QuickFix Garage Owner',
    garageInfo: {
      garageName: 'QuickFix Auto Care',
      contactNumber: '0771234567',
      garageAddress: '123 Main St, Colombo',
      servicesOffered: ['Engine repair', 'Brake service', 'Battery replacement', 'Tires'],
      operatingHours: '08:00 AM - 06:00 PM',
      experienceLevel: '5+ Years'
    }
  },
  {
    email: 'towing@resqdrive.com',
    password: 'TowingPassword123',
    role: 'TOWING_OPERATOR',
    name: 'Apex Towing Owner',
    towingInfo: {
      companyName: 'Apex Towing Services',
      contactNumber: '0777654321',
      operatingAreas: 'Colombo & Gampaha Districts',
      supportedVehicles: ['Car', 'Bike', 'Van']
    }
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize and check for existing session
  useEffect(() => {
    const savedSession = localStorage.getItem('resqdrive_session');
    if (savedSession) {
      try {
        setCurrentUser(JSON.parse(savedSession));
      } catch (e) {
        console.error('Error parsing saved session', e);
        localStorage.removeItem('resqdrive_session');
      }
    }
    
    // Seed users list in localStorage if it doesn't exist yet
    if (!localStorage.getItem('resqdrive_users')) {
      localStorage.setItem('resqdrive_users', JSON.stringify([]));
    }
    
    setLoading(false);
  }, []);

  // Login handler
  const login = (email, password) => {
    // Fetch registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('resqdrive_users') || '[]');
    
    // Look for matching user in both registered and pre-seeded users
    const allUsers = [...PRE_SEEDED_USERS, ...registeredUsers];
    const foundUser = allUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      // Remove sensitive information before storing session
      const { password: _, ...sessionUser } = foundUser;
      setCurrentUser(sessionUser);
      localStorage.setItem('resqdrive_session', JSON.stringify(sessionUser));
      return { success: true, user: sessionUser };
    }

    return { success: false, error: 'Invalid email or password.' };
  };

  // Register handler
  const register = (userData) => {
    const { email } = userData;
    const registeredUsers = JSON.parse(localStorage.getItem('resqdrive_users') || '[]');
    const allUsers = [...PRE_SEEDED_USERS, ...registeredUsers];
    
    // Check if email already exists
    const emailExists = allUsers.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      return { success: false, error: 'A user with this email address already exists.' };
    }

    // Add to registered users
    const updatedUsers = [...registeredUsers, userData];
    localStorage.setItem('resqdrive_users', JSON.stringify(updatedUsers));

    // Sign in the newly registered user immediately
    const { password: _, ...sessionUser } = userData;
    setCurrentUser(sessionUser);
    localStorage.setItem('resqdrive_session', JSON.stringify(sessionUser));

    return { success: true, user: sessionUser };
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('resqdrive_session');
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
