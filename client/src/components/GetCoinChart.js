import React from "react";
import { Line } from "react-chartjs-2";

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

/**
 * Previous History Component
 * Renders a chart displaying previous history data for the last 7 days
 */
export default function GetCoinChart() {
  // Get labels for the last 7 days
  const labels = [6, 5, 4, 3, 2, 1, 0];

  // Get historical data for the last 7 days
  const labelsTestData = [6, 5, 4, 3, 2, 1, 0];

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Last 7 Days History",
      },
    },
  };

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: "Some coin data",
        data: labelsTestData,
        borderColor: "#00a7e1",
        backgroundColor: "#00a7e1",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
