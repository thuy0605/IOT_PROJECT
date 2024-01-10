"use client";
// import dataProject from "./data";
import { Line } from "react-chartjs-2";
import "chart.js";

export default function TemLineChart({ lineLabel, dataLineChart }) {
  const data = {
    labels: lineLabel,
    datasets: [
      {
        data: dataLineChart,
        label: "Temperature dataset",
      },
    ],
  };
  const options = {
    pluggins: {
      legend: {
        dispaly: false,
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "rgba(47,97,68,1)",
        fill: "start",
        backgroundColor: "rgba(47,97,68,0.3)",
      },
      point: {
        radius: 0,
        hitRadius: 0,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Day",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature",
        },
      },
    },
  };
  return (
    <div>
      <Line data={data} options={options} width={100} height={40} />
    </div>
  );
}
