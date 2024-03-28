// Import useContext hook from React for consuming context in functional components
import { useContext } from "react";
// Import AdminContext to access the admin-related context for the application
import { AdminContext } from "../context/AdminContext";

/**
 * Custom hook to access the AdminContext within the component tree.
 * 
 * This hook abstracts the useContext hook for AdminContext, providing a convenient way
 * to access admin-related data (state and dispatch function) throughout the application.
 * It ensures the component using this hook is wrapped in an AdminContextProvider by checking
 * the existence of the context and throwing an error if it's not available, promoting proper usage.
 * 
 * @returns {Object} The current context value for AdminContext, which includes the state and dispatch function.
 * @throws {Error} Throws an error if the hook is used outside of an AdminContextProvider.
 */
export const useAdminContext = () => {
  // Use the useContext hook to access the current context value for AdminContext
  const context = useContext(AdminContext);

  // Check if the context is undefined, indicating misuse outside of an AdminContextProvider
  if (!context) {
    throw Error("useAdminContext must be used within an AdminContextProvider. Ensure your component is wrapped in an <AdminContextProvider> to provide the necessary context.");
  }

  // Return the context value, making it accessible to the component
  return context;
};
