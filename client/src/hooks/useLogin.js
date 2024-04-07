import { useState } from "react"; // Importing useState hook from React for state management
import { useAuthenticationContext } from "./useAuthenticationContext"; // Import custom hook to access authentication context

// Custom hook for handling user login
export const useLogin = () => {
  const [error, setError] = useState(null); // State for storing any login errors
  const [isLoading, setIsLoading] = useState(null); // State to track loading status during login process
  const { dispatch } = useAuthenticationContext(); // Retrieve the dispatch method from authentication context to update state

  // Function to perform user login
  const login = async (email, password) => {
    setIsLoading(true); // Indicate that loading has started
    setError(null); // Reset any previous errors

    // Sending POST request to login endpoint with email and password
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json(); // Parsing JSON response from the server

    if (!response.ok) {
      setIsLoading(false); // Loading is complete, set loading state to false
      setError(json.error); // Set error state to the error returned from the server
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json)); // Persist logged-in user data to local storage

      dispatch({ type: "LOGIN", payload: json }); // Update authentication context with logged-in user data

      setIsLoading(false); // Loading is complete, set loading state to false
    }
  };

  // Return the login function so it can be used by components
  return { login, isLoading, error };
};
