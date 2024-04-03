import { createContext, useState, useContext } from "react";

// Create a context for managing user authentication state
export const AuthContext = createContext();

// Custom hook to access the authentication context
export const useAuth = () => useContext(AuthContext);

// Component that provides the AuthContext to its child components
export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state: not logged in

  // Function to handle user login
  const login = () => {
    setIsLoggedIn(true);
  };

  // Function to handle user logout
  const logout = () => {
    setIsLoggedIn(false);
  };

  // The context value includes the isLoggedIn state and login/logout functions
  const contextValue = {
    isLoggedIn,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
