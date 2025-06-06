import { useState } from "react"; // Importing useState hook from React for state management
import { useAuthenticationContext } from "./useAuthenticationContext"; // Import custom hook to access authentication context

// Custom hook for handling user login
export const useLogin = () => {
  const [error, setError] = useState(null); // State for storing any login errors
  const [isLoading, setIsLoading] = useState(null); // State to track loading status during login process
  const { dispatch } = useAuthenticationContext(); // Retrieve the dispatch method from authentication context to update state

  // Function to perform user login
  const login = async (email, password) => {
    console.log("🔑 LOGIN ATTEMPT STARTED");
    console.log("📧 Email:", email);
    console.log("🔒 Password length:", password?.length);
    console.log("🌐 Current URL:", window.location.href);

    setIsLoading(true); // Indicate that loading has started
    setError(null); // Reset any previous errors

    try {
      console.log("📡 Making fetch request to /api/user/login");

      // Sending POST request to login endpoint with email and password
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("📋 Response status:", response.status);
      console.log("📋 Response ok:", response.ok);
      console.log(
        "📋 Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      // Parse JSON response from the server
      const json = await response.json();
      console.log("📦 Response JSON:", json);

      if (!response.ok) {
        console.error("❌ Login failed with status:", response.status);
        console.error("❌ Error message:", json.error);
        setIsLoading(false); // Loading is complete, set loading state to false
        setError(
          json.error || `HTTP ${response.status}: ${response.statusText}`
        ); // Set error state
        return;
      }

      if (response.ok) {
        console.log("✅ Login successful!");
        console.log("👤 User data received:", json);
        console.log("🎫 Token received:", json.token ? "YES" : "NO");
        console.log("📧 User ID:", json._id);
        console.log("📧 User email:", json.email);

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(json));
        console.log("💾 User data stored in localStorage");

        // Update authentication context with logged-in user data
        dispatch({ type: "LOGIN", payload: json });
        console.log("🔄 Context updated with LOGIN action");

        setIsLoading(false); // Loading is complete
        console.log("🎉 Login process completed successfully!");
      }
    } catch (fetchError) {
      console.error("🚨 FETCH ERROR:", fetchError);
      console.error("🚨 Error name:", fetchError.name);
      console.error("🚨 Error message:", fetchError.message);
      console.error("🚨 Error stack:", fetchError.stack);

      setIsLoading(false);
      setError(`Network error: ${fetchError.message}`);
    }
  };

  // Return the login function and states so they can be used by components
  return { login, isLoading, error };
};
