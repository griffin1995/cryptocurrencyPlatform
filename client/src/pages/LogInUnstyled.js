import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
/**
 * Login component allows users to authenticate by entering their email and password.
 * It uses useState to manage form fields and handles form submission with a custom function.
 */
const Login = () => {
  // State hooks for managing email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  /**
   * Handles the form submission event.
   * Prevents the default form submission behavior and logs the email and password.
   * @param {Event} e - The event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading} type="submit">Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
