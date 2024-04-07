import { React, useState } from "react";
import { Line } from "react-chartjs-2";
import GetCoinHistory from "./GetCoinHistory";
import UnixToString from "./UnixToString";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GetAverage(array) {
  var sumOfArray = 0;
  for (let i = 0; i < array.length; i++) {
    sumOfArray += parseInt(array[i]);
  }
  return sumOfArray / array.length;
}

//This component returns a Line Chart showing more in depth info about coins in the past 30 days

export default function GetCoinChart({ coin }) {
  const coinData = GetCoinHistory(coin);

  const labels = coinData?.map((dayData) => {
    return UnixToString(dayData.time);
  });

  const averagePriceDataset =
    coinData === null
      ? [0, 0, 0, 0, 0, 0]
      : coinData?.map((priceData) => {
          return priceData.priceUsd;
        });

  const averagePrice30Days = Array.isArray(averagePriceDataset)
    ? GetAverage(averagePriceDataset)
    : 0;

  console.log(averagePrice30Days);

  ChartJS.defaults.color = "#ebebeb";

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Last 30 Days History",
      },
    },
  };

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: "Average Price (USD)",
        data: averagePriceDataset,
        borderColor: "#00a7e1",
        backgroundColor: "#00a7e1",
      },
      {
        label: "Most Recent Price (USD)",
        data: new Array(30).fill(
          Array.isArray(averagePriceDataset)
            ? averagePriceDataset[averagePriceDataset.length - 1]
            : 0
        ),
        borderColor: "#ffffff",
        backgroundColor: "#ffffff",
        borderDash: [10, 5],
      },
      {
        label: "Average Price In The Last 30 Days (USD)",
        data: new Array(30).fill(averagePrice30Days),
        borderColor: "#000000",
        backgroundColor: "#000000",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
