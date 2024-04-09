import React from "react";
import useCoinHistory from "../hooks/useCoinHistory";

//Method that calls the useCoinHistory, and calculates start and end UNIX values
//for the last 30 days. It returns the specified coin's history data.

export default function GetCoinHistory(coin) {
  const now = new Date();
  const endTimestamp = now.getTime();
  const start = new Date(now);
  start.setDate(now.getDate() - 31);
  const startTimestamp = start.getTime();

  const coinHistory = useCoinHistory(coin, startTimestamp, endTimestamp);

  return coinHistory?.data;
}
