"use client";
import fetchData from "../../backend/data";
import { Line, Doughnut } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  ArcElement,
} from "chart.js";
import TemDoughnutChart from "../(components)/temDoughnutChart";
import TemLineChart from "../(components)/temLineChart";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default async function Temperature() {
  const data = await fetchData();
  let temperature = data.temperature;
  let currentTemperature = 0;
  let goodTemperature = 0;
  let badTemperature = 0;
  let lineLabel = [];
  let dataLineChart = [];

  if (temperature.length) {
    currentTemperature = temperature[temperature.length - 1][1];
  }

  if (temperature.length) {
    temperature.forEach((tem) => {
      tem[1] >= 20 ? (goodTemperature += 1) : (badTemperature += 1);
      lineLabel.push(tem[0]);
      dataLineChart.push(tem[1]);
    });
  }

  return (
    <div className="flex justify-center pt-20">
      <div className="w-11/12 p-5">
        <div className="flex mb-5">
          <h1>Current value: {currentTemperature} oC</h1>

          <div
            className={`flex justify-center ml-20 italic text-sm font-bold ${
              currentTemperature < 20 ? "text-red-600" : "text-blue-600"
            }`}
          >
            {currentTemperature >= 20
              ? "Nice condition"
              : "Too cold, speed up temperature !!!"}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-2/3">
            <TemLineChart lineLabel={lineLabel} dataLineChart={dataLineChart} />
          </div>
          <div className="w-1/3">
            <div>
              <TemDoughnutChart
                goodTemperature={goodTemperature}
                badTemperature={badTemperature}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
