
import React, { createContext, useContext, useEffect, useState } from 'react';


const USERS_KEY = 'registeredUsers';
const LOGGED_IN_USER_KEY = 'loggedInUser';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loggedUser = localStorage.getItem(LOGGED_IN_USER_KEY);
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
    setLoading(false);
  }, []);


  const registerUser = (userData) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  
    const exists = users.find(u => u.email === userData.email);
    if (exists) {
      return { success: false, message: 'Email already registered' };
    }

    users.push(userData);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return { success: true, message: 'Registration successful' };
  };


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


  const logoutUser = () => {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
    setUser(null);
  };

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


export const useAuth = () => useContext(AuthContext);
