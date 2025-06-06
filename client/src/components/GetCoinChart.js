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
  if (!array || array.length === 0) return 0;

  var sumOfArray = 0;
  for (let i = 0; i < array.length; i++) {
    sumOfArray += parseFloat(array[i]) || 0; // FIXED: Use parseFloat instead of parseInt for prices
  }
  return sumOfArray / array.length;
}

//This component returns a Line Chart showing more in depth info about coins in the past 30 days

export default function GetCoinChart({ coin }) {
  const coinHistoryResult = GetCoinHistory(coin);
  const coinData = coinHistoryResult?.data; // FIXED: Updated to match new hook structure

  // FIXED: Add loading and error handling
  if (!coin) {
    return (
      <div className="text-center text-light p-4">
        <p>Please select a coin to view its chart</p>
      </div>
    );
  }

  if (coinHistoryResult?.loading) {
    return (
      <div className="text-center text-light p-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading chart data...</span>
        </div>
        <p className="mt-2">Loading chart data...</p>
      </div>
    );
  }

  if (coinHistoryResult?.error) {
    return (
      <div className="text-center text-light p-4">
        <p className="text-danger">
          Error loading chart data: {coinHistoryResult.error}
        </p>
      </div>
    );
  }

  if (!coinData || coinData.length === 0) {
    return (
      <div className="text-center text-light p-4">
        <p>No chart data available for this coin</p>
      </div>
    );
  }

  const labels = coinData.map((dayData) => {
    return UnixToString(dayData.time);
  });

  const averagePriceDataset = coinData.map((priceData) => {
    return parseFloat(priceData.priceUsd); // FIXED: Ensure numeric values
  });

  const averagePrice30Days = GetAverage(averagePriceDataset);

  ChartJS.defaults.color = "#ebebeb";

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // FIXED: Allow chart to be responsive
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${coin} - Last 30 Days Price History`,
        color: "#ebebeb",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
        },
      },
    },
  };

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: "Price (USD)",
        data: averagePriceDataset,
        borderColor: "#00a7e1",
        backgroundColor: "rgba(0, 167, 225, 0.1)",
        tension: 0.1, // FIXED: Add smooth curves
        fill: true,
      },
      {
        label: "Current Price (USD)",
        data: new Array(averagePriceDataset.length).fill(
          averagePriceDataset[averagePriceDataset.length - 1]
        ),
        borderColor: "#ffffff",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderDash: [10, 5],
        pointRadius: 0, // FIXED: Hide points for reference lines
        tension: 0,
      },
      {
        label: "30-Day Average (USD)",
        data: new Array(averagePriceDataset.length).fill(averagePrice30Days),
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.1)",
        borderDash: [5, 5],
        pointRadius: 0, // FIXED: Hide points for reference lines
        tension: 0,
      },
    ],
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Line options={options} data={data} />
    </div>
  );
}
