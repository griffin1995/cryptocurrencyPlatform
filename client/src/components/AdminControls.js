// Import React to access component functionality.
import React from "react";
import { useEffect, useState } from "react";
// Import the SignUpUser component to handle user registration.
import SignUpUser from "./SignUpUser";
import UserDetails from "./UserDetails";

/**
 * Defines the AdminControls component.
 * This component serves as a container for administrative functionalities, such as user registration.
 */
const AdminControls = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // Asynchronous function to fetch data for users from the API.
    const fetchUsers = async () => {
      const response = await fetch("/api/adminRoutes");
      const json = await response.json();
      // Update the 'users' state with the fetched data if the API call was successful.
      if (response.ok) {
        setUsers(json);
      }
    };

    // Invoke the fetch operations for both coins and users when the component mounts.
    fetchUsers();
  }, []);
  // Render method returns the component's UI.
  return (
    <div className="admin-controls">
      <h2>Admin Controls</h2>
      {/* The SignUpUser component is embedded within AdminControls to offer a sign-up interface.
          This demonstrates the use of component composition in React, enabling modular and reusable UI construction. */}
      <SignUpUser />
      <div className="allUsers">
        {users &&
          users.map((user) => <UserDetails key={user._id} user={user} />)}
      </div>
    </div>
  );
};

// Export the AdminControls component for use in other parts of the app.
export default AdminControls;
