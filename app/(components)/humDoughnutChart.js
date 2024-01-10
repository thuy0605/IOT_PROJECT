"use client";
import { Doughnut } from "react-chartjs-2";
import "chart.js";
export default function HumDoughnutChart({ goodHumidity, badHumidity }) {
  const chartData = {
    labels: ["good humidity", "bad humidity"],
    datasets: [
      {
        data: [goodHumidity, badHumidity],
        backgroundColor: [
          "rgba(247, 19, 137, 0.4)", // Pink

          "rgba(153, 102, 255, 0.6)", // Purple
        ],
        hoverBackgroundColor: [
          "rgba(247, 19, 137, 0.8)", // Pink

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
        text: "humidity chart",
        size: 16,
      },
    },
  };
  return <Doughnut data={chartData} options={option} />;
}
