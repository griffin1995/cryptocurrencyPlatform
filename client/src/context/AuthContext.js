import React, { createContext, useReducer } from "react";

// Create a context for managing user authentication state
export const AuthContext = createContext();

// Define actions for managing authentication state
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// Reducer function for managing state transitions in the authentication context
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { isLoggedIn: true };
    case LOGOUT:
      return { isLoggedIn: false };
    default:
      return state;
  }
};

// Component that provides the AuthContext to its child components
export const AuthContextProvider = ({ children }) => {
  // Initialize the state of the context using the useReducer hook with the authReducer function
  const [state, dispatch] = useReducer(authReducer, { isLoggedIn: false });

  // Function to handle user login
  const login = () => {
    dispatch({ type: LOGIN });
  };

  // Function to handle user logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // The context value includes the isLoggedIn state and login/logout functions
  const contextValue = {
    isLoggedIn: state.isLoggedIn,
    login,
    logout
  };

  // Provide the AuthContext with the context value
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
