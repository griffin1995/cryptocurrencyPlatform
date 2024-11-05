import { useState } from "react";
// Custom hook to access authentication context
import { useAuthenticationContext } from "./useAuthenticationContext";

/**
 * Custom hook to handle coin registration.
 *
 * This hook encapsulates the registration logic, including API requests, error handling,
 * and updating the authentication state of the application for new coins.
 *
 * @returns {Object} Contains the registerCoin function and stateful values for isLoading and error.
 */
export const useRegisterCoin = () => {
  // State for tracking error messages
  const [error, setError] = useState(null);
  // State for tracking loading status during the coin registration process
  const [isLoading, setIsLoading] = useState(false); // Initialize as `false` since no loading before attempts
  // Destructure the dispatch function from the authentication context
  const { dispatch } = useAuthenticationContext();

  /**
   * Handles the registration process for a new coin.
   *
   * This function sends coin data to the server, handles the response,
   * and may update the application's state related to coins.
   *
   * @param {string} id - Coin's identifier
   * @param {string} symbol - Coin's symbol
   * @param {string} name - Coin's name
   * @param {number} supply - Coin's current supply
   * @param {number} maxSupply - Coin's maximum supply
   * @param {number} marketCapUsd - Coin's market capitalization in USD
   * @param {number} volumeUsd24Hr - Trading volume in USD over the last 24 hours
   * @param {number} priceUsd - Current price in USD
   * @param {number} changePercent24Hr - Percentage change in price over the last 24 hours
   * @param {number} vwap24Hr - Volume Weighted Average Price over the last 24 hours
   * @param {string} explorer - URL to the blockchain explorer for the coin
   */
  const registerCoin = async (
    id,
    symbol,
    name,
    supply,
    maxSupply,
    marketCapUsd,
    volumeUsd24Hr,
    priceUsd,
    changePercent24Hr,
    vwap24Hr,
    explorer
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/coin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        symbol,
        name,
        supply,
        maxSupply,
        marketCapUsd,
        volumeUsd24Hr,
        priceUsd,
        changePercent24Hr,
        vwap24Hr,
        explorer,
      }),
    });
    const json = await response.json();

    // Handle error case in the API response
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return;
    }

    // Handle successful registration
    if (response.ok) {
      // Optionally update the application's state related to coins, if needed
      dispatch({ type: "REGISTER_COIN", payload: json });
      setIsLoading(false);
    }
  };

  return { registerCoin, isLoading, error };
};
