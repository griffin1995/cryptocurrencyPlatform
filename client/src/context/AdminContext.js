import { createContext, useReducer } from "react";

// Create a context for managing admin-related data across the application
export const AdminContext = createContext();

/**
 * Reducer function for managing state transitions in the AdminContext based on dispatched actions.
 *
 * This reducer handles actions related to user management, such as setting all users or creating a new user.
 *
 * @param {Object} state The current state of the context.
 * @param {Object} action The action to be handled, containing a type and optional payload.
 * @returns {Object} The new state of the context after applying the action.
 */
export const usersReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      // Sets the users array to the payload provided with the action
      return { users: action.payload };

    case "CREATE_USER":
      // Adds a new user to the beginning of the users array
      return { users: [action.payload, ...state.users] };

    default:
      // Returns the current state unchanged if action type is unrecognized
      return state;
  }
};

/**
 * Component that provides the AdminContext to its child components.
 *
 * This component sets up the AdminContext with an initial state and provides a dispatch function
 * for updating the state according to actions defined in the usersReducer. It ensures that any component
 * within its child tree can access and modify the state of the AdminContext.
 *
 * @param {Object} props The props object, expecting a 'children' prop that contains the child components.
 * @returns {JSX.Element} A Provider component that supplies the AdminContext to its children.
 */
export const AdminContextProvider = ({ children }) => {
  // Initialize the state of the context using the useReducer hook with the usersReducer function
  const [state, dispatch] = useReducer(usersReducer, { users: null });

  // The context value includes the current state and the dispatch function for updating the state
  return (
    <AdminContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};
