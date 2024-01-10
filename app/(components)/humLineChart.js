"use client";
// import data from "./data";
import { Line } from "react-chartjs-2";
// import dataProject from "./data";

export default function HumLineChart({ lineLabel, dataLineChart }) {
  const data = {
    labels: lineLabel,
    datasets: [
      {
        data: dataLineChart,
        label: "Humidity dataset",
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
        borderColor: "rgba(240,71,158,1)",
        fill: "start",
        backgroundColor: "rgba(240,71,158,0.3)",
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
          text: "Humidity",
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
