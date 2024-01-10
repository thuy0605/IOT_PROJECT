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
import Co2DoughnutChart from "../(components)/co2DoughnutChart";
import Co2LineChart from "../(components)/co2LineChart";
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
  let co2 = data.co2;
  let currentCo2 = 0;

  let goodCo2 = 0;
  let badCo2 = 0;
  let lineLabel = [];
  let dataLineChart = [];

  if (co2.length) {
    currentCo2 = co2[co2.length - 1][1];
  }

  if (co2.length) {
    co2.forEach((co2) => {
      co2[1] >= 300 && co2[1] <= 500 ? (goodCo2 += 1) : (badCo2 += 1);
      lineLabel.push(co2[0]);
      dataLineChart.push(co2[1]);
    });
  }

  return (
    <div className="flex justify-center pt-20">
      <div className="w-11/12 p-5">
        <div className="flex mb-5">
          <h1>Current value: {currentCo2} </h1>

          <div
            className={`flex justify-center ml-20 italic text-sm font-bold ${
              currentCo2 <= 500 && currentCo2 >= 300
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            {currentCo2 >= 300 && currentCo2 <= 500
              ? "Nice condition"
              : "Too dangerous, open your door !!!"}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-2/3">
            <Co2LineChart lineLabel={lineLabel} dataLineChart={dataLineChart} />
          </div>
          <div className="w-1/3">
            <div>
              <Co2DoughnutChart goodCo2={goodCo2} badCo2={badCo2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
