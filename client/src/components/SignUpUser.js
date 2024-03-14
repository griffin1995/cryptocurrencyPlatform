// Import the useState hook from React to manage component state.
import { useState } from "react";

// Define a functional component named SignUpUser for handling user sign-ups.
const SignUpUser = () => {
  // Initialize state variables for managing user input and form submission status.
  const [error, setError] = useState(null); // Holds error messages.
  const [success, setSuccess] = useState(null); // Holds success messages.
  // Initialize state variables for user input fields in the form.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(false); // Represents whether payment details are provided.

  // Define a function to handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior.

    // Construct a user object from the state variables to send to the server.
    const user = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      paymentDetails,
    };

    // Perform an asynchronous POST request to the server to create a new user.
    const response = await fetch("/api/adminRoutes", {
      method: "POST",
      body: JSON.stringify(user), // Convert the user object to a JSON string for the request body.
      headers: { "Content-Type": "application/json" }, // Indicate that the request body is JSON.
    });

    const json = await response.json(); // Parse the JSON response from the server.

    // Check the response status and update the component state accordingly.
    if (!response.ok) {
      // If there's an error, set the error state and clear any success message.
      setError(json.error);
      setSuccess(null);
    } else {
      // If the request was successful, update the success state with a message and clear any error message.
      setError(null);
      setSuccess(
        `Success! ${firstName} ${lastName} has been signed up with the email: ${email}.`
      );
      // Reset form fields to their initial state after successful submission.
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setPaymentDetails(false);
    }
  };

  // JSX to render the sign-up form with input fields and submit button.
  // Includes dynamic rendering of error or success messages based on the component state.
  return (
    <form className="signUp" onSubmit={handleSubmit}>
      <h3>Create a new user</h3>
      {/* Input fields for collecting user information, with onChange handlers to update state. */}
      <label>First Name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <label>Last Name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Phone Number:</label>
      <input
        type="text"
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phoneNumber}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button>Sign Up</button> {/* Button to trigger form submission. */}
      {/* Display error or success messages based on the state. */}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
};

// Export the SignUpUser component for use in other parts of the application.
export default SignUpUser;
