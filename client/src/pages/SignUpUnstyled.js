import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";

/**
 * SignUp component allows users to register by entering their email and password.
 * It uses useState to manage form fields and handles form submission with a custom function.
 */
const SignUp = () => {
  // State hooks for managing email and password input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  // Retrieves signUp function and state from custom hook for handling the sign-up process
  const { signUp, isLoading, error } = useSignUp();

  /**
   * Handles the form submission event.
   * Prevents the default form submission behavior and logs the email and password.
   * Initiates the sign-up process with user-provided details.
   * @param {Event} e - The event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the browser from performing the default form submit action
    await signUp(firstName, lastName, email, phoneNumber, password); // Calls signUp from useSignUp hook
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>First Name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        required
      />
      <label>Last Name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        required
      />
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <label>Phone Number:</label>
      <input
        type="text"
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phoneNumber}
        required
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
      <button disabled={isLoading} type="submit">
        Sign Up
      </button>
      {error && <div className="error">{error}</div>}
      {/* Displays error message if there is an error during sign up */}
    </form>
  );
};

export default SignUp;
