import React from "react";
import { useAdminContext } from "../hooks/useAdminContext";
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

  const handleDelete = async () => {
    const response = await fetch(`/api/coins/${coin._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${coin.token}` }, // Assuming you handle token similarly
    });
    // When we get the response, the document that's just been deleted is returned
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_COIN", payload: json });
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
          <Card.Text>{coin.changePercent24Hr}%</Card.Text>
          <hr className="bg-dark" />
          <Card.Title>Current Price (USD)</Card.Title>
          <Card.Text>${coin.priceUsd}</Card.Text>
        </Card.Body>
      </Card>
      <Button onClick={handleDelete} className="w-100 border-dark">
        <i class="bi bi-trash" /> Delete
      </Button>
    </div>
  );
};

// Export the CoinDetails component to make it reusable across the application.
export default CoinDetails;
