// Import the useAuthenticationContext hook for accessing authentication state management.
import { useAuthenticationContext } from "./useAuthenticationContext";

/**
 * Custom hook for handling user logout.
 * Provides a logout function that can be used by components to log users out.
 * @returns {object} Object containing the logout function.
 */
export const useLogout = () => {
  // Extract dispatch from the authentication context.
  const { dispatch } = useAuthenticationContext();

  /**
   * Logs out the user by clearing session data and updating state.
   */
  const logout = () => {
    // Remove user data from local storage to clear the current session.
    localStorage.removeItem("user");

    // Dispatch the 'LOGOUT' action to update the global authentication state.
    dispatch({ type: "LOGOUT" });
  };

  // Return the logout function for use in components.
  return { logout };
};
