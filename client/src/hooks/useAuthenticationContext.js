// Import useContext hook from React for consuming context in functional components
import { useContext } from "react";
// Import AuthenticationContext to access the admin-related context for the application
import { AuthenticationContext } from "../context/AuthenticationContext";
/**
 * Custom hook to access the AuthenticationContext within the component tree.
 * 
 * This hook abstracts the useContext hook for AuthenticationContext, providing a convenient way
 * to access admin-related data (state and dispatch function) throughout the application.
 * It ensures the component using this hook is wrapped in an AuthenticationContextProvider by checking
 * the existence of the context and throwing an error if it's not available, promoting proper usage.
 * 
 * @returns {Object} The current context value for AuthenticationContext, which includes the state and dispatch function.
 * @throws {Error} Throws an error if the hook is used outside of an AuthenticationContextProvider.
 */
export const useAuthenticationContext = () => {
  // Use the useContext hook to access the current context value for AuthenticationContext
  const context = useContext(AuthenticationContext);

  // Check if the context is undefined, indicating misuse outside of an AuthenticationContextProvider
  if (!context) {
    throw Error("useAuthenticationContext must be used within an AuthenticationContextProvider. Ensure your component is wrapped in an <AuthenticationContextProvider> to provide the necessary context.");
  }

  // Return the context value, making it accessible to the component
  return context;
};
