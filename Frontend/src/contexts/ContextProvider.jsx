import React, { createContext, useState, useEffect } from 'react';

// Create context
export const userContext = createContext();

// Context provider
export const UserProvider = ({ children }) => {
  // const [role, setRole] = useState(null); // Default role is null
const role = localStorage.getItem('userRole');
  const [authenticated, setAuthenticated] = useState(false); // Default to not authenticated

  

  // Optional: Fetch role/auth status from backend or local storage
  // useEffect(() => {
  //   // Simulate fetching from local storage or an API
  //   const storedRole = localStorage.getItem('userRole');
  //   if (storedRole) {
  //     setRole(storedRole);
  //     setAuthenticated(true);
  //   }
  // }, []);

  return (
    <userContext.Provider value={{ role, authenticated }}>
      {children}
    </userContext.Provider>
  );
};
