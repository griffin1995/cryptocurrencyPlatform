// Import hooks from React for managing component lifecycle and state.
import { useEffect, useState } from "react";

// Import components for displaying coin details and administrative controls.
import CoinDetails from "../components/CoinDetails";
import AdminControls from "../components/AdminControls";

/**
 * Home component serving as the main view for the application.
 * It handles fetching and displaying lists of coins, and provides administrative controls.
 */
const Home = () => {
  // State to hold coins data; initially null to signify that data has not been loaded yet.
  const [coins, setCoins] = useState(null);

  useEffect(() => {
    /**
     * Fetches coin data from the server asynchronously.
     * Updates the coins state with the fetched data if the API call succeeds.
     */
    const fetchCoins = async () => {
      const response = await fetch("/api/coins");
      const json = await response.json();
      if (response.ok) {
        setCoins(json); // Set the coins state to the fetched data.
      }
    };

    fetchCoins(); // Executes the fetching of coin data on component mount.
  }, []); // Empty dependency array ensures this effect runs only once after initial render.

  return (
    <div className="home text-white">
      <div className="coins">
        {/* Conditionally render CoinDetails components for each coin if coins data is available. */}
        {coins && coins.map((coin) => <CoinDetails key={coin._id} coin={coin} />)}
      </div>
      <AdminControls /> {/* Administrative control panel for managing application data. */}
    </div>
  );
};

export default Home; // Make the Home component available for import elsewhere in the application.
