// Import React from the 'react' package to enable component creation and JSX support.
import React from "react";

/**
 * The CoinDetails component displays detailed information about a cryptocurrency coin.
 *
 * Props:
 *  - coin: An object containing details about the coin, including its name, value, and last update timestamp.
 */
const CoinDetails = ({ coin }) => {
  // Convert the 'updatedAt' property of the coin object from a string to a Date object.
  const updatedAt = new Date(coin.updatedAt);
  // Format the 'updatedAt' Date object into a more readable string format, combining date and time.
  const dateString = `${updatedAt.toLocaleDateString()} ${updatedAt.toLocaleTimeString()}`;

  // Render the details of the coin in a structured layout.
  return (
    <div className="coin-details">
      {/* The coin's name is displayed in a larger font size as a heading. */}
      <h4>{coin.name}</h4>
      {/* Display the coin's current value with a label. */}
      <p>
        <strong>Value: </strong>
        {coin.value}
      </p>
      {/* Show the last updated date and time for the coin's information. */}
      <p>
        <strong>Updated at: </strong>
        {dateString}
      </p>
    </div>
  );
};

// Export the CoinDetails component to allow its use in other parts of the application.
export default CoinDetails;
