// Import the useState hook from React to manage the state within our component.
// This will allow us to keep track of user inputs and feedback messages.
import { useState } from "react";
// Import our custom hook, useAdminContext, to interact with our global admin state.
// This lets us dispatch actions (like adding a new user) that can affect the whole app.
import { useAdminContext } from "../hooks/useAdminContext";
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
import {Form, Button} from "react-bootstrap";
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
  const { user } = useAuthenticationContext();

  // useState hooks for managing form inputs and submission feedback.
  // Each call to useState returns a pair: the current state value and a function that lets you update it.
  // and our feedback messages (error, success) to null because they have no value initially.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
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
    if (!user) {
      setError(
        "You must be logged in with admin privileges to create a new user."
      );
      return;
    }
    // Constructs a user object from the current state.
    const newUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    };

    try {
      // Try to send the user data to the server using the fetch API.
      const response = await fetch("/api/admin", {
        method: "POST", // Specifies the request method.
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }, // Tells the server we're sending JSON.
        body: JSON.stringify(newUser), // Turns the user object into a JSON string to send in the request body.
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
    setEmptyFields([]);
  };

  // Render the sign-up form.
  // This includes input fields for all user details, a submit button, and areas to display error or success messages.
  return (
    // TODO: Implement CSS for className "error" > if x field is empty then className = error > red border etc
    <Form className="signUp bg-dark p-4 rounded" onSubmit={handleSubmit}>
    <Form.Group controlId="firstName" className="mb-2">
      <Form.Label>First Name:</Form.Label>
      <Form.Control
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        className={emptyFields.includes("firstName") ? "error" : ""}
      />
    </Form.Group>

    <Form.Group controlId="lastName" className="mb-2">
      <Form.Label>Last Name:</Form.Label>
      <Form.Control
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        className={emptyFields.includes("lastName") ? "error" : ""}
      />
    </Form.Group>

    <Form.Group controlId="email" className="mb-2">
      <Form.Label>Email:</Form.Label>
      <Form.Control
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className={emptyFields.includes("email") ? "error" : ""}
      />
    </Form.Group>

    <Form.Group controlId="phoneNumber" className="mb-2">
      <Form.Label>Phone Number:</Form.Label>
      <Form.Control
        type="text"
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phoneNumber}
        className={emptyFields.includes("phoneNumber") ? "error" : ""}
      />
    </Form.Group>

    <Form.Group controlId="password" className="mb-2">
      <Form.Label>Password:</Form.Label>
      <Form.Control
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className={emptyFields.includes("password") ? "error" : ""}
      />
    </Form.Group>

    <Button variant="secondary" type="submit" className="my-2 w-100">
      Add User
    </Button>

    {error && <div className="error">{error}</div>}
    {success && <div className="success">{success}</div>}
  </Form>
  );
};

// Make the SignUpUser component available for import and use in other parts of the application.
export default SignUpUser;
