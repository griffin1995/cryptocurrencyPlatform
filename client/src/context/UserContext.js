// Import createContext and useReducer hooks from React
import { createContext, useReducer } from "react";

// Create a context for users data. This context will be used to provide and consume users data across the component tree.
export const UsersContext = createContext();

/**
 * A reducer function for users state management.
 *
 * @param {Object} state - The current state of the users.
 * @param {Object} action - An action object containing the type of action to perform and a payload.
 * @returns {Object} The new state based on the action type.
 */
export const usersReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS": // Action to set the users data
      return {
        users: action.payload, // Set the users array to the payload
      };
    case "CREATE_USER": // Action to add a new user
      return {
        users: [action.payload, ...state.users], // Add the new user to the beginning of the users array
      };
    default: // Default case to return the current state if no action matches
      return state;
  }
};

/**
 * A context provider component for users data.
 * It initializes the users state and provides a way to update it using a reducer.
 *
 * @param {Object} props - The props passed to the component, expecting `children` for the component's content.
 * @returns {JSX.Element} A context provider wrapping its children, passing down the state and dispatch function.
 */
const UsersContextProvider = ({ children }) => {
  // Initialize the state with a null users array and get the dispatch function from useReducer
  const [state, dispatch] = useReducer(usersReducer, { users: null });

  return (
    // Provide the state and dispatch function to the context, making it available to any child component
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};

// Export the UsersContextProvider for use in the application
export default UsersContextProvider;
