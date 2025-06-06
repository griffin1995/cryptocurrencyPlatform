import { useState, useEffect } from "react";

// Custom hook for fetching single coin data
const useCoin = (coinId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // FIXED: Only fetch if coinId is provided
    if (!coinId) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.coincap.io/v2/assets/${coinId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch coin data: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching coin data:", err);
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [coinId]); // FIXED: Added coinId as dependency

  return { data, loading, error };
};

export default useCoin;
