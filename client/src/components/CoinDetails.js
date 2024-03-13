// Define the CoinDetails component that receives a 'coin' object as a prop.
const CoinDetails = ({ coin }) => {
  return (
    // Container div for the coin details. Each coin's details will be displayed in this structured format.
    <div className="coin-details">
      <h4>{coin.name}</h4> {/* Display the coin's name. */}
      <p>
        <strong>Value: </strong> {/* Label for the coin's value. */}
        {coin.value} {/* Display the coin's value. */}
      </p>
      <p>
        <strong>Updated at: </strong>{" "}
        {/* Label for the coin's last updated timestamp. */}
        {coin.updatedAt}{" "}
        {/* Display the timestamp of when the coin was last updated. */}
      </p>
    </div>
  );
};

// Export the CoinDetails component for use in other parts of the application, such as in the Home component.
export default CoinDetails;
