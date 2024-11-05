// Import necessary hooks from React
import { createContext, useReducer, useEffect } from "react";

// Create a context for authentication data
export const AuthenticationContext = createContext();

// Reducer function for handling authentication actions
export const authenticationReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": // Case to handle user login
      return { user: action.payload }; // Set the user data when logged in
    case "LOGOUT": // Case to handle user logout
      return { user: null }; // Clear the user data when logged out
    default: // Default case to handle other actions
      return state; // Return the current state if no action is matched
  }
};

// Component to provide authentication context to child components
export const AuthenticationContextProvider = ({ children }) => {
  // Use the useReducer hook to manage state with the authenticationReducer
  const [state, dispatch] = useReducer(authenticationReducer, { user: null });
  //empty array cus we only check once, when load
  useEffect(() => {
    //stored as json string so we parse in to object
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  // Log the current state for debugging purposes (consider removing in production)
  console.log("AuthenticationContext state: ", state);

  return (
    <AuthenticationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
