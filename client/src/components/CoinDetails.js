import React from "react";
import { useAdminContext } from "../hooks/useAdminContext";
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";
import { Card, Button } from "react-bootstrap";

/**
 * CoinDetails component for displaying detailed information about a coin.
 *
 * Props:
 *   - coin: An object containing information about the coin, such as its symbol, name, market cap,
 *           volume, price, and the last update timestamp.
 */
const CoinDetails = ({ coin }) => {
  const { dispatch } = useAdminContext();
  // FIXED: Get authenticated user's token instead of using coin.token
  const { user: authUser } = useAuthenticationContext();

  const handleDelete = async () => {
    if (!authUser) {
      console.error("No authenticated user found");
      return;
    }

    try {
      const response = await fetch(`/api/coins/${coin._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.token}`, // FIXED: Use authenticated user's token
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // When we get the response, the document that's just been deleted is returned
      const json = await response.json();
      dispatch({ type: "DELETE_COIN", payload: json });
    } catch (error) {
      console.error("Error deleting coin:", error);
      // You might want to show this error to the user via a toast or alert
    }
  };

  // Render the coin's details in a structured layout.
  return (
    <div className="coin-details bg-secondary py-2 px-2 h-100 rounded">
      <Card
        className="my-2 text-center"
        bg="primary"
        text="dark"
        border="primary"
      >
        <Card.Header className="text-light">
          <span className="h4">{coin.symbol}</span>
        </Card.Header>
        <Card.Body className="bg-light rounded">
          <Card.Title>Coin</Card.Title>
          <Card.Text>{coin.name}</Card.Text>
          <hr className="bg-dark" />
          <Card.Title>Change (24Hr)</Card.Title>
          <Card.Text
            className={
              parseFloat(coin.changePercent24Hr) >= 0
                ? "text-success"
                : "text-danger"
            }
          >
            {parseFloat(coin.changePercent24Hr).toFixed(2)}%
          </Card.Text>
          <hr className="bg-dark" />
          <Card.Title>Current Price (USD)</Card.Title>
          <Card.Text>${parseFloat(coin.priceUsd).toLocaleString()}</Card.Text>
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

// Export the CoinDetails component to make it reusable across the application.
export default CoinDetails;
