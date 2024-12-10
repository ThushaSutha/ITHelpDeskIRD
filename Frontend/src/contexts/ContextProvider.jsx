import React, { createContext, useState, useEffect } from 'react';

// Create context
export const userContext = createContext();

// Context provider
export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('userRole') || null); 
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('token'));

  // Update role dynamically after login
  const updateRole = (newRole) => {
    localStorage.setItem('userRole', newRole); // Update localStorage
    setRole(newRole); // Update context state
  };

  // Check authentication state
  const updateAuthentication = (isAuthenticated) => {
    setAuthenticated(isAuthenticated);
  };

  // Sync role with localStorage if it changes externally 
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole !== role) {
      setRole(storedRole);
    }
  }, [role]);

  return (
    <userContext.Provider value={{ role, authenticated, updateRole, updateAuthentication }}>
      {children}
    </userContext.Provider>
  );
};
