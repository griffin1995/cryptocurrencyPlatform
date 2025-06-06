import useAllCoins from "../hooks/useAllCoins";

export default function GetCoins() {
  const allCoinsResult = useAllCoins();

  // FIXED: Return the coins data from the API response structure
  return allCoinsResult?.data?.data; // CoinCap API returns data.data
}
