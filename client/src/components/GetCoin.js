import useCoin from "../hooks/useCoin";

export default function GetCoin(coinId) {
  // FIXED: Always call the hook, but pass null/undefined safely
  const coinResult = useCoin(coinId);

  // Return null if no coinId or no data
  if (!coinId || !coinResult?.data?.data) {
    return null;
  }

  // Return the coin data from the API response structure
  return coinResult.data.data; // CoinCap API returns data.data
}
