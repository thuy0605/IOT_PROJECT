import fetchData from "@/backend/data";
import Menu from "../(components)/menu";

export default async function MainPage() {
  const sensorData = await fetchData();
  const temperature = sensorData.temperature;
  const humidity = sensorData.humidity;
  const co2 = sensorData.co2;
  let currentTemperature = 0;
  let currentHumidity = 0;
  let currentCo2 = 0;

  if (temperature.length) {
    currentTemperature = temperature[temperature.length - 1][1];
  }

  if (humidity.length) {
    currentHumidity = humidity[humidity.length - 1][1];
  }

  if (co2.length) {
    currentCo2 = co2[co2.length - 1][1];
  }

  return (
    <div>
      <div className=" ">
        <div className=" transition ease-in-out duration-700 hover:translate-y-6 hover:translate-x-16  hover:scale-125 hover:bg-slate-900   w-1/3 border-b-4 border-gray-700">
          <div
            className={`flex justify-center italic text-sm font-bold ${
              currentTemperature <= 30 && currentTemperature >= 19
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            {currentTemperature >= 19 && currentTemperature <= 30
              ? "Nice condition"
              : "Too cold, speed up temperature !!!"}
          </div>
          <h1 className="flex justify-center text-7xl pt-10">
            {currentTemperature} oC
          </h1>
          <h1 className=" flex justify-center pt-5 text-2xl"> Temperature</h1>
        </div>
      </div>
      <div className=" flex justify-center">
        <div className="transition ease-in-out duration-700 hover:-translate-y-6   hover:scale-125 hover:bg-slate-800 w-1/3 border-b-4 border-l-4 border-gray-600 ">
          <div
            className={`flex justify-center italic text-sm font-bold ${
              currentHumidity <= 50 && currentHumidity >= 30
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            {currentHumidity >= 30 && currentHumidity <= 50
              ? "Nice condition"
              : "Too dry, put more water !!!"}
          </div>
          <h1 className="flex justify-center text-7xl pt-10">
            {currentHumidity} %
          </h1>
          <h1 className="flex justify-center pt-5  text-2xl"> Humidity</h1>
        </div>
      </div>
      <div className=" flex justify-end">
        <div className="transition ease-in-out duration-700 hover:-translate-y-6  hover:scale-125 w-1/3 hover:bg-slate-700 border-b-4 border-l-4 border-gray-700">
          <div
            className={`flex justify-center italic text-sm font-bold ${
              currentCo2 <= 500 && currentCo2 >= 300
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            {currentCo2 >= 300 && currentCo2 <= 500
              ? "Nice condition"
              : "Too dangerous, open the door !!!"}
          </div>
          <h1 className="flex justify-center text-7xl pt-10">{currentCo2}</h1>
          <h1 className=" flex justify-center pt-5  text-2xl"> Co2</h1>
        </div>
      </div>
    </div>
  );
}
