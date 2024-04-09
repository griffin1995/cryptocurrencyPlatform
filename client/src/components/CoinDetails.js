import React from "react";
import { useAdminContext } from "../hooks/useAdminContext";

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
  console.log(coin.priceUsd)

  // Render the coin's details in a structured layout.
  return (
    <div className="coin-details">
      {/* Display the coin's symbol and name. */}
      <h4>
        {coin.symbol} - {coin.name}
      </h4>
      {/* Display the coin's market capitalization. */}
      <p>
        <strong>Market Cap USD: </strong>
        {coin.marketCapUsd}
      </p>
      {/* Display the coin's trading volume. */}
      <p>
        <strong>Volume USD 24Hr: </strong>
        {coin.volumeUsd24Hr}
      </p>
      {/* Display the coin's price. */}
      <p>
        <strong>Price USD: </strong>
        {coin.priceUsd}
      </p>

      {/* Icon for deleting a coin, with an event handler for the delete logic. */}
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
};

// Export the CoinDetails component to make it reusable across the application.
export default CoinDetails;
