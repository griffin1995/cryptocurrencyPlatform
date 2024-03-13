// Import useEffect for side effects and useState for state management from React.
import { useEffect, useState } from "react";

// Import the CoinDetails component to display individual coin details.
import CoinDetails from "../components/CoinDetails";

const Home = () => {
  // Define state 'coins' to store fetched data, initially set to null.
  const [coins, setCoins] = useState(null);

  useEffect(() => {
    // Define an asynchronous function inside useEffect to fetch coins data.
    const fetchCoins = async () => {
      const response = await fetch("/api/coins"); // Make an HTTP GET request to fetch coins.
      const json = await response.json(); // Parse the JSON response body.

      if (response.ok) {
        setCoins(json); // Update state with the fetched coins if response is successful.
      }
    };
    fetchCoins(); // Call the async function to fetch coins data.
  }, []); // An empty dependency array means this effect runs once after the initial render.

  return (
    <div className="home">
      <div className="coins">
        {/* Conditionally render coins data if available. */}
        {coins && coins.map((coin) => (
          <CoinDetails key={coin._id} coin={coin} />
        ))}
      </div>
    </div>
  );
};

export default Home;
