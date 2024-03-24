// Import the useState hook from React to manage component state.
import { useState } from "react";

// Define a functional component named SupportForm for handling support ticket submissions.
const SupportForm = () => {
  // Initialize state variables for managing form submission status and input fields.
  const [error, setError] = useState(null); // Holds error messages.
  const [success, setSuccess] = useState(null); // Holds success messages.

  // Initialize state variables for support ticket input fields in the form.
  const [subject, setSubject] = useState(""); // Subject of the support ticket.
  const [body, setBody] = useState(""); // Detailed description of the issue.
  const [department, setDepartment] = useState(""); // Department the ticket is assigned to.
  // Initialize state variables for user information if not logged in.
  const [firstName, setFirstName] = useState(""); // User's first name.
  const [lastName, setLastName] = useState(""); // User's last name.
  const [email, setEmail] = useState(""); // User's email address.

  // Define a function to handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior.

    // Construct a ticket object from the state variables to send to the server.
    const ticket = {
      subject,
      body,
      department,
      firstName,
      lastName,
      email,
    };

    // Perform an asynchronous POST request to the server to submit the support ticket.
    const response = await fetch("api/ticketRoutes", {
      method: "POST",
      body: JSON.stringify(ticket), // Convert the ticket object to a JSON string for the request body.
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
        `Your ticket has been successfully submitted. Reference number: ${json.ticketId}`
      );

      // Reset form fields to their initial state after successful submission.
      setSubject("");
      setBody("");
      setDepartment("");
      setFirstName("");
      setLastName("");
      setEmail("");
    }
  };

  // JSX to render the support form with input fields and a submit button.
  // Includes dynamic rendering of error or success messages based on the component state.
  return (
    <form className="supportForm" onSubmit={handleSubmit}>
      <h3>Get in Touch.</h3>
      {/* Input fields for collecting ticket information, with onChange handlers to update state. */}
      <label>Subject:</label>
      <input
        type="text"
        onChange={(e) => setSubject(e.target.value)}
        value={subject}
      />
      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setBody(e.target.value)}
        value={body}
      />
      {/* Additional fields for department, user information, etc., can be added here. */}
      <button>Submit Ticket</button> {/* Button to trigger form submission. */}
      {/* Display error or success messages based on the state. */}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
};

// Export the SupportForm component for use in other parts of the application.
export default SupportForm;
