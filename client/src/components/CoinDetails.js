const CoinDetails = ({ coin }) => {
  return (
    <div className="coin-details">
      <h4>{coin.name}</h4>
      <p>
        <strong>Value: </strong>
        {coin.value}
      </p>
      <p>
        <strong>Updated at: </strong>
        {coin.updatedAt}
      </p>
    </div>
  );
};

export default CoinDetails;
