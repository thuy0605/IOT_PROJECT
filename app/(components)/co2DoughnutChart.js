"use client";
import { Doughnut } from "react-chartjs-2";
import "chart.js";
export default function Co2DoughnutChart({ goodCo2, badCo2 }) {
  const chartData = {
    labels: ["good Co2", "bad Co2"],
    datasets: [
      {
        data: [goodCo2, badCo2],
        backgroundColor: [
          "rgba(255, 159, 64, 0.6)", // Orange

          "rgba(153, 102, 255, 0.6)", // Purple
        ],
        hoverBackgroundColor: [
          "rgba(255, 159, 64, 0.8)", // Orange

          "rgba(153, 102, 255, 0.8)", // Purple
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
        text: "co2 chart",
        size: 16,
      },
    },
  };
  return <Doughnut data={chartData} options={option} />;
}
