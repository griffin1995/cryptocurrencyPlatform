import { useState, useEffect } from "react";

// Custom hook for fetching coins data
const useAllCoins = () => {
  const API_KEY = "dd59a398-e094-4885-a708-56b4d7e9e2b2";
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets`);
        if (!response.ok) throw new Error("Coins data fetching failed");
        setData(await response.json());
      } catch (err) {
        setError(err.toString());
      }
    };

    fetchData();
  }, []);

  console.log(data);
  return data;
};

export default useAllCoins;
