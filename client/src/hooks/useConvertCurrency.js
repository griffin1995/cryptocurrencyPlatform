import { useState, useEffect } from "react";
import fx from "money";

//This hook takes current GBP price rate compared to USD and returns a converted USD to GBP value
const useConvertCurrency = (value) => {
  const [data, setData] = useState(null);
  const [converted, setConverted] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_VQmlRRWEzDHEndp83roAu1m8nnA7SrWdMzHUecjJ&currencies=GBP`
        );
        if (!response.ok) throw new Error("Coins data fetching failed");
        setData(await response.json());
      } catch (err) {
        console.log(err.toString());
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      fx.base = "USD";
      fx.rates = {
        GBP: data.data.GBP,
        USD: 1,
      };
      setConverted(fx(value).from("USD").to("GBP"));
    }
  }, [data, value]);

  return converted;
};

export default useConvertCurrency;
