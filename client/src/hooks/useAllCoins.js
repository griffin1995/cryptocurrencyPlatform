import { useState, useEffect } from "react";

// Custom hook for fetching all available coins data
const useAllCoins = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets`);
        if (!response.ok) throw new Error("Coins data fetching failed");
        setData(await response.json());
      } catch (err) {
        console.log(err.toString());
      }
    };

    fetchData();
  }, []);

  return data;
};

export default useAllCoins;
