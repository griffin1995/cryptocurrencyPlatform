// Import React and its hooks to build the component functionality.
import React, { useEffect } from "react";
// Import components related to user actions within the admin panel.
import SignUpUser from "./SignUpUser";
import UserDetails from "./UserDetails";
import CreatePost from './BlogPosts';
import { useAdminContext } from "../hooks/useAdminContext";
/**
 * AdminControls component for managing user-related administrative functions.
 * This component handles user registration and displays a list of users.
 */
const AdminControls = () => {
  const { users, dispatch } = useAdminContext();
  useEffect(() => {
    /**
     * Fetches and updates the state with user data from the server.
     * It asynchronously retrieves user data from the `/api/adminRoutes` endpoint and updates the `users` state.
     */
    const fetchUsers = async () => {
      const response = await fetch("/api/adminRoutes");
      const json = await response.json();
      if (response.ok) {
        //executes the usersReducer function
        dispatch({ type: "SET_USERS", payload: json });
      }
    };

    fetchUsers(); // Execute the fetch operation when the component mounts.
  }, []);

  return (
    <div className="admin-controls">
      <h2>Admin Controls</h2>
      <h3>Sign Up User</h3>
      <SignUpUser /> {/* Component for registering new users. */}
      <h3>Create Post</h3> {/* Add a heading for the CreatePost component */}
      <CreatePost /> {/* Include the CreatePost component */}
      <h3>Look Up User</h3>
      <div className="allUsers">
        {/* Render UserDetails components for each user if the `users` state is not null. */}
        {users &&
          users.map((user) => <UserDetails key={user._id} user={user} />)}
      </div>
    </div>
  );
};

export default AdminControls; // Make AdminControls available for import in other components.
