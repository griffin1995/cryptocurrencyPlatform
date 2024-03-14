import { useState } from "react";

const SignUpUser = () => {
  // State hooks for each variable
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      paymentDetails,
    };

    const response = await fetch("/api/adminRoutes", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setSuccess(null); // Clear success message if there's an error
    } else {
      setError(null);
      // Set the success message, including details of the signed-up user
      setSuccess(
        `Success! ${firstName} ${lastName} has been signed up with the email: ${email}.`
      );
      // Clear form fields after successful submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setPaymentDetails(false);
    }
  };
  return (
    <form className="signUp" onSubmit={handleSubmit}>
      <h3>Create a new user</h3>

      {/* First Name Input */}
      <label>First Name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />

      {/* Last Name Input */}
      <label>Last Name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />

      {/* Email Input */}
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      {/* Phone Number Input */}
      <label>Phone Number:</label>
      <input
        type="text"
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phoneNumber}
      />

      {/* Password Input */}
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button>Sign Up</button>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
};

export default SignUpUser;
