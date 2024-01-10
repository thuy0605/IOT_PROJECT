"use client";
import { Line } from "react-chartjs-2";
import fetchData from "../../backend/data";

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
import HumDoughnutChart from "../(components)/humDoughnutChart";
import HumLineChart from "../(components)/humLineChart";
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
export default async function Humidity() {
  const data = await fetchData();
  let humidity = data.humidity;
  let currentHumidity = 0;
  let goodHumidity = 0;
  let badHumidity = 0;
  let lineLabel = [];
  let dataLineChart = [];

  if (humidity.length) {
    currentHumidity = humidity[humidity.length - 1][1];
  }
  if (humidity.length) {
    humidity.forEach((hum) => {
      hum[1] >= 20 ? (goodHumidity += 1) : (badHumidity += 1);
      lineLabel.push(hum[0]);
      dataLineChart.push(hum[1]);
    });
  }

  return (
    <div className="flex justify-center pt-20">
      <div className=" w-11/12 p-5 ">
        <div className="flex mb-5">
          <h1>Current value: {currentHumidity} %</h1>
          <div
            className={`flex justify-center ml-20 italic text-sm font-bold ${
              currentHumidity < 15 ? "text-red-600" : "text-blue-600"
            }`}
          >
            {currentHumidity >= 15
              ? "Nice condition"
              : "Too dry, speed up humidity !!!"}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-2/3">
            <HumLineChart lineLabel={lineLabel} dataLineChart={dataLineChart} />
          </div>

          <div className="w-1/3">
            <div>
              <HumDoughnutChart
                goodHumidity={goodHumidity}
                badHumidity={badHumidity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
