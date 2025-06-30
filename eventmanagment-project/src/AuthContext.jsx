// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

// localStorage keys
const USERS_KEY = 'registeredUsers';
const LOGGED_IN_USER_KEY = 'loggedInUser';

// Create the Auth context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // loading state for async actions

  useEffect(() => {
    // Load logged-in user from localStorage on mount
    const loggedUser = localStorage.getItem(LOGGED_IN_USER_KEY);
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
    setLoading(false);
  }, []);

  // Register a new user
  const registerUser = (userData) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    // Check if email already registered
    const exists = users.find(u => u.email === userData.email);
    if (exists) {
      return { success: false, message: 'Email already registered' };
    }

    users.push(userData);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return { success: true, message: 'Registration successful' };
  };

  // Login a user
  const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      return { success: false, message: 'Invalid email or password' };
    }

    const userData = {
      name: foundUser.name,
      email: foundUser.email,
      image: foundUser.image,
    };

    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(userData));
    setUser(userData);

    return { success: true, message: 'Login successful', user: userData };
  };

  // Logout current user
  const logoutUser = () => {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
    setUser(null);
  };

  // Get current user info
  const getLoggedInUser = () => user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerUser,
        loginUser,
        logoutUser,
        getLoggedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to consume AuthContext easily
export const useAuth = () => useContext(AuthContext);
