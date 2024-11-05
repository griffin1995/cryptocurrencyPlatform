import { createContext, useReducer } from "react";

// Create a context for managing admin-related data across the application
export const AdminContext = createContext();

/**
 * Reducer function for managing state transitions in the AdminContext based on dispatched actions.
 *
 * This reducer handles actions related to user and coin management, such as setting all users, creating a new user,
 * setting all coins, and creating a new coin.
 *
 * @param {Object} state The current state of the context.
 * @param {Object} action The action to be handled, containing a type and optional payload.
 * @returns {Object} The new state of the context after applying the action.
 */
export const adminReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      // Sets the users array to the payload provided with the action
      return { ...state, users: action.payload };

    case "CREATE_USER":
      // Adds a new user to the beginning of the users array
      return { ...state, users: [action.payload, ...state.users] };

    case "DELETE_USER":
      // Filters out the user to be deleted from the users array
      return { ...state, users: state.users.filter((user) => user._id !== action.payload._id) };

    case "SET_COINS":
      // Sets the coins array to the payload provided with the action, analogous to setting users
      return { ...state, coins: action.payload };

    case "CREATE_COIN":
      // Adds a new coin to the beginning of the coins array
      return { ...state, coins: [action.payload, ...state.coins] };

    default:
      // Returns the current state unchanged if the action type is unrecognized
      return state;
  }
};

/**
 * Component that provides the AdminContext to its child components.
 *
 * This component sets up the AdminContext with an initial state and provides a dispatch function
 * for updating the state according to actions defined in the adminReducer. It ensures that any component
 * within its child tree can access and modify the state of the AdminContext.
 *
 * @param {Object} props The props object, expecting a 'children' prop that contains the child components.
 * @returns {JSX.Element} A Provider component that supplies the AdminContext to its children.
 */
export const AdminContextProvider = ({ children }) => {
  // Initialize the state of the context using the useReducer hook with the adminReducer function
  const [state, dispatch] = useReducer(adminReducer, { users: [], coins: [] });

  // The context value includes the current state and the dispatch function for updating the state
  return (
    <AdminContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};
