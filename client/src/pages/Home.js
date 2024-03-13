import { useEffect, useState } from "react";

const Home = () => {
  const [coins, setCoins] = useState(null);
  useEffect(() => {
    //we dont want useEffect to be async so we create function inside that does it
    const fetchCoins = async () => {
      const response = await fetch("http://localhost:4000/api/coins");
      const json = await response.json();

      if (response.ok) {
        setCoins(json);
      }
    };
    fetchCoins();
  }, []);

  
  return (
    <div className="home">
      <h2>Home</h2>
    </div>
  );
};

export default Home;
