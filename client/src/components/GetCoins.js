import React from "react";
import useAllCoins from "../hooks/useAllCoins";

export default function GetCoins() {

  const allCoins = useAllCoins();

  return allCoins?.data;
}
