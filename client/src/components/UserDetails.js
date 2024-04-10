// Import the React library to enable the use of React's features, such as components and hooks.
import React from "react";
import { useAdminContext } from "../hooks/useAdminContext";
import { Card, Button } from "react-bootstrap";

/**
 * UserDetails component for displaying detailed information about a user.
 *
 * Props:
 *   - user: An object containing information about the user, including their name, email,
 *           phone number, and the last update timestamp.
 */
const UserDetails = ({ user }) => {

  // TODO: Decouple display and authentication responsibilities. Implement a dedicated authentication context or mechanism
  // TODO: that consistently provides the current logged-in user's credentials, independent of the user objects used for display.
  // TODO: Additionally, consider implementing role-based access control, checking if `user.role === 'admin'` to ensure that only
  // TODO: authorized users can perform CRUD operations. This will ensure that authentication checks are always reliable and not
  // TODO: dependent on which user details are being displayed, and that they appropriately restrict access based on user roles.

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
    if (!user) {
      return;
    }
    const response = await fetch("/api/admin/" + user._id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    //when we get the response the document that's just been deleted is returned
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_USER", payload: json });
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
          <Card.Text>{user.lastName}%</Card.Text>
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
      <Button onClick={handleDelete} className="w-100 border-dark">
      <i class="bi bi-trash"/> Delete
      </Button>
    </div>
  );
};

// Export the UserDetails component to make it reusable across the application.
export default UserDetails;
