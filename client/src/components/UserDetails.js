// Import the React library to enable the use of React's features, such as components and hooks.
import React from "react";
import { useAdminContext } from "../hooks/useAdminContext";
/**
 * UserDetails component for displaying detailed information about a user.
 *
 * Props:
 *   - user: An object containing information about the user, including their name, email,
 *           phone number, and the last update timestamp.
 */
const UserDetails = ({ user }) => {
  const { dispatch } = useAdminContext();
  // Convert the 'updatedAt' string from the user object to a Date object for date manipulation.
  const updatedAt = new Date(user.updatedAt);

  // Specify options for formatting the 'updatedAt' date to enhance readability.
  const dateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  // Use the toLocaleString method to format the 'updatedAt' date based on the specified options.
  const dateString = updatedAt.toLocaleString(undefined, dateOptions);
  
  const handleDelete = async () => {
    const response = await fetch("/api/adminRoutes/" + user._id, {
      method: "DELETE",
    });
    //when we get the response the document that's just been deleted is returned
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_USER", payload: json });
    }
  };
  // Render the user's details in a structured layout.
  return (
    <div className="user-details">
      {/* Display the user's full name by concatenating the firstName and lastName. */}
      <h4>
        {user.firstName} {user.lastName}
      </h4>
      {/* Display the user's email. */}
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>
      {/* Display the user's phone number. */}
      <p>
        <strong>Phone Number: </strong>
        {user.phoneNumber}
      </p>
      {/* Display the last updated timestamp, formatted for readability. */}
      <p>
        <strong>Updated at: </strong>
        {dateString}
      </p>
      <p onClick={handleDelete}>
        <u>Delete User</u>
      </p>
    </div>
  );
};

// Export the UserDetails component to make it reusable across the application.
export default UserDetails;
