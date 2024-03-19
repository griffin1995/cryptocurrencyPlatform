// Import the UsersContext from the UserContext file and the useContext hook from React
import { UsersContext } from "../context/UserContext";
import { useContext } from "react";

/**
 * Custom hook to access the UsersContext.
 *
 * This hook abstracts away the useContext hook for the UsersContext,
 * providing an easy way to access the context's value, which includes both state and dispatch function.
 * It also ensures the hook is called within a component tree that is wrapped by a UsersContextProvider.
 *
 * @returns {Object} The context value of UsersContext, which includes state and dispatch function.
 * @throws {Error} Throws an error if the hook is used outside a UsersContextProvider.
 */
export const useUsersContext = () => {
  // Use the useContext hook to access the current context value of UsersContext
  const context = useContext(UsersContext);

  // Check if the context is undefined, indicating use outside of a UsersContextProvider
  if (!context) {
    throw new Error(
      "useUsersContext must be used inside a UsersContextProvider"
    );
  }

  // Return the context value if the above check passes
  return context;
};
