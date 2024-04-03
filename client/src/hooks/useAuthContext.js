import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Custom hook to access the AuthContext within the component tree.
 * 
 * This hook abstracts the useContext hook for AuthContext, providing a convenient way
 * to access authentication-related data (isLoggedIn state and login/logout functions) throughout the application.
 * It ensures the component using this hook is wrapped in an AuthContextProvider by checking
 * the existence of the context and throwing an error if it's not available, promoting proper usage.
 * 
 * @returns {Object} The current context value for AuthContext, which includes the isLoggedIn state and login/logout functions.
 * @throws {Error} Throws an error if the hook is used outside of an AuthContextProvider.
 */
export const useAuthContext = () => {
  // Use the useContext hook to access the current context value for AuthContext
  const context = useContext(AuthContext);

  // Check if the context is undefined, indicating misuse outside of an AuthContextProvider
  if (!context) {
    throw Error("useAuthContext must be used within an AuthContextProvider. Ensure your component is wrapped in an <AuthContextProvider> to provide the necessary context.");
  }

  // Return the context value, making it accessible to the component
  return context;
};
