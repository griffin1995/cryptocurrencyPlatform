// Importing the useState hook from React for managing component state.
import { useState } from "react";

/**
 * The SupportForm component renders a form for submitting support tickets.
 * It manages form fields such as subject, body, Category, and user information.
 * Upon submission, it sends a POST request to a specified API endpoint and handles the response.
 */
const SupportForm = () => {
  // State variables to manage form inputs and response messages.
  const [error, setError] = useState(null); // Stores error messages
  const [success, setSuccess] = useState(null); // Stores success messages
  // Form fields state
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [Category, setCategory] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  /**
   * Handles the form submission.
   * Prevents the default form submission behavior, constructs the ticket payload,
   * and sends it to the server. It then processes the server's response.
   *
   * @param {Event} e - The event object provided by the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const ticket = { subject, body, Category, firstName, lastName, email };

    // Sending the ticket information to the server
    const response = await fetch("api/ticketRoutes", {
      method: "POST",
      body: JSON.stringify(ticket),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    // Handling the server's response
    if (!response.ok) {
      setError(json.error); // Set error message from response
      setSuccess(null);
    } else {
      setSuccess(
        `Your ticket has been successfully submitted. Reference number: ${json.ticketId}`
      );
      // Reset form fields after successful submission
      setSubject("");
      setBody("");
      setCategory("");
      setFirstName("");
      setLastName("");
      setEmail("");
    }
  };

  // The form UI
  return (
    <form className="supportForm" onSubmit={handleSubmit}>
      <h3>Get in Touch.</h3>
      {/* Form fields for user input */}
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
      <label>Category:</label>
      <select
        onChange={(e) => setCategory(e.target.value)}
        value={Category}
      >
        {/* Dropdown menu for Category selection */}
        <option value="" disabled hidden>
          Select Category
        </option>
        {/* Category options */}
        <option value="technicalSupport">Technical Support</option>
        <option value="accountSupport">Account Support</option>
        <option value="depositWithdrawal">Deposit & Withdrawal</option>
        <option value="tradingSupport">Trading Support</option>
        <option value="security">Security</option>
        <option value="complianceLegal">Compliance & Legal</option>
        <option value="educationResources">Education & Resources</option>
        <option value="feedbackSuggestions">Feedback & Suggestions</option>
      </select>
      <label>Description:</label>
      <textarea
        onChange={(e) => setBody(e.target.value)}
        value={body}
      ></textarea>
      <button type="submit">Submit Ticket</button>
      {/* Displaying response messages */}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
};

// Exporting the SupportForm component for use in other parts of the application.
export default SupportForm;
