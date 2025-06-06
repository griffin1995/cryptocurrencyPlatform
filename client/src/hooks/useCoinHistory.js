import { useState, useEffect } from "react";

// Custom hook for fetching coins history data
const useCoinHistory = (coin, startTimestamp, endTimestamp) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // FIXED: Only fetch if all required parameters are provided
    if (!coin || !startTimestamp || !endTimestamp) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.coincap.io/v2/assets/${coin}/history?interval=d1&start=${startTimestamp}&end=${endTimestamp}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch coin history: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching coin history:", err);
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [coin, startTimestamp, endTimestamp]); // FIXED: Added all dependencies

  return { data, loading, error };
};

export default useCoinHistory;
