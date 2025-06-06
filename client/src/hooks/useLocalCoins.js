import { useState, useEffect, useCallback } from "react";
import { useAuthenticationContext } from "./useAuthenticationContext";

// Custom hook for fetching coins from local database
const useLocalCoins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthenticationContext();

  const fetchLocalCoins = useCallback(async () => {
    if (!user) {
      setCoins([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log("🪙 Fetching local coins from database...");
      const response = await fetch('http://localhost:4000/api/coins', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch coins: ${response.status}`);
      }

      const coinsData = await response.json();
      console.log("🪙 Local coins fetched:", coinsData.length, "coins");
      setCoins(coinsData);
    } catch (err) {
      console.error("❌ Error fetching local coins:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchLocalCoins();
  }, [fetchLocalCoins]);

  const refreshCoins = () => {
    if (user) {
      fetchLocalCoins();
    }
  };

  return { coins, loading, error, refreshCoins };
};

export default useLocalCoins;