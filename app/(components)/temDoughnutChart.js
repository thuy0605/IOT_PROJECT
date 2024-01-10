"use client";
import { Doughnut } from "react-chartjs-2";
import "chart.js";
export default function TemDoughnutChart({ goodTemperature, badTemperature }) {
  const chartData = {
    labels: ["good temperature", "bad temperature"],
    datasets: [
      {
        data: [goodTemperature, badTemperature],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)", // Green
          "rgba(153, 102, 255, 0.6)", // Purple
          "rgba(255, 159, 64, 0.6)", // Orange
        ],
        hoverBackgroundColor: [
          "rgba(75, 192, 192, 0.8)", // Green
          "rgba(153, 102, 255, 0.8)", // Purple
          "rgba(255, 159, 64, 0.8)", // Orange
        ],
      },
    ],
  };
  const option = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "temperature chart",
        size: 16,
      },
    },
  };
  return <Doughnut data={chartData} options={option} />;
}
