import React, { createContext, useState, useEffect } from "react";

// Create a context for Auth
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  // Check localStorage for token and role on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (token && userRole) {
      setIsLoggedIn(true);
      setRole(userRole); // Set the user role
    }
  }, []);

  const login = (role) => {
    setIsLoggedIn(true);
    setRole(role);
    localStorage.setItem("role", role);
    // Optionally set token, depending on your authentication flow
    localStorage.setItem("token", "your-auth-token");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null); // Clear role upon logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
