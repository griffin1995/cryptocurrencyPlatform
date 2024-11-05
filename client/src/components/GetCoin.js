import React from "react";
import useCoin from "../hooks/useCoin";

export default function GetCoins(coinId) {

  const coin = useCoin(coinId);

  return coin?.data;
}
