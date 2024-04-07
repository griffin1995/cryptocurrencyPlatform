import { useState, useEffect } from "react";

// Custom hook for fetching coins history data
const useCoinHistory = (coin, startTimestamp, endTimestamp) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coincap.io/v2/assets/${coin}/history?interval=d1&start=${startTimestamp}&end=${endTimestamp}`
        );
        if (!response.ok) throw new Error("Coins data fetching failed");
        setData(await response.json());
      } catch (err) {
        setData(err.toString());
      }
    };
    fetchData();
  }, [coin]);

  return data;
};

export default useCoinHistory;
