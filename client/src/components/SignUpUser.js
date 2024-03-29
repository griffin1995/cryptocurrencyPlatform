// Import the useState hook from React to manage the state within our component.
// This will allow us to keep track of user inputs and feedback messages.
import { useState } from "react";
// Import our custom hook, useAdminContext, to interact with our global admin state.
// This lets us dispatch actions (like adding a new user) that can affect the whole app.
import { useAdminContext } from "../hooks/useAdminContext";

/**
 * SignUpUser is a component that renders a form for user registration.
 * It captures user details through form inputs, validates and submits this data to a server,
 * and handles the response to either show a success message or an error message.
 */
const SignUpUser = () => {
  // Access the 'dispatch' function from our admin context using the custom hook.
  // This function allows us to send actions to our global state to update it,
  // such as adding a new user to our list of users.
  const { dispatch } = useAdminContext();

  // useState hooks for managing form inputs and submission feedback.
  // Each call to useState returns a pair: the current state value and a function that lets you update it.
  // Here, we initialize our form fields to empty strings or false (for paymentDetails),
  // and our feedback messages (error, success) to null because they have no value initially.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  /**
   * handleSubmit is an asynchronous function that gets called when the user submits the form.
   * It first prevents the default form submission behavior (page reload), then
   * constructs a user object from the state variables and attempts to send this object
   * to a server endpoint via a POST request.
   *
   * If the request fails (the server responds with an error), it catches the error and updates
   * the component's state to display the error message. If the request succeeds, it clears any
   * existing error messages, updates the state to display a success message, and resets the form fields.
   *
   * @param {Event} e - The event object from the form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops the form from submitting in the traditional way (no page reload).

    // Constructs a user object from the current state.
    const user = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      paymentDetails,
    };

    try {
      // Try to send the user data to the server using the fetch API.
      const response = await fetch("/api/adminRoutes", {
        method: "POST", // Specifies the request method.
        headers: { "Content-Type": "application/json" }, // Tells the server we're sending JSON.
        body: JSON.stringify(user), // Turns the user object into a JSON string to send in the request body.
      });

      const json = await response.json(); // Parses the JSON response body from the server.

      // Checks if the response was not OK (i.e., server responded with an error status).
      if (!response.ok) {
        throw new Error(json.error); // Throws an error with the message from the server.
        setEmptyFields(json.emptyFields);
      }

      // If the server responded OK, update the success message and clear any error messages.
      setSuccess(
        `Success! ${firstName} ${lastName} has been signed up with the email: ${email}.`
      );
      setError(null);
      resetFormFields(); // Resets the form fields to their initial state.

      // Dispatches an action to our global state to add the new user to our list of users.
      dispatch({ type: "CREATE_USER", payload: json });
    } catch (error) {
      // If an error occurred during the fetch, update the error message and clear any success message.
      setError(error.message);
      setSuccess(null);
    }
  };

  /**
   * Resets all form fields to their initial values.
   * This is called after successfully submitting the form to clear the form inputs.
   */
  const resetFormFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setPaymentDetails(false);
    setEmptyFields([]);
  };

  // Render the sign-up form.
  // This includes input fields for all user details, a submit button, and areas to display error or success messages.
  return (
    <form className="signUp" onSubmit={handleSubmit}>
      <h3>Create a new user</h3>
      {/* Input fields for collecting user information, with onChange handlers to update state. */}
      <label>First Name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        class={emptyFields.includes("firstName") ? 'error' : ''}
      />
      <label>Last Name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        class={emptyFields.includes("lastName") ? 'error' : ''}

      />
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        class={emptyFields.includes("email") ? 'error' : ''}

      />
      <label>Phone Number:</label>
      <input
        type="text"
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phoneNumber}
        class={emptyFields.includes("phoneNumber") ? 'error' : ''}

      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        class={emptyFields.includes("password") ? 'error' : ''}

      />
      <button>Sign Up</button> {/* Button to trigger form submission. */}
      {/* Display error or success messages based on the state. */}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
};

// Make the SignUpUser component available for import and use in other parts of the application.
export default SignUpUser;
