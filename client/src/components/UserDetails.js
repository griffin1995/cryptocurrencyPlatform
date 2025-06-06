// Import the React library to enable the use of React's features, such as components and hooks.
import React from "react";
import { useAdminContext } from "../hooks/useAdminContext";
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
import { Card, Button } from "react-bootstrap";

/**
 * UserDetails component for displaying detailed information about a user.
 *
 * Props:
 *   - user: An object containing information about the user, including their name, email,
 *           phone number, and the last update timestamp.
 */
const UserDetails = ({ user }) => {
  const { dispatch } = useAdminContext();
  // FIXED: Get authenticated user's token instead of displayed user's token
  const { user: authUser } = useAuthenticationContext();

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
    if (!authUser) {
      console.error("No authenticated user found");
      return;
    }

    try {
      const response = await fetch(`/api/admin/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.token}`, // FIXED: Use authenticated user's token
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // When we get the response the document that's just been deleted is returned
      const json = await response.json();
      dispatch({ type: "DELETE_USER", payload: json });
    } catch (error) {
      console.error("Error deleting user:", error);
      // You might want to show this error to the user via a toast or alert
    }
  };

  // Render the user's details in a structured layout.
  return (
    <div className="user-details bg-secondary py-2 px-2 h-100 rounded">
      <Card
        className="my-2 text-center"
        bg="primary"
        text="dark"
        border="primary"
      >
        <Card.Body className="bg-light rounded">
          <Card.Title>First Name</Card.Title>
          <Card.Text>{user.firstName}</Card.Text>
          <hr className="bg-dark" />
          <Card.Title>Last Name</Card.Title>
          <Card.Text>{user.lastName}</Card.Text>
          <hr className="bg-dark" />
          <Card.Title>Email</Card.Title>
          <Card.Text>{user.email}</Card.Text>
          <hr className="bg-dark" />
          <Card.Title>Phone Number</Card.Title>
          <Card.Text>{user.phoneNumber}</Card.Text>
          <hr className="bg-dark" />
          <Card.Title>Last Updated</Card.Title>
          <Card.Text>{dateString}</Card.Text>
        </Card.Body>
      </Card>
      <Button
        onClick={handleDelete}
        className="w-100 border-dark"
        variant="danger"
      >
        <i className="bi bi-trash" /> Delete
      </Button>
    </div>
  );
};

// Export the UserDetails component to make it reusable across the application.
export default UserDetails;
