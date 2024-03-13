import { useEffect, useState } from "react";

const Home = () => {
  const [coins, setCoins] = useState(null);
  useEffect(() => {
    //we dont want useEffect to be async so we create function inside that does it
    const fetchCoins = async () => {
      const response = await fetch("http://localhost:4000/api/coin");
      const json = await response.json();

      if (response.ok) {
        setCoins(json);
      }
    };
    fetchCoins();
  }, []);

  return (
    <div className="home">
      <div class="coins">
        {coins && coins.map((coin) => <p key={coin._id}>{coin.name}</p>)}
      </div>
    </div>
  );
};

export default Home;
