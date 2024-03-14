// Import useEffect and useState hooks from React for managing side effects and component state.
import { useEffect, useState } from "react";

// Import child components to display details of coins, user details, and administrative functionalities.
import CoinDetails from "../components/CoinDetails";
import AdminControls from "../components/AdminControls";
import UserDetails from "../components/UserDetails";

/**
 * The Home component serves as the main view of the application.
 * It fetches and displays lists of coins and users, and includes administrative controls.
 */
const Home = () => {
  // Initialize state variables for storing coins and users data, starting with null to indicate data is not yet loaded.
  const [coins, setCoins] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // Asynchronous function to fetch data for coins from the API.
    const fetchCoins = async () => {
      const response = await fetch("/api/coins");
      const json = await response.json();
      // Update the 'coins' state with the fetched data if the API call was successful.
      if (response.ok) {
        setCoins(json);
      }
    };

    // Asynchronous function to fetch data for users from the API.
    const fetchUsers = async () => {
      const response = await fetch("/api/adminRoutes");
      const json = await response.json();
      // Update the 'users' state with the fetched data if the API call was successful.
      if (response.ok) {
        setUsers(json);
      }
    };

    // Invoke the fetch operations for both coins and users when the component mounts.
    fetchCoins();
    fetchUsers();
  }, []); // An empty dependency array means this effect runs once on component mount.

  // Render the component UI, including lists of coins and users, and administrative controls.
  return (
    <div className="home">
      {/* Display a list of coins. Map through the coins state to render a CoinDetails component for each coin, if data is available. */}
      <div className="coins">
        {coins &&
          coins.map((coin) => <CoinDetails key={coin._id} coin={coin} />)}
      </div>
      {/* Include the AdminControls component to provide additional functionalities for administrators. */}
      <AdminControls />
      {/* Display a list of users. Map through the users state to render a UserDetails component for each user, if data is available. */}
      <div className="allUsers">
        {users &&
          users.map((user) => <UserDetails key={user._id} user={user} />)}
      </div>
    </div>
  );
};

// Export the Home component for use throughout the application.
export default Home;
