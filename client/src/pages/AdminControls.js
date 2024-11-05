// Import hooks from React for managing component lifecycle and state.
import { useEffect, useState } from "react";
import { AdminContextProvider } from "../context/AdminContext";
// Import components for displaying coin details and administrative controls.
import CoinDetails from "../components/CoinDetails";
import AdminControls from "../components/AdminControls";

/**
 * Home component serving as the main view for the application.
 * It handles fetching and displaying lists of coins, and provides administrative controls.
 */
const Home = () => {
  return (
    <div className="home text-white">
      <AdminContextProvider>
        <AdminControls />{" "}
        {/* Administrative control panel for managing application data. */}
      </AdminContextProvider>{" "}
    </div>
  );
};

export default Home; // Make the Home component available for import elsewhere in the application.
