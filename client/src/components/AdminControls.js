// Import React to access component functionality.
import React from "react";
// Import the SignUpUser component to handle user registration.
import SignUpUser from "./SignUpUser";

/**
 * Defines the AdminControls component.
 * This component serves as a container for administrative functionalities, such as user registration.
 */
const AdminControls = () => {
  // Render method returns the component's UI.
  return (
    <div className="admin-controls">
      <h2>Admin Controls</h2>
      {/* The SignUpUser component is embedded within AdminControls to offer a sign-up interface.
          This demonstrates the use of component composition in React, enabling modular and reusable UI construction. */}
      <SignUpUser />
    </div>
  );
};

// Export the AdminControls component for use in other parts of the app.
export default AdminControls;
