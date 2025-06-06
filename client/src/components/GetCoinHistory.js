import useCoinHistory from "../hooks/useCoinHistory";

//Method that calls the useCoinHistory, and calculates start and end UNIX values
//for the last 30 days. It returns the specified coin's history data.

export default function GetCoinHistory(coin) {
  const now = new Date();
  const endTimestamp = now.getTime();
  const start = new Date(now);
  start.setDate(now.getDate() - 31);
  const startTimestamp = start.getTime();

  // FIXED: Always call the hook - let the hook handle null/undefined coin
  const coinHistoryResult = useCoinHistory(coin, startTimestamp, endTimestamp);

  // Return appropriate response based on coin parameter and results
  if (!coin) {
    return { data: null, loading: false, error: "No coin specified" };
  }

  // Return the full result object
  return {
    data: coinHistoryResult?.data?.data, // CoinCap API returns data.data
    loading: coinHistoryResult?.loading || false,
    error: coinHistoryResult?.error || null,
  };
}
