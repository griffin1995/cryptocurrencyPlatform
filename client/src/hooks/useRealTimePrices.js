import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for real-time cryptocurrency price updates
 * @param {Array} coinIds - Array of coin IDs to track
 * @param {number} updateInterval - Update interval in milliseconds (default: 30 seconds)
 */
const useRealTimePrices = (coinIds = [], updateInterval = 30000) => {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const intervalRef = useRef(null);

  const fetchPrices = async () => {
    if (!coinIds || coinIds.length === 0) {
      setLoading(false);
      return;
    }

    try {
      setError(null);

      // Fetch current prices for all specified coins
      const coinIdsString = coinIds.join(",");
      const response = await fetch(
        `https://api.coincap.io/v2/assets?ids=${coinIdsString}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch prices: ${response.status}`);
      }

      const data = await response.json();

      // Transform data into a more usable format
      const newPrices = {};
      data.data.forEach((coin) => {
        newPrices[coin.id] = {
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          priceUsd: parseFloat(coin.priceUsd),
          changePercent24Hr: parseFloat(coin.changePercent24Hr),
          marketCapUsd: parseFloat(coin.marketCapUsd),
          volumeUsd24Hr: parseFloat(coin.volumeUsd24Hr),
          lastUpdated: new Date(),
        };
      });

      setPrices((prevPrices) => ({
        ...prevPrices,
        ...newPrices,
      }));

      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      console.error("Error fetching real-time prices:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPrices();
  }, [coinIds.join(",")]); // Re-fetch when coin list changes

  // Set up interval for real-time updates
  useEffect(() => {
    if (coinIds && coinIds.length > 0) {
      intervalRef.current = setInterval(fetchPrices, updateInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [coinIds.join(","), updateInterval]);

  // Manual refresh function
  const refresh = () => {
    setLoading(true);
    fetchPrices();
  };

  // Get price for specific coin
  const getPrice = (coinId) => {
    return prices[coinId] || null;
  };

  // Get price change indicator
  const getPriceChange = (coinId) => {
    const coin = prices[coinId];
    if (!coin) return null;

    return {
      isPositive: coin.changePercent24Hr >= 0,
      percentage: Math.abs(coin.changePercent24Hr),
      formatted: `${
        coin.changePercent24Hr >= 0 ? "+" : ""
      }${coin.changePercent24Hr.toFixed(2)}%`,
    };
  };

  return {
    prices,
    loading,
    error,
    lastUpdated,
    refresh,
    getPrice,
    getPriceChange,
  };
};

export default useRealTimePrices;
