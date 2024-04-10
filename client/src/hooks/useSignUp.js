import { useState } from "react";
// Custom hook to access authentication context
import { useAuthenticationContext } from "./useAuthenticationContext";

/**
 * Custom hook to handle user sign-up.
 *
 * This hook encapsulates the sign-up logic, including API requests, error handling,
 * and updating the authentication state of the application.
 *
 * @returns {Object} Contains the signUp function and stateful values for isLoading and error.
 */
export const useSignUp = () => {
  // State for tracking error messages
  const [error, setError] = useState(null);
  // State for tracking loading status during sign-up process
  const [isLoading, setIsLoading] = useState(false); // Initialize as `false` since no loading before attempts
  // Destructure the dispatch function from the authentication context
  const { dispatch } = useAuthenticationContext();

  /**
   * Handles the sign-up process for a new user.
   *
   * This function sends user credentials to the server, handles the response,
   * updates local storage, and the global authentication state.
   *
   * @param {string} firstName - User's first name
   * @param {string} lastName - User's last name
   * @param {string} email - User's email address
   * @param {string} phoneNumber - User's phone number
   * @param {string} password - User's chosen password
   */
  const signUp = async (firstName, lastName, email, phoneNumber, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      }),
    });
    const json = await response.json();

    // Handle error case in the API response
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return;
    }

    // Handle successful sign-up
    if (response.ok) {
      // Store user information in local storage
      localStorage.setItem("user", JSON.stringify(json));
      // Update the authentication context to reflect user login
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error };
};
