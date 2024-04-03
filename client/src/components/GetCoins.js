import React from "react";
import useCoins from "../hooks/useCoins";
import GetCoinsNamesList from "./GetCoinsNamesList";

export default function GetCoins() {

  const coins = GetCoinsNamesList.map(useCoins);

  return coins;
}
