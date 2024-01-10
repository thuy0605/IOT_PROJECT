"use client";
// import dataProject from "../(components)/data";
import { Line } from "react-chartjs-2";
import "chart.js";

export default function Co2LineChart({ lineLabel, dataLineChart }) {
  const data = {
    labels: lineLabel,
    datasets: [
      {
        data: dataLineChart,
        label: "Co2 dataset",
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
        borderColor: "rgba(247, 169, 19, 1)",
        fill: "start",
        backgroundColor: "rgba(247, 169, 19, 0.3)",
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
          text: "Co2",
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
